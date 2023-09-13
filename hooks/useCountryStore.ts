import { create } from 'zustand';

import { Country, SearchInput } from '@/types/types';

interface CountryState {
  countriesRaw: Country[] | [];
  setCountries: (arr: Country[]) => void;
  countries: Country[] | [];
  setFilter: (obj: SearchInput) => void;
  page: number;
  setPage: (num: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  firstPage: () => void;
  lastPage: () => void;
  selectedItem: number;
  setSelectedItem: (num: number) => void;
  counter: number;
  setCounter: () => void;
  color: string;
}

const useCountryStore = create<CountryState>((set) => ({
  countriesRaw: [],
  setCountries: (arr: Country[]) => set({ countriesRaw: arr, countries: arr }),
  countries: [],
  setFilter: (obj: SearchInput) =>
    set((state) => {
      const filteredCountries = state.countriesRaw
        .filter(
          (country) =>
            country.name?.toLowerCase().includes(obj.search) ||
            country.capital?.toLowerCase().includes(obj.search) ||
            country.currency?.toLowerCase().includes(obj.search) ||
            country.phone?.toLowerCase().includes(obj.search)
        )
        .filter(
          (country) =>
            country.continent?.toLowerCase().includes(obj.group) ||
            country.languages?.toLowerCase().includes(obj.group)
        );
      return {
        countries: filteredCountries,
        selectedItem:
          filteredCountries.length > 10 ? 9 : filteredCountries.length - 1,
      };
    }),
  page: 1,
  setPage: (num: number) =>
    set((state) => {
      const maxPage = Math.ceil(state.countries.length / 12);
      let selectedPage = num;

      if (selectedPage < 1) {
        selectedPage = 1;
      } else if (selectedPage > maxPage) {
        selectedPage = maxPage;
      }

      let selectedItem;

      if (selectedPage === maxPage || state.countries.length <= 10) {
        selectedItem = state.countries.length - 1;
      } else {
        selectedItem = (selectedPage - 1) * 12 + 9;
      }

      return {
        page: selectedPage,
        selectedItem,
      };
    }),
  nextPage: () =>
    set((state) => {
      const nextPage = state.page + 1;
      const maxPage = Math.ceil(state.countries.length / 12);

      let selectedItem;

      if (nextPage > maxPage) {
        selectedItem = state.countries.length - 1;
      } else {
        selectedItem = (nextPage - 1) * 12 + 9;

        if (selectedItem >= state.countries.length) {
          selectedItem = state.countries.length - 1;
        }
      }

      return {
        page: nextPage > maxPage ? maxPage : nextPage,
        selectedItem,
      };
    }),
  prevPage: () =>
    set((state) => {
      const prevPage = state.page - 1;
      const maxPage = Math.ceil(state.countries.length / 12);

      let selectedItem;

      if (prevPage < 1) {
        selectedItem =
          state.countries.length > 10 ? 9 : state.countries.length - 1;
      } else {
        selectedItem = (prevPage - 1) * 12 + 9;

        if (selectedItem >= state.countries.length) {
          selectedItem =
            state.countries.length > 10 ? 9 : state.countries.length - 1;
        }
      }

      return {
        page: prevPage < 1 ? 1 : prevPage,
        selectedItem,
      };
    }),
  firstPage: () =>
    set((state) => {
      let selectedItem;

      if (state.page === 1 || state.countries.length <= 10) {
        selectedItem =
          state.countries.length > 10 ? 9 : state.countries.length - 1;
      } else {
        selectedItem = 9;
      }

      return {
        page: 1,
        selectedItem,
      };
    }),
  lastPage: () =>
    set((state) => {
      const maxPage = Math.ceil(state.countries.length / 12);
      let selectedItem;

      if (state.page !== maxPage || state.countries.length <= 10) {
        selectedItem = state.countries.length - 1;
      } else {
        selectedItem = (maxPage - 1) * 12 + 9;
      }

      return {
        page: maxPage,
        selectedItem,
      };
    }),
  selectedItem: 9,
  setSelectedItem: (num: number) => set({ selectedItem: num }),
  counter: 1,
  setCounter: () =>
    set((state) => ({
      counter: state.counter + 1,
      color: ['bg-green-200', 'bg-red-200', 'bg-yellow-200', 'bg-blue-200'][
        state.counter % 4
      ],
    })),
  color: 'bg-green-200',
}));

export default useCountryStore;
