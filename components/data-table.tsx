'use client';

import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

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

  return <div>DataTable</div>;
}
