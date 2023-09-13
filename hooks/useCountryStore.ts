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

      // Sayfa numarasını kontrol et ve 1 ile maxPage arasında bir değere sınırla.
      if (selectedPage < 1) {
        selectedPage = 1;
      } else if (selectedPage > maxPage) {
        selectedPage = maxPage;
      }

      let selectedItem;

      // Eğer seçilen sayfa son sayfadaysa veya sayfada 10'dan az eleman varsa,
      // selectedItem'ı son elemana ayarla.
      if (selectedPage === maxPage || state.countries.length <= 10) {
        selectedItem = state.countries.length - 1;
      } else {
        // Diğer durumlarda, seçilen sayfaya gidince 10. elemanı seçmeye çalış.
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

      // Eğer mevcut sayfa son sayfadaysa veya daha büyük bir sayfaya geçmeye çalışıyorsak,
      // selectedItem'ı son elemana ayarla.
      if (nextPage > maxPage) {
        selectedItem = state.countries.length - 1;
      } else {
        // Diğer durumlarda, 10. elemanı seçmeye çalış, ancak
        // bu eleman mevcut sayfada olmayabilir, bu yüzden sayfa son sayfadaysa
        // selectedItem'ı son elemana ayarla.
        selectedItem = (nextPage - 1) * 12 + 9;

        // Eğer seçilen eleman sayfa içinde değilse ve mevcut sayfa son sayfadaysa,
        // selectedItem'ı son elemana ayarla.
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

      // Eğer mevcut sayfa ilk sayfadaysa veya daha küçük bir sayfaya geçmeye çalışıyorsak,
      // selectedItem'ı son elemana ayarla.
      if (prevPage < 1) {
        selectedItem =
          state.countries.length > 10 ? 9 : state.countries.length - 1;
      } else {
        // Diğer durumlarda, 10. elemanı seçmeye çalış, ancak
        // bu eleman mevcut sayfada olmayabilir, bu yüzden sayfa ilk sayfadaysa
        // selectedItem'ı son elemana ayarla.
        selectedItem = (prevPage - 1) * 12 + 9;

        // Eğer seçilen eleman sayfa içinde değilse ve mevcut sayfa ilk sayfadaysa,
        // selectedItem'ı son elemana ayarla.
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

      // Eğer mevcut sayfa ilk sayfadaysa veya 10'dan az eleman varsa,
      // selectedItem'ı son elemana ayarla.
      if (state.page === 1 || state.countries.length <= 10) {
        selectedItem =
          state.countries.length > 10 ? 9 : state.countries.length - 1;
      } else {
        // Diğer durumlarda, ilk sayfaya gidince 10. elemanı seçmeye çalış.
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

      // Eğer mevcut sayfa son sayfadaysa veya mevcut sayfada 10'dan az eleman varsa,
      // selectedItem'ı son elemana ayarla.
      if (state.page !== maxPage || state.countries.length <= 10) {
        selectedItem = state.countries.length - 1;
      } else {
        // Diğer durumlarda, son sayfaya gidince 10. elemanı seçmeye çalış.
        selectedItem = (maxPage - 1) * 12 + 9;
      }

      return {
        page: maxPage,
        selectedItem,
      };
    }),
  selectedItem: 9,
  setSelectedItem: (num: number) => set({ selectedItem: num }),
}));

export default useCountryStore;
