import { create } from 'zustand';

import { Country, SearchInput } from '@/types/types';

interface CountryState {
  countriesRaw: Country[] | [];
  setCountries: (arr: Country[]) => void;
  countries: Country[] | [];
  setFilter: (obj: SearchInput) => void;
}

const useCountryStore = create<CountryState>((set) => ({
  countriesRaw: [],
  setCountries: (arr: Country[]) => set({ countriesRaw: arr, countries: arr }),
  countries: [],
  setFilter: (obj: SearchInput) =>
    set((state) => ({
      countries: state.countriesRaw
        .filter((country) => country.name.toLowerCase().includes(obj.search))
        .filter(
          (country) =>
            country.continent.toLowerCase().includes(obj.group) ||
            country.languages.toLowerCase().includes(obj.group)
        ),
    })),
}));

export default useCountryStore;
