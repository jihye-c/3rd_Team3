import axios from 'axios';

export const recipeApiInstance = axios.create({
  baseURL: '/recipeAPI',
  params: {
    keyId: import.meta.env.VITE_RECIPE_API_KEY,
    timeout: 5000,
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

export const youtubeApiInstance = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: import.meta.env.VITE_YOUTUBE_API_KEY,
    part: 'snippet', //part: youtube data api를 받을 때 매개변수 필수 속성
  },
});

export const programmersApiInstance = axios.create({
  baseURL: import.meta.env.VITE_PROGRAMMERS_API_ROOT,
  headers: {
    'Content-Type': 'application/json',
  },
});
