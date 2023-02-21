import axios from 'axios';

const API_KEY = 'e57746b2e4fe98cb5cc839cb405a15f1';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchAPI(page) {
  try {
    const response = await axios.get(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${page}`
    );

    return response.data;
  } catch (error) {
    console.error('getTrendingFilms error' + error);
  }
}

export async function getMoviesSearch(query, page = 1) {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
    );

    return await response.data;
  } catch (error) {
    console.error('getMoviesSearch error' + error);
  }
}

export async function getMovieDetails(id) {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
    );
    return await response.data;
  } catch (error) {
    console.error('getMovieDetails error' + error);
  }
}

export async function getTopFilms() {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
    );

    return response.data;
  } catch (error) {
    console.error('getTopFilms error' + error);
  }
}
