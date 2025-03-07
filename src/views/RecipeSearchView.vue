<script setup lang="ts">
  import {fetchRecipeList} from '@/apis/recipeApi';
  import BannerComponent from '@/components/BannerComponent.vue';
  import CategoryFilterButton from '@/components/recipe/CategoryFilterButton.vue';
  import RecipeRectangleCard from '@/components/recipe/RecipeRectangleCard.vue';
  import SearchBarRounded from '@/components/recipe/SearchBarRounded.vue';
  import type {Recipe} from '@/types/RecipeResponse';
  import {computed, watch, ref} from 'vue';
  import {useRoute, useRouter} from 'vue-router';

  const categoryList = [
    {id: 'rice', label: '밥', image: '/images/recipe/recipe_icon_rice.svg'},
    {id: 'side', label: '반찬', image: '/images/recipe/recipe_icon_side.svg'},
    {id: 'soup', label: '국', image: '/images/recipe/recipe_icon_soup.svg'},
    {id: 'one_dish', label: '일품', image: '/images/recipe/recipe_icon_one_dish.svg'},
    {id: 'dessert', label: '후식', image: '/images/recipe/recipe_icon_dessert.svg'},
    {id: 'etc', label: '기타', image: '/images/recipe/recipe_icon_all.svg'},
  ];
  const POSTS_PER_PAGE = 20;

  // 라우터
  const route = useRoute();
  const router = useRouter();

  // 검색 관련
  const page = ref<number>(1);
  const searchKeyword = ref<string>('');
  const searchCategory = ref<string>('');
  const searchIngredients = ref<string[]>([]);
  const isInit = ref(false);

  // api 관련
  const recipeList = ref<Recipe[]>();
  const totalCount = ref<number>(0);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const paginationLength = computed(() => Math.ceil(totalCount.value / POSTS_PER_PAGE));

  // 필터 초기화
  const resetFilter = () => {
    searchKeyword.value = '';
    searchCategory.value = '';
    searchIngredients.value = [];
    updateQuery();
  };

  // chip 닫으면 searchIngredients에 반영
  const removeIngredient = (itemToRemove: string) => {
    searchIngredients.value = searchIngredients.value.filter((item) => item !== itemToRemove);
    updateQuery();
  };

  // 페이지네이션
  const handlePageChange = (page: number) => {
    updateQuery();
    // 페이지 상단으로 이동
    window.scrollTo({top: 0, behavior: 'instant'});
  };

  // 쿼리 업데이트
  const updateQuery = () => {
    const currentQuery = {...route.query};

    // 페이지 변경 시, 기존 쿼리에 page 값만 업데이트
    if (page.value !== Number(route.query.page)) {
      router.push({query: {...currentQuery, page: page.value}});
    }
    // 검색 조건 변경 시, 모든 쿼리 업데이트 (페이지는 1로 초기화)
    else {
      router.push({
        query: {
          page: 1,
          keyword: searchKeyword.value,
          category: searchCategory.value,
          ingredients: searchIngredients.value.join(','),
        },
      });
    }
    window.scrollTo({top: 0, behavior: 'instant'});
  };

  // url query 변경 및 api 호출
  watch(
    () => JSON.stringify(route.query),
    async (newQuery, oldQuery) => {
      // 쿼리가 변경되었을 때만 실행
      if (JSON.stringify(newQuery) === JSON.stringify(oldQuery)) return;

      // 처음에 url query 설정 하기
      if (!isInit.value) {
        isInit.value = true;
        page.value = route.query.page ? Number(route.query.page) : 1;
        searchKeyword.value = route.query.keyword ? String(route.query.keyword) : '';
        searchCategory.value = route.query.category ? String(route.query.category) : '';
        searchIngredients.value = route.query.ingredients
          ? String(route.query.ingredients).split(',')
          : [];
        updateQuery();
      }

      // url 변경 시(뒤로가기)에 검색어 및 필터값 변경
      page.value = JSON.parse(newQuery).page ? Number(JSON.parse(newQuery).page) : 1;
      searchKeyword.value = JSON.parse(newQuery).keyword
        ? String(JSON.parse(newQuery).keyword)
        : '';
      searchCategory.value = JSON.parse(newQuery).category
        ? String(JSON.parse(newQuery).category)
        : '';
      searchIngredients.value = JSON.parse(newQuery).ingredients
        ? String(JSON.parse(newQuery).ingredients).split(',')
        : [];

      // api 호출
      try {
        isLoading.value = true;
        const data = await fetchRecipeList({
          page: page.value,
          RCP_NM: searchKeyword.value,
          RCP_PAT2: searchCategory.value,
          RCP_PARTS_DTLS: searchIngredients.value,
        });
        recipeList.value = data.COOKRCP01.row;
        totalCount.value = Number(data.COOKRCP01.total_count);
      } catch (err) {
        error.value = '데이터를 불러오는 중 오류가 발생했습니다.';
      } finally {
        isLoading.value = false;
      }
    },
    // 즉시 실행된 후, 쿼리가 변경될 때마다 다시 실행
    {immediate: true},
  );
</script>

<template>
  <!-- 배너 -->
  <BannerComponent
    background="/images/recipe/recipe_search_banner.webp"
    title="레시피 검색"
    subtitle="간편하게 따라하는 오늘의 한끼"
    :breadcrumbs="[
      {title: '홈', href: '/'},
      {title: '레시피', href: '/recipe'},
      {title: '레시피 검색'},
    ]"
  />

  <!-- 데이터 개수 -->
  <div class="container w-full pt-[60px] text-[20px] text-mono-600 font-medium text-right">
    전체 : {{ totalCount }}개 레시피
  </div>

  <div class="container flex justify-between pt-[28px] pb-[100px]">
    <!-- 검색 필터 -->
    <div
      class="flex flex-col w-[400px] p-[32px] border-2 border-mono-200 rounded-[12px] justify-center self-start sticky top-28"
    >
      <!-- 초기화 버튼 -->
      <div class="flex justify-end">
        <button @click="resetFilter">
          <div class="flex gap-1 items-center">
            <div class="text-[18px] text-mono-400">초기화</div>
            <v-icon size="20px" color="#79716b">mdi-restart</v-icon>
          </div>
        </button>
      </div>
      <!-- 레시피별 검색 섹션 -->
      <div class="flex flex-col gap-5">
        <div class="text-[28px] font-semibold text-mono-900">레시피별 검색</div>
        <SearchBarRounded v-model="searchKeyword" @update:modelValue="updateQuery" />
        <!-- 필터 버튼 -->
        <div class="grid grid-cols-3 gap-5 p-[12px] place-items-center">
          <template v-for="item in categoryList" :key="item.id">
            <CategoryFilterButton
              :id="item.id"
              :image="item.image"
              :label="item.label"
              v-model="searchCategory"
              @update:modelValue="updateQuery"
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
        <SearchBarRounded v-model="searchIngredients" @update:modelValue="updateQuery" />
        <div class="flex flex-wrap gap-3 pt-[20px]">
          <template v-for="item in searchIngredients" :key="item">
            <v-chip close-icon="mdi-close" closable @click:close="removeIngredient(item)">{{
              item
            }}</v-chip>
          </template>
        </div>
      </div>
    </div>
    <!-- 리스트 -->
    <div>
      <div class="grid grid-cols-2 gap-x-[48px] gap-y-[28px] pb-[100px]">
        <template v-for="(item, index) in recipeList" :key="index">
          <v-skeleton-loader
            v-if="isLoading"
            type="image, list-item"
            class="skeleton"
            height="344"
            width="516"
            :rounded="10"
          />
          <RecipeRectangleCard
            v-else
            :title="item.RCP_NM"
            :image="item.ATT_FILE_NO_MAIN"
            @click="() => router.push({name: 'recipe-detail', params: {id: item.RCP_NM}})"
          />
        </template>
      </div>
      <v-pagination
        v-model="page"
        :length="paginationLength"
        :total-visible="7"
        active-color="#f89a00"
        @update:modelValue="handlePageChange"
      ></v-pagination>
    </div>
  </div>
</template>

<style scoped>
  :deep(.v-divider) {
    background-color: var(--color-mono-200);
    opacity: 1;
  }
  :deep(.v-chip) {
    color: var(--color-mono-050);
    background: var(--color-main-400);
    font-weight: 600;
    padding-left: 14px;
    padding-right: 14px;
  }
  :deep(.v-skeleton-loader__image) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }
  :deep(.v-skeleton-loader__text) {
    margin-top: 10px;
    height: 28px;
    border-radius: 100px;
  }
  :deep(.v-skeleton-loader) {
    margin-bottom: 56px;
  }
</style>
