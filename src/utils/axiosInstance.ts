import axios from 'axios';

const recipeApiInstance = axios.create({
  baseURL: '/recipeAPI',
  params: {
    keyId: import.meta.env.VITE_RECIPE_API_KEY,
    timeout: 5000,
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

export {recipeApiInstance};
