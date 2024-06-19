import axios from 'axios';

export function getMovieById(id: number) {
	const link = `https://api.kinopoisk.dev/v1.4/movie/${id}`;
	const headers = {
	  'X-API-KEY': import.meta.env.VITE_TOKEN
	};
  
	return axios.get(link, { headers });
  }



  