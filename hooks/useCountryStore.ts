import { create } from 'zustand';

import { Country, SearchInput } from '@/types/types';

interface CountryState {
  countries: Country[] | [];
  setCountries: (arr: Country[]) => void;
  setFilter: (obj: SearchInput) => void;
}

const useCountryStore = create<CountryState>((set) => ({
  countries: [],
  setCountries: (arr: Country[]) => set({ countries: arr }),
  setFilter: (obj: SearchInput) =>
    set((state) => ({
      countries: state.countries
        .filter((country) => country.name.includes(obj.search))
        .filter((country) => country.continent.includes(obj.group)),
    })),
}));

export default useCountryStore;
