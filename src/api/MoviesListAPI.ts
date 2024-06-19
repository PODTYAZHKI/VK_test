import axios from 'axios';

export function getFilms(page = 1, limit = 50, query: string) {
  const link = "https://api.kinopoisk.dev/v1.4/movie/search";
  const headers = {
    'X-API-KEY': import.meta.env.VITE_TOKEN,
  };
  const params = {
    page: String(page),
    limit: String(limit),
    query: name,
  }
  console.log('pagination', params)
  return axios.get(link, { headers, params });
}
export function getFilmsWithFilters(params: string) {
  const link = `https://api.kinopoisk.dev/v1.4/movie?${params}`;
  const headers = {
    'X-API-KEY': import.meta.env.VITE_TOKEN,
  };
  console.log('link', link)
  console.log(params)
  return axios.get(link, { headers });

}


export function getPossibleValuesByField(field: string) {
  const link = "https://api.kinopoisk.dev/v1/movie/possible-values-by-field";
  const headers = {
    'X-API-KEY': import.meta.env.VITE_TOKEN,
  };

  return axios.get(link, { headers, params: { field: field } });
}
