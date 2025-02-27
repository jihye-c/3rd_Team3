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
</script>

<template>
  <div class="tw:flex tw:flex-col tw:gap-[100px]">
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
    <!-- 카테고리별 레시피 -->
    <div class="container tw:flex tw:flex-col tw:gap-[28px]">
      <div class="ft-point tw:text-[48px] tw:text-mono-700">카테고리별 레시피</div>
      <div class="tw:flex tw:justify-between">
        <template v-for="item in recipeCategoryData" :key="item.category">
          <RecipeSquareCard :title="item.category" :image="item.image" />
        </template>
      </div>
    </div>
  </div>
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
</template>

<style scoped></style>
