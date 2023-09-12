'use client';

import { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { TbLoader2 } from 'react-icons/tb';
import { BiErrorCircle } from 'react-icons/bi';

import useCountryStore from '@/hooks/useCountryStore';
import { Country } from '@/types/types';
import { traceDeprecation } from 'process';

const GET_COUNTRY_DATA = gql`
  query {
    countries {
      code
      name
      capital
      continent {
        name
      }
      languages {
        name
      }
      currency
      phone
    }
  }
`;

export default function DataTable() {
  const { loading, error, data } = useQuery(GET_COUNTRY_DATA);
  const setCountries = useCountryStore((state) => state.setCountries);
  const countries = useCountryStore((state) => state.countries);

  useEffect(() => {
    // When data is received from the GraphQL query, update the "countries" state.
    if (!loading && data) {
      // Remove __typename
      const countriesList = data.countries.map((country: any) => ({
        code: country.code,
        name: country.name,
        capital: country.capital,
        continent: country.continent.name,
        languages: country.languages
          .map((language: any) => language.name)
          .join(', '),
        currency: country.currency?.replaceAll(',', ', '),
        phone: country.phone?.replaceAll(',', ', '),
      }));

      setCountries(countriesList);
    }
  }, [loading, data, setCountries]);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center flex-col gap-y-3">
        <TbLoader2 className="animate-spin" size={40} />
        <p className="text-sm">Fetching data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex justify-center items-center flex-col gap-y-3">
        <BiErrorCircle size={40} />
        <p className="text-sm">Error: {error.message}</p>
      </div>
    );
  }

  console.log(countries);

  return (
    <div className="w-3/4 mx-auto">
      <table>
        <thead>
          {countries.length > 0 && (
            <tr>
              <th className="px-5 py-2 border border-black/5">&#x2116;</th>
              {Object.keys(countries[0]).map((key) => (
                <th key={key} className="px-5 py-2 border border-black/5">
                  {key.charAt(0).toUpperCase() + key.slice(1, key.length)}
                </th>
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          {countries.map((country, i) => (
            <tr
              key={country.name}
              className="text-sm cursor-pointer hover:bg-black/5"
            >
              <td className="px-5 py-1  border border-black/5 text-center">
                {i + 1}
              </td>
              {Object.entries(country).map((entry, j) => (
                <td
                  key={j}
                  className="px-5 py-1 h-12  border border-black/5 break-words"
                  lang="en"
                >
                  {entry[1] ? entry[1] : <span>Na</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>Pagination</tfoot>
      </table>
    </div>
  );
}
