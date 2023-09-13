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
}

const useCountryStore = create<CountryState>((set) => ({
  countriesRaw: [],
  setCountries: (arr: Country[]) => set({ countriesRaw: arr, countries: arr }),
  countries: [],
  setFilter: (obj: SearchInput) =>
    set((state) => ({
      countries: state.countriesRaw
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
        ),
    })),
  page: 2,
  setPage: (num: number) => set({ page: num }),
  nextPage: () =>
    set((state) => ({
      page:
        state.page === Math.ceil(state.countries.length / 12)
          ? state.page
          : state.page + 1,
    })),
  prevPage: () =>
    set((state) => ({ page: state.page === 1 ? 1 : state.page - 1 })),
}));

export default useCountryStore;
