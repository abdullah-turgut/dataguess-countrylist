'use client';

import { useQuery, gql } from '@apollo/client';
import { TbLoader2 } from 'react-icons/tb';
import { BiErrorCircle } from 'react-icons/bi';

const GET_COUNTRY_DATA = gql`
  query {
    countries {
      name
      code
      capital
      languages {
        name
      }
      continent {
        name
      }
      currency
      phone
    }
  }
`;

export default function DataTable() {
  const { loading, error, data } = useQuery(GET_COUNTRY_DATA);

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

  console.log(data.countries);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Hello</th>
            <th>Hello</th>
            <th>Hello</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>World</td>
            <td>World</td>
            <td>World</td>
          </tr>
          <tr>
            <td>World</td>
            <td>World</td>
            <td>World</td>
          </tr>
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
}
