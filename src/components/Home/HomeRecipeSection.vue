<template>
  <div>
    <HomeTitle
      title="오늘의 레시피"
      link="/recipe"
      content="간편하게 따라하는 오늘의 한 끼"
    />

    <div class="flex py-10 gap-10">
      <div>
        <RecipeSquareCard
          :image="todaysRecipeData.image"
          :size="500"
          :title="todaysRecipeData.title"
          :subtitle="todaysRecipeData.subtitle"
        />
      </div>

      <div class="flex w-full flex-col justify-between gap-3">
        <!-- 영양가득 레시피 -->
        <div>
          <div class="pb-6 flex justify-between">
            <h4 class="text-2xl font-semibold">영양가득 레시피</h4>
            <div class="flex text-mono-400 items-center">
              <span @click="router.push('/recipe/search?page=1')" class="cursor-pointer">
                전체보기
              </span>
              <v-icon>mdi-chevron-right</v-icon>
            </div>
          </div>

          <div class="flex gap justify-between">
            <RecipeSquareCard
              v-for="(item, index) in popularRecipeData"
              :key="index"
              :image="item.image"
              :size="200"
              :title="item.title"
              font_class="!text-[18px]"
            />
          </div>
        </div>

        <!-- 리얼 자취생 레시피 -->
        <div>
          <div class="pb-6 flex justify-between">
            <h4 class="text-2xl font-semibold">리얼 자취생 레시피</h4>
            <div class="flex text-mono-400 items-center">
              <span @click="router.push('/community/recipe')" class="cursor-pointer">
                전체보기
              </span>
              <v-icon>mdi-chevron-right</v-icon>
            </div>
          </div>

          <div class="flex gap-2 justify-between">
            <RecipePostList
              v-for="(item, index) in recipeCommunityData"
              :key="index"
              :author="item.author.nickname"
              :image="item.image"
              :size="200"
              :title="item.title.title"
              :content="item.title.content"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";

import RecipeSquareCard from "@/components/recipe/RecipeSquareCard.vue";
import RecipePostList from "@/components/recipe/RecipePostList.vue";
import HomeTitle from "./common/HomeTitle.vue";

import { RECIPE_CHANNEL_ID } from "@/constants/channelId";
import { programmersApiInstance } from "@/utils/axiosInstance";
import type { Post } from "@/types/PostResponse";

const router = useRouter();
const recipeCommunityData = ref<Post[]>([]);

const popularRecipeData = [
  { title: "코코넛워터 토마토카레", image: "/images/recipe/recipe_popular3.webp" },
  { title: "저염된장 삼치구이", image: "/images/recipe/recipe_popular1.webp" },
  { title: "참나물 소보로덮밥", image: "/images/recipe/recipe_popular2.webp" },
  { title: "일본식 우동", image: "/images/recipe/recipe_category_soup.webp" },
  { title: "참치마요 덮밥", image: "/images/recipe/recipe_category_one_dish.webp" },
];

const todaysRecipeData = {
  title: "소고기 들깨 알토란탕",
  subtitle: "오늘의 추천 레시피",
  image: "/images/recipe/recipe_todays.webp",
  description:
    "소고기 들깨 알토란탕은 고소한 들깨가루와 부드러운 소고기, 그리고 특유의 식감이 일품인 알토란을 주재료로 한 영양가 높은 한식 탕입니다. 알토란의 아삭한 식감과 들깨의 고소함이 어우러져 깊은 맛을 내며, 소고기의 감칠맛이 국물에 배어 풍미를 더합니다.",
  nutrition: {
    calories: 146.42,
    sodium: 675.68,
    protein: 7.57,
    fat: 5.17,
    carbohydrates: 17.4,
  },
};

onBeforeMount(async () => {
  try {
    const response = await programmersApiInstance.get(`/posts/channel/${RECIPE_CHANNEL_ID}`);
    recipeCommunityData.value = response.data.slice(0, 2).map((item: Post) => ({
      ...item,
      title: JSON.parse(item.title),
      author: JSON.parse(item.author.fullName),
    }));
  } catch (error) {
    console.error("레시피 데이터를 불러오는 중 오류 발생:", error);
  }
});
</script>

<style scoped></style>
