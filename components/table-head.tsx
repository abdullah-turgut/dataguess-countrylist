'use client';

import useCountryStore from '@/hooks/useCountryStore';

export default function TableHead() {
  const countries = useCountryStore((state) => state.countries);
  return (
    <thead>
      {countries.length > 0 && (
        <tr>
          <th className="px-5 py-2 border border-black/5">&#x2116;</th>
          {Object.keys(countries[0]).map((key) => (
            <th
              key={key}
              className="px-5 py-2 text-start border border-black/5"
            >
              {key.charAt(0).toUpperCase() + key.slice(1, key.length)}
            </th>
          ))}
        </tr>
      )}
    </thead>
  );
}
