<script setup lang="ts">
  import RecipeSquareCard from '@/components/RecipeSquareCard.vue';

  const handleSearch = () => alert('click!');

  const recipeCategoryData = [
    {
      category: '밥',
      image: '/recipe/recipe_category_rice.png',
    },
    {
      category: '반찬',
      image: '/recipe/recipe_category_side.jpg',
    },
    {
      category: '국',
      image: '/recipe/recipe_category_soup.jpg',
    },
    {
      category: '일품',
      image: '/recipe/recipe_category_one_dish.jpg',
    },
    {
      category: '후식',
      image: '/recipe/recipe_category_dessert.jpg',
    },
  ];
  const recipeIngredientData = [
    {
      category: '육류',
      image: '/recipe/recipe_ingredient_meat.jpg',
    },
    {
      category: '채소',
      image: '/recipe/recipe_ingredient_vegetable.jpg',
    },
    {
      category: '해산물',
      image: '/recipe/recipe_ingredient_seafood.jpg',
    },
    {
      category: '과일',
      image: '/recipe/recipe_ingredient_fruit.jpg',
    },
  ];
  const todaysRecipe = {
    title: '소고기 들깨 알토란탕',
    subtitle: '오늘의 추천 레시피',
    description:
      '소고기 들깨 알토란탕은 고소한 들깨가루와 부드러운 소고기, 그리고 특유의 식감이 일품인 알토란을 주재료로 한 영양가 높은 한식 탕입니다. 알토란의 아삭한 식감과 들깨의 고소함이 어우러져 깊은 맛을 내며, 소고기의 감칠맛이 국물에 배어 풍미를 더합니다.',
    image: '/recipe/recipe_todays.jpg',
    INFO_NA: 675.68,
    INFO_WGT: 297,
    INFO_PRO: 7.57,
    INFO_FAT: 5.17,
    INFO_CAR: 17.4,
  };
</script>

<template>
  <!-- 배너 -->
  <div class="tw:w-full tw:h-[562px] tw:overflow-hidden">
    <div
      class="tw:bg-[url(https://images.unsplash.com/photo-1497888329096-51c27beff665?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] tw:w-full tw:h-full tw:bg-cover tw:bg-center"
    >
      <div class="tw:w-full tw:h-full tw:bg-mono-900/30 tw:flex tw:place-content-center">
        <div class="tw:flex tw:flex-col tw:gap-10 tw:justify-center">
          <!-- 타이틀 -->
          <div>
            <div class="tw:text-[40px] tw:text-mono-050 tw:leading-10">혼자 살아도 건강하게!</div>
            <div class="tw:text-[48px] tw:font-bold tw:text-mono-050 tw:leading-16">
              자취생을 위한 영양만점 레시피
            </div>
          </div>
          <!-- 검색바 -->
          <div
            class="tw:bg-mono-050 tw:w-[1060px] tw:h-[64px] tw:rounded-[100px] tw:flex tw:items-center tw:justify-between tw:!px-[30px]"
          >
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              class="tw:h-[30px] tw:w-[900px] text tw:placeholder:text-[20px] tw:outline-none tw:!text-[20px]"
            />
            <button @click="handleSearch">
              <v-icon color="grey-darken-1" size="36px">mdi-magnify</v-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container tw:flex tw:flex-col tw:gap-[100px] tw:!pt-[100px]">
    <!-- 카테고리별 레시피 -->
    <div class="tw:flex tw:flex-col tw:gap-[28px]">
      <div class="ft-point tw:text-[48px] tw:text-mono-700">카테고리별 레시피</div>
      <div class="tw:flex tw:justify-between">
        <template v-for="item in recipeCategoryData" :key="item.category">
          <RecipeSquareCard :title="item.category" :image="item.image" />
        </template>
      </div>
    </div>
    <!-- 오늘의 레시피 -->
    <div class="tw:flex tw:flex-col tw:gap-[28px]">
      <div class="ft-point tw:text-[48px] tw:text-mono-700">오늘의 레시피</div>
      <div class="tw:flex tw:justify-between">
        <RecipeSquareCard
          :title="todaysRecipe.title"
          :subtitle="todaysRecipe.subtitle"
          :image="todaysRecipe.image"
          large
        />
        <div class="tw:flex tw:flex-col tw:w-[1040px] tw:justify-between tw:text-mono-700">
          <div class="tw:flex tw:flex-col tw:gap-4">
            <div class="tw:text-[32px] tw:font-bold">레시피 설명</div>
            <p class="tw:text-[20px] tw:leading-[24px]">{{ todaysRecipe.description }}</p>
          </div>
          <div class="tw:flex tw:flex-col tw:gap-2">
            <div class="tw:text-[32px] tw:font-bold">영양정보</div>
            <p class="tw:text-[20px] tw:leading-[24px] tw:text-mono-400">
              1일 영양성분 기준치에 대한 비율 (%)
            </p>
            <div class="tw:bg-main-50 tw:h-[200px]"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 냉장고 속 재료별 레시피 -->
    <div class="tw:flex tw:flex-col tw:gap-[28px]">
      <div class="ft-point tw:text-[48px] tw:text-mono-700">냉장고 속 재료별 레시피</div>
      <div class="tw:flex tw:justify-between">
        <template v-for="item in recipeIngredientData" :key="item.category">
          <RecipeSquareCard :title="item.category" :image="item.image" medium />
        </template>
      </div>
    </div>
  </div>
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
</template>

<style scoped></style>
