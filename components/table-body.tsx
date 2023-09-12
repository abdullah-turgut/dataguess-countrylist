'use client';

import useCountryStore from '@/hooks/useCountryStore';

export default function TableBody() {
  const countries = useCountryStore((state) => state.countries);
  return (
    <tbody className="bg-black">
      {countries.map((country, i) => (
        <tr
          key={country.name}
          className="cursor-pointer bg-white hover:bg-slate-50"
        >
          <td className="px-5 py-1  border border-black/5 text-center">
            {i + 1}
          </td>
          {Object.entries(country).map((entry, j) => (
            <td
              key={j}
              className="px-5 py-1 h-12 max-w-[200px]  border border-black/5 break-words"
              lang="en"
            >
              {entry[1] ? entry[1] : <span>Na</span>}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
