'use client';

import { FiSearch } from 'react-icons/fi';

import useCountryStore from '@/hooks/useCountryStore';
import { useState } from 'react';

export default function SearchInput() {
  const [input, setInput] = useState('');
  const { setFilter, setPage, setSelectedItem, countries } = useCountryStore();

  function filterData(str: string) {
    setInput(str);
    const searchText = str.match(/search:(.*)/);
    const groupText = str.match(/group:(.*)/);
    const searchGroupText = str.match(/search:(.*) group:(.*)/);

    if (!searchText && !groupText) {
      setFilter({
        search: '',
        group: '',
      });
    } else if (searchText && !groupText) {
      setFilter({
        search: searchText[1],
        group: '',
      });
      setPage(1);
    } else if (!searchText && groupText) {
      setFilter({
        search: '',
        group: groupText[1],
      });
      setPage(1);
    } else if (searchGroupText) {
      setFilter({
        search: searchGroupText[1],
        group: searchGroupText[2],
      });
      setPage(1);
    }
  }

  return (
    <div className="">
      <div className="relative w-[500px]">
        <input
          type="text"
          name="search"
          id="search"
          className="w-full border rounded-full px-5 text-sm py-2 focus:outline-none placeholder-shown:text-sm peer"
          placeholder="eg. search:turkey group:asia"
          value={input}
          onChange={(e) => filterData(e.target.value)}
        />
        <FiSearch
          className="absolute top-1/2 -translate-y-1/2 right-3"
          size={20}
        />
      </div>
      <label htmlFor="search" className="text-xs px-2 text-black/50 italic">
        You can search by name, capital, currency, phone and group by continent
        and languages
      </label>
    </div>
  );
}
