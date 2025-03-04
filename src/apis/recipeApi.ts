import type {Recipe, RecipeResponse} from '@/types/RecipeResponse';
import {recipeApiInstance} from '@/utils/axiosInstance';

interface RecipeParams {
  startIdx: string;
  endIdx: string;
  RCP_NM?: string;
  RCP_PAT2?: string;
  RCP_PARTS_DTLS?: string[];
}

export const fetchRecipes = async (params: RecipeParams): Promise<RecipeResponse> => {
  try {
    const {startIdx, endIdx} = params;
    const apiKey = import.meta.env.VITE_RECIPE_API_KEY; // API 키 가져오기
    const url = `/${apiKey}/COOKRCP01/json/${startIdx}/${endIdx}`;
    const response = await recipeApiInstance.get<RecipeResponse>(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};
