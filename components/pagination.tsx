'use client';

import useCountryStore from '@/hooks/useCountryStore';

export default function Pagination() {
  const { prevPage, nextPage, firstPage, lastPage } = useCountryStore();

  return (
    <div>
      <div onClick={prevPage}>prev</div>
      <div onClick={nextPage}>next</div>
      <div onClick={firstPage}>first</div>
      <div onClick={lastPage}>last</div>
    </div>
  );
}
