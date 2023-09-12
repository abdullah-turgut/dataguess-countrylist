'use client';

import useCountryStore from '@/hooks/useCountryStore';

export default function SearchInput() {
  const { setFilter } = useCountryStore();

  function filterData(str: string) {
    const [searchKey, search, group] = str.split(':');
    const searchObj = {
      search: search.slice(0, -5).trim(), //to omit "group" key and trim excessive spaces
      group: group,
    };

    setFilter(searchObj);
  }

  return <div>SearchInput</div>;
}
