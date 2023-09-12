export type Country = {
  name: string;
  code: string;
  capital: string | null;
  languages: string;
  continent: string;
  currency: string | null;
  phone: string;
};

export type SearchInput = {
  search: string;
  group: string;
};
