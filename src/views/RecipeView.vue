<script setup lang="ts">
  import DoughnutChart from '@/components/recipe/DoughnutChart.vue';
  import RecipeMainBanner from '@/components/recipe/RecipeMainBanner.vue';
  import RecipePostList from '@/components/recipe/RecipePostList.vue';
  import RecipeRectangleCard from '@/components/recipe/RecipeRectangleCard.vue';
  import RecipeSquareCard from '@/components/recipe/RecipeSquareCard.vue';
  import {RECIPE_CHANNEL_ID} from '@/constants/channelId';
  import type {Post} from '@/types/PostResponse';
  import {programmersApiInstance} from '@/utils/axiosInstance';
  import {onMounted, ref} from 'vue';
  import {useRouter} from 'vue-router';

  const recipeCategoryData = [
    {
      category: '밥',
      image: '/images/recipe/recipe_category_rice.webp',
    },
    {
      category: '반찬',
      image: '/images/recipe/recipe_category_side.webp',
    },
    {
      category: '국',
      image: '/images/recipe/recipe_category_soup.webp',
    },
    {
      category: '일품',
      image: '/images/recipe/recipe_category_one_dish.webp',
    },
    {
      category: '후식',
      image: '/images/recipe/recipe_category_dessert.webp',
    },
  ];
  const recipeIngredientData = [
    {
      category: '육류',
      image: '/images/recipe/recipe_ingredient_meat.webp',
      ingredient: '고기',
    },
    {
      category: '채소',
      image: '/images/recipe/recipe_ingredient_vegetable.webp',
      ingredient: '양파',
    },
    {
      category: '해산물',
      image: '/images/recipe/recipe_ingredient_seafood.webp',
      ingredient: '새우',
    },
    {
      category: '과일',
      image: '/images/recipe/recipe_ingredient_fruit.webp',
      ingredient: '사과',
    },
  ];
  const todaysRecipeData = {
    title: '소고기 들깨 알토란탕',
    subtitle: '오늘의 추천 레시피',
    description:
      '소고기 들깨 알토란탕은 고소한 들깨가루와 부드러운 소고기, 그리고 특유의 식감이 일품인 알토란을 주재료로 한 영양가 높은 한식 탕입니다. 알토란의 아삭한 식감과 들깨의 고소함이 어우러져 깊은 맛을 내며, 소고기의 감칠맛이 국물에 배어 풍미를 더합니다.',
    image: '/images/recipe/recipe_todays.webp',
    nutrition: {
      calories: 300.42,
      sodium: 400.68,
      protein: 16.57,
      fat: 5.17,
      carbohydrates: 50.4,
    },
  };
  const popularRecipeData = [
    {title: '코코넛워터 토마토카레', image: '/images/recipe/recipe_popular1.webp'},
    {title: '저염된장 삼치구이', image: '/images/recipe/recipe_popular2.webp'},
    {title: '참나물 소보로덮밥', image: '/images/recipe/recipe_popular3.webp'},
  ];

  const router = useRouter();

  const recipeCommunityData = ref<Post[]>([]);
  const isLoading = ref<boolean>(false);

  onMounted(async () => {
    try {
      isLoading.value = true;
      const response = await programmersApiInstance.get<Post[]>(
        `/posts/channel/${RECIPE_CHANNEL_ID}`,
      );
      recipeCommunityData.value = response.data;
    } catch (error) {
      console.error('질문 데이터를 불러오는 중 문제가 생겼습니다.', error);
    } finally {
      isLoading.value = false;
    }
  });
</script>

<template>
  <!-- 배너 -->
  <RecipeMainBanner />
  <div class="container flex flex-col gap-[100px] py-[100px]">
    <!-- 카테고리별 레시피 -->
    <div class="flex flex-col gap-[28px]">
      <div class="ft-point text-[48px] text-mono-700">카테고리별 레시피</div>
      <div class="flex justify-between">
        <template v-for="item in recipeCategoryData" :key="item.category">
          <RecipeSquareCard
            :title="item.category"
            :image="item.image"
            :size="300"
            class="px-6 py-4"
            @click="() => router.push({name: 'recipe-search', query: {category: item.category}})"
          />
        </template>
      </div>
    </div>
    <!-- 인기 레시피 레시피 -->
    <div class="flex flex-col gap-[28px]">
      <div class="ft-point text-[48px] text-mono-700">인기 레시피</div>
      <div class="flex justify-between">
        <template v-for="item in popularRecipeData" :key="item.title">
          <RecipeRectangleCard
            :image="item.image"
            :title="item.title"
            @click="router.push({name: 'recipe-detail', params: {id: item.title}})"
          />
        </template>
      </div>
    </div>
    <!-- 오늘의 레시피 -->
    <div class="flex flex-col gap-[28px]">
      <div class="ft-point text-[48px] text-mono-700">오늘의 레시피</div>
      <div class="flex justify-between">
        <RecipeSquareCard
          :title="todaysRecipeData.title"
          :subtitle="todaysRecipeData.subtitle"
          :image="todaysRecipeData.image"
          :size="460"
          class="px-9 py-8"
          @click="
            () =>
              router.push({
                name: 'recipe-detail',
                params: {id: todaysRecipeData.title},
              })
          "
        />
        <div class="flex flex-col w-[1040px] justify-between text-mono-700">
          <div class="flex flex-col gap-3">
            <div class="text-[32px] font-bold">레시피 설명</div>
            <p class="text-[20px] leading-[28px]">{{ todaysRecipeData.description }}</p>
          </div>
          <div class="flex flex-col gap-2">
            <div class="text-[32px] font-bold">영양정보</div>
            <p class="text-[20px] leading-[24px] text-mono-400">
              1일 영양성분 기준치에 대한 비율 (%)
            </p>
            <div class="h-[200px] w-[1040px]">
              <div class="flex justify-between mt-[20px]">
                <template v-for="(value, key) in todaysRecipeData.nutrition">
                  <div class="w-[180px] h-[180px]">
                    <DoughnutChart :nutrition-info="key" :input-data="value" />
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 냉장고 속 재료별 레시피 -->
    <div class="flex flex-col gap-[28px]">
      <div class="ft-point text-[48px] text-mono-700">냉장고 속 재료별 레시피</div>
      <div class="flex justify-between">
        <template v-for="item in recipeIngredientData" :key="item.category">
          <RecipeSquareCard
            :title="item.category"
            :image="item.image"
            :size="380"
            @click="
              () =>
                router.push({
                  name: 'recipe-search',
                  query: {ingredients: item.ingredient},
                })
            "
          />
        </template>
      </div>
    </div>
    <!-- 리얼 자취생 레시피 -->
    <div class="flex flex-col gap-[28px]">
      <div class="ft-point text-[48px] text-mono-700">리얼 자취생 레시피</div>
      <div class="grid grid-cols-2 gap-[24px] justify-between">
        <template
          v-if="recipeCommunityData"
          v-for="item in recipeCommunityData.slice(0, 4)"
          :key="item.title"
        >
          <RecipePostList
            :author="JSON.parse(item.author.fullName).nickname"
            :title="JSON.parse(item.title).title"
            :content="JSON.parse(item.title).content"
            :image="item.image"
            @click="() => router.push(`/community/recipe/post/${item._id}`)"
          />
        </template>
      </div>
    </div>
    <!-- 커뮤니티 이동 배너 -->
    <div
      class="container h-[230px] w-full bg-main-50 rounded-[12px] p-[72px] flex items-center justify-between cursor-pointer"
      @click="() => router.push('/community/recipe')"
    >
      <div class="w-[200px] h-[160px] bg-[url(/images/recipe/recipe_illustration.svg)]"></div>
      <div class="flex flex-col items-end">
        <div class="text-main-500 text-[48px] font-bold">나만의 레시피를 함께 공유해보세요!</div>
        <div class="flex gap-[12px] items-center">
          <p class="text-main-500 text-[28px]">자취 레시피 커뮤니티 바로가기</p>
          <v-icon size="28px" color="#e7620a">mdi-arrow-right-circle</v-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
