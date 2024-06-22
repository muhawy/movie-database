import axios from 'axios';

const API_KEY = '6b0c556e0178b0179720335f8b11fb44';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const fetchNowPlaying = async () => {
  const response = await api.get('/movie/now_playing');
  return response.data.results;
};

export const fetchTopRated = async () => {
  const response = await api.get('/movie/top_rated');
  return response.data.results;
};

export const fetchRecommendations = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/recommendations`);
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await api.get('/search/movie', {
    params: {
      query,
    },
  });
  return response.data.results;
};

export const createRequestToken = async () => {
  const response = await api.get('/authentication/token/new');
  return response.data.request_token;
};

export const createSession = async (requestToken) => {
  const response = await api.post('/authentication/session/new', {
    request_token: requestToken,
  });
  return response.data.session_id;
};

export const fetchAccountDetails = async (sessionId) => {
  const response = await api.get('/account', {
    params: {
      session_id: sessionId,
    },
  });
  return response.data;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await api.get(`/movie/${movieId}`);
  return response.data;
};
