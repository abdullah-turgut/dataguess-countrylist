'use client';

import useCountryStore from '@/hooks/useCountryStore';

export default function TableBody() {
  const countries = useCountryStore((state) => state.countries);
  const { page, selectedItem, setSelectedItem, color, setCounter } =
    useCountryStore();

  const handleClick = (e: any, i: any) => {
    if (i !== selectedItem) {
      setSelectedItem(i);
      setCounter(); // trigger color change
    }
  };

  return (
    <tbody>
      {countries
        .map((country, i) => (
          <tr
            key={country.name}
            id={i.toString()}
            className={`cursor-pointer ${
              i === selectedItem ? `${color}` : 'bg-white hover:bg-slate-100'
            }`}
            onClick={(e) => handleClick(e, i)}
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
        ))
        .filter((country, i) => i >= (page - 1) * 12 && i < page * 12)}
    </tbody>
  );
}
