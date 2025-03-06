import type {Recipe, RecipeResponse} from '@/types/RecipeResponse';
import {recipeApiInstance} from '@/utils/axiosInstance';

interface RecipeParams {
  // startIdx: string;
  // endIdx: string;
  page: number;
  RCP_NM: string;
  RCP_PAT2: string;
  RCP_PARTS_DTLS: string[];
}

const apiKey = import.meta.env.VITE_RECIPE_API_KEY; // API 키 가져오기

export const fetchRecipeList = async (params: RecipeParams): Promise<RecipeResponse> => {
  try {
    const {page, RCP_NM, RCP_PAT2, RCP_PARTS_DTLS} = params;
    const startIdx = (page - 1) * 20 + 1;
    const endIdx = page * 20;

    // RCP_PARTS_DTLS 2개 이상일 때
    if (RCP_PARTS_DTLS.length > 1) {
      const allRecipes: Recipe[][] = [];

      for (let ingredient of RCP_PARTS_DTLS) {
        const url = `/${apiKey}/COOKRCP01/json/${startIdx}/${endIdx}/${RCP_NM ? `RCP_NM=${RCP_NM}&` : ''}${RCP_PAT2 ? `RCP_PAT2=${RCP_PAT2}&` : ''}RCP_PARTS_DTLS=${ingredient}`;
        try {
          const response = await recipeApiInstance.get<RecipeResponse>(url);
          if (response.data?.COOKRCP01?.row) {
            allRecipes.push(response.data.COOKRCP01.row);
          }
        } catch (err) {
          console.error(`Error fetching recipes for ingredient: ${ingredient}`, err);
        }
        await new Promise((resolve) => setTimeout(resolve, 500)); // 0.5초 대기 후 다음 요청
      }

      // 교집합 데이터만 필터링 하기
      const intersectionRecipes = allRecipes.reduce((acc, curr) => {
        if (acc.length === 0) return curr;
        return acc.filter((recipe) => curr.some((r) => r.RCP_SEQ === recipe.RCP_SEQ));
      }, []);

      return {
        COOKRCP01: {
          RESULT: {MSG: 'Success', CODE: 'INFO-000'},
          row: intersectionRecipes,
          total_count: intersectionRecipes.length.toString(),
        },
      };
    }
    // RCP_PARTS_DTLS 1개 이하일 때
    const url = `/${apiKey}/COOKRCP01/json/${startIdx}/${endIdx}/${RCP_NM ? `RCP_NM=${RCP_NM}&` : ''}${RCP_PAT2 ? `RCP_PAT2=${RCP_PAT2}&` : ''}${RCP_PARTS_DTLS.length > 0 ? `RCP_PARTS_DTLS=${RCP_PARTS_DTLS[0]}` : ''}`;
    const response = await recipeApiInstance.get<RecipeResponse>(url);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const fetchRecipe = async (recipeName: string): Promise<Recipe> => {
  try {
    const url = `/${apiKey}/COOKRCP01/json/${1}/${10}/RCP_NM=${recipeName}`;
    const response = await recipeApiInstance.get<RecipeResponse>(url);
    // console.log(response.data);
    return response.data.COOKRCP01.row[0];
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};
