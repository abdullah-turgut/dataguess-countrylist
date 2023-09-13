import { useState, useEffect } from 'react';
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi';
import useCountryStore from '@/hooks/useCountryStore';

export default function Pagination() {
  const { prevPage, nextPage, firstPage, lastPage, setPage, page } =
    useCountryStore();
  const totalPage = Math.ceil(useCountryStore.getState().countries.length / 12);

  const [inputValue, setInputValue] = useState(page.toString());

  useEffect(() => {
    setInputValue(page.toString());
  }, [page]);

  const handleInputChange = (e: any) => {
    const value = e.target.value;

    setInputValue(value);

    let newPage = Number(value);

    if (newPage < 1) {
      newPage = 1;
    }

    if (newPage > totalPage) {
      newPage = totalPage;
    }

    setPage(newPage);
  };

  return (
    <div className="flex justify-end">
      <div className="flex items-center justify-center">
        <div onClick={firstPage}>
          <HiChevronDoubleLeft
            size={28}
            className={`cursor-pointer opacity-70 hover:opacity-100 transition ${
              page === 1 ? 'text-gray-400' : ''
            }`}
          />
        </div>
        <div onClick={prevPage}>
          <HiChevronLeft
            size={28}
            className={`cursor-pointer opacity-70 hover:opacity-100 transition ${
              page === 1 ? 'text-gray-400' : ''
            }`}
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-x-3 text-sm">
        <input
          type="number"
          name="page"
          id=""
          value={inputValue}
          onChange={handleInputChange}
          className="w-12 border-2 rounded-full focus:outline-none  text-center py-1"
        />
        <div>
          of <span>{totalPage}</span>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div onClick={nextPage}>
          <HiChevronRight
            size={28}
            className={`cursor-pointer opacity-70 hover:opacity-100 transition ${
              page === totalPage ? 'text-gray-400' : ''
            }`}
          />
        </div>
        <div onClick={lastPage}>
          <HiChevronDoubleRight
            size={28}
            className={`cursor-pointer opacity-70 hover:opacity-100 transition ${
              page === totalPage ? 'text-gray-400' : ''
            }`}
          />
        </div>
      </div>
    </div>
  );
}
