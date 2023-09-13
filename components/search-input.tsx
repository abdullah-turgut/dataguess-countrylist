'use client';

import { FiSearch } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';

import useCountryStore from '@/hooks/useCountryStore';
import { useState } from 'react';

export default function SearchInput() {
  const [input, setInput] = useState('');
  const { setFilter } = useCountryStore();

  function filterData(str: string) {
    setInput(str);

    if (str === '') {
      setFilter({
        search: '',
        group: '',
      });
    }

    if (input.includes('search') && !input.includes('group')) {
      const [searchKey, search] = str.split(':');
      const searchObj = {
        search: (search && search.trim().toLowerCase()) || '', //to omit "group" key and trim excessive spaces
        group: '',
      };

      setFilter(searchObj);
    }

    if (!input.includes('search') && input.includes('group')) {
      const [groupKey, group] = str.split(':');
      const searchObj = {
        search: '', //to omit "group" key and trim excessive spaces
        group: (group && group.trim().toLowerCase()) || '',
      };

      setFilter(searchObj);
    }

    if (input.includes('search') && input.includes('group')) {
      const [search, group] = str.split(' ');
      const searchObj = {
        search: (search && search.slice(7).trim().toLowerCase()) || '', //to omit "group" key and trim excessive spaces
        group: (group && group.slice(6).trim().toLowerCase()) || '',
      };

      console.log(searchObj);

      setFilter(searchObj);
    }
  }

  const deneme = 'search:Turkey group:Asia';
  const x = deneme.match(/search:(.*) group:(.*)/);

  console.log(x);

  return (
    <div className="relative w-[500px]">
      <input
        type="text"
        className="w-full border-b px-3 text-sm py-2 focus:outline-none placeholder-shown:text-sm peer"
        placeholder="search:turkey group:asia"
        value={input}
        onChange={(e) => filterData(e.target.value)}
      />
      <FiSearch
        className="absolute top-1/2 -translate-y-1/2 right-3"
        size={20}
      />
    </div>
  );
}
