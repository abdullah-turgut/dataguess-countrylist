'use client';

import { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { TbLoader2 } from 'react-icons/tb';
import { BiErrorCircle } from 'react-icons/bi';

import useCountryStore from '@/hooks/useCountryStore';
import { Country } from '@/types/types';
import { traceDeprecation } from 'process';
import TableHead from './table-head';
import TableBody from './table-body';
import Pagination from './pagination';
import SearchInput from './search-input';

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

  return (
    <div className="w-full px-10 flex flex-col gap-y-5 py-5">
      <SearchInput />
      <table className="text-sm">
        <TableHead />
        <TableBody />
      </table>
      <Pagination />
    </div>
  );
}
