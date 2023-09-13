'use client';

import useCountryStore from '@/hooks/useCountryStore';

export default function Pagination() {
  const { countries } = useCountryStore();
  const nextPage = useCountryStore((state) => state.nextPage);
  const prevPage = useCountryStore((state) => state.prevPage);

  console.log(countries);

  return (
    <div>
      <div onClick={prevPage}>prev</div>
      <div onClick={nextPage}>next</div>
    </div>
  );
}
