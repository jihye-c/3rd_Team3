<script setup lang="ts">
  import CategoryFilterButton from '@/components/recipe/CategoryFilterButton.vue';
  import RecipeRectangleCard from '@/components/recipe/RecipeRectangleCard.vue';
  import SearchBarRounded from '@/components/recipe/SearchBarRounded.vue';
  import {reactive} from 'vue';

  const categoryList = [
    {id: 'rice', label: '밥', image: '/recipe/recipe_icon_rice.svg'},
    {id: 'side', label: '반찬', image: '/recipe/recipe_icon_side.svg'},
    {id: 'soup', label: '국', image: '/recipe/recipe_icon_soup.svg'},
    {id: 'one_dish', label: '일품', image: '/recipe/recipe_icon_one_dish.svg'},
    {id: 'dessert', label: '후식', image: '/recipe/recipe_icon_dessert.svg'},
    {id: 'all', label: '전체', image: '/recipe/recipe_icon_all.svg'},
  ];
  const recipeList = [
    {
      name: '저염된장 삼치구이',
      image: '/recipe/recipe_popular1.webp',
    },
    {
      name: '참나물 소보로 덮밥',
      image: '/recipe/recipe_popular2.webp',
    },
    {
      name: '코코넛워터 토마토카레',
      image: '/recipe/recipe_popular3.webp',
    },
    {
      name: '저염된장 삼치구이',
      image: '/recipe/recipe_popular1.webp',
    },
    {
      name: '참나물 소보로 덮밥',
      image: '/recipe/recipe_popular2.webp',
    },
    {
      name: '코코넛워터 토마토카레',
      image: '/recipe/recipe_popular3.webp',
    },
    {
      name: '저염된장 삼치구이',
      image: '/recipe/recipe_popular1.webp',
    },
    {
      name: '참나물 소보로 덮밥',
      image: '/recipe/recipe_popular2.webp',
    },
    {
      name: '코코넛워터 토마토카레',
      image: '/recipe/recipe_popular3.webp',
    },
  ];

  const activeFilterList = reactive(['rice']);
  const ingredientList = reactive(['소고기', '당근']);

  const handleSearch = (searchText: string) => alert(`검색어: ${searchText}`);
</script>

<template>
  <!-- 배너 -->
  <div class="w-full h-[340px] overflow-hidden">
    <div class="bg-[url(/recipe/recipe_search_banner.webp)] w-full h-full bg-cover bg-center">
      <div class="w-full h-full bg-mono-900/30 flex place-content-center pb-[70px]">
        <div class="container flex flex-col gap-10 justify-end">
          <!-- 타이틀 -->
          <div>
            <div class="text-[24px] text-mono-050 leading-10">간편하게 따라하는 오늘의 한 끼</div>
            <div class="text-[52px] font-bold text-mono-050 leading-16">레시피 검색</div>
            <!-- 🔥 브래드크럼 속성 적용하기 -->
            <v-breadcrumbs
              :items="['홈', '레시피', '레시피 검색']"
              color="#fafaf9"
              active-color="#fafaf9"
              class="px-0"
            ></v-breadcrumbs>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 데이터 개수 -->
  <div class="container w-full pt-[60px] text-[20px] text-mono-600 font-medium text-right">
    전체 : NNN개 레시피
  </div>

  <div class="container flex justify-between pt-[28px] pb-[100px]">
    <!-- 검색 필터 -->
    <div
      class="flex flex-col w-[400px] p-[32px] border-2 border-mono-200 rounded-[12px] justify-center self-start sticky top-4"
    >
      <!-- 초기화 버튼 -->
      <div class="flex justify-end">
        <button>
          <div class="flex gap-1 items-center">
            <div class="text-[18px] text-mono-400">초기화</div>
            <v-icon size="20px" color="#79716b">mdi-restart</v-icon>
          </div>
        </button>
      </div>
      <!-- 레시피별 검색 섹션 -->
      <div class="flex flex-col gap-5">
        <div class="text-[28px] font-semibold text-mono-900">레시피별 검색</div>
        <SearchBarRounded @search="handleSearch" />
        <!-- 필터 버튼 -->
        <div class="grid grid-cols-3 gap-5 p-[12px] place-items-center">
          <template v-for="item in categoryList" :key="item.id">
            <CategoryFilterButton
              :image="item.image"
              :label="item.label"
              :is-active="activeFilterList.includes(item.id)"
            />
          </template>
        </div>
      </div>

      <div class="flex items-center h-[80px] w-[268px] place-self-center">
        <v-divider></v-divider>
      </div>

      <!-- 재료별 검색 섹션 -->
      <div class="flex flex-col gap-5">
        <div class="text-[28px] font-semibold text-mono-900">재료별 검색</div>
        <SearchBarRounded @search="handleSearch" />
        <div class="flex flex-wrap gap-3">
          <template v-for="item in ingredientList" :key="item">
            <v-chip close-icon="mdi-close" closable>{{ item }}</v-chip>
          </template>
        </div>
      </div>
    </div>
    <!-- 리스트 -->
    <div class="grid grid-cols-2 gap-x-[48px] gap-y-[28px]">
      <template v-for="item in recipeList">
        <RecipeRectangleCard :title="item.name" :image="item.image" />
      </template>
    </div>
  </div>
</template>

<style scoped>
  :deep(.v-chip) {
    color: var(--color-mono-050);
    background: var(--color-main-400);
    font-weight: 600;
    padding-left: 14px;
    padding-right: 14px;
  }
</style>
