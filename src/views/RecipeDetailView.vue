<script setup lang="ts">
  import BannerComponent from '@/components/BannerComponent.vue';
  import BookmarkButton from '@/components/BookmarkButton.vue';
  import DoughnutChart from '@/components/recipe/DoughnutChart.vue';
  import ShareButton from '@/components/ShareButton.vue';
  import {onMounted, watch, ref} from 'vue';
  import {useRoute} from 'vue-router';
  import {fetchRecipe} from '@/apis/recipeApi';
  import type {Recipe} from '@/types/RecipeResponse';
  import {fetchYoutube} from '@/apis/youtubeApi';

  interface Nutrition {
    calories: number;
    sodium: number;
    carbohydrates: number;
    protein: number;
    fat: number;
  }

  const route = useRoute();
  const paramId = ref(route.params.id);
  const recipeData = ref<Recipe | null>(null);
  const nutrition = ref<Nutrition>({
    calories: 0,
    sodium: 0,
    carbohydrates: 0,
    protein: 0,
    fat: 0,
  });
  const manuals = ref<string[]>([]);
  const videoId = ref<string[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // 북마크 상태 관리
  const isBookmarked = ref(false);

  const toggleBookmark = () => {
    isBookmarked.value = !isBookmarked.value;
  };

  onMounted(async () => {
    // api 호출
    try {
      isLoading.value = true;
      // 레시피 데이터 불러오기
      const data = await fetchRecipe(String(paramId.value));
      recipeData.value = data;
      // 유튜브 데이터 불러오기
      const keyword = String(paramId.value).replace(/\s/g, '')!;
      const youtubeResponse = await fetchYoutube(keyword);
      videoId.value = youtubeResponse.items.map((item) => item.id.videoId);
    } catch (err) {
      error.value = '데이터를 불러오는 중 오류가 발생했습니다.';
    } finally {
      isLoading.value = false;
    }
  });

  watch(recipeData, (newData) => {
    if (newData) {
      // 영양 정보 데이터 가공
      nutrition.value = {
        calories: parseFloat(newData.INFO_ENG || '0'),
        sodium: parseFloat(newData.INFO_NA || '0'),
        carbohydrates: parseFloat(newData.INFO_CAR || '0'),
        protein: parseFloat(newData.INFO_PRO || '0'),
        fat: parseFloat(newData.INFO_FAT || '0'),
      };

      // manuals도 함께 계산
      manuals.value = Object.entries(newData)
        .filter(
          ([key, value]) =>
            key.startsWith('MANUAL') && !key.startsWith('MANUAL_IMG') && value.trim() !== '',
        )
        .map(([_, value]) => value)
        .sort((a, b) => Number(a[0].split('.')[0]) - Number(b[0].split('.')[0]));
    }
  });
</script>

<template>
  <div class="flex flex-col gap-[100px] pb-[100px]">
    <!-- 배너 -->
    <BannerComponent
      background="/images/recipe/recipe_search_banner.webp"
      title="레시피 상세"
      subtitle="간편하게 따라하는 오늘의 한끼"
      :breadcrumbs="[
        {title: '홈', href: '/'},
        {title: '레시피', href: '/recipe'},
        {title: '레시피 검색', href: '/recipe/search'},
        {title: '레시피 상세'},
      ]"
    />
    <div class="container flex justify-between">
      <div class="border-mono-200 w-[52px] h-[104px] flex flex-col gap-[12px]">
        <!-- 스크랩, 공유 버튼 -->
        <BookmarkButton :is-bookmarked="isBookmarked" @toggle="toggleBookmark" />
        <ShareButton />
      </div>
      <div v-if="recipeData" class="flex flex-col gap-[80px] border-mono-200 w-[1330px]">
        <!-- 상세 내용 -->
        <div class="h-[580px] flex gap-[48px] rounded-[20px] shadow-lg overflow-hidden">
          <div class="w-[677px] overflow-hidden shrink-0">
            <img
              :src="recipeData?.ATT_FILE_NO_MAIN"
              alt="recipe_image"
              class="w-full h-full object-cover object-center"
            />
          </div>
          <div class="flex flex-col gap-[48px] p-[48px]">
            <div class="flex flex-col gap-4">
              <div class="text-[40px] text-main-400 font-semibold">
                {{ recipeData?.RCP_NM }}
              </div>
              <div class="text-[18px] text-mono-600">
                {{ recipeData?.RCP_PAT2 }} | {{ recipeData?.RCP_WAY2 }}
                {{ recipeData.HASH_TAG ? ` | #${recipeData?.HASH_TAG}` : '' }}
              </div>
            </div>
            <div class="flex flex-col gap-4">
              <div class="text-[28px] text-main-700 font-bold">재료</div>
              <div class="text-[18px] text-mono-600">
                {{ recipeData?.RCP_PARTS_DTLS }}
              </div>
            </div>
          </div>
        </div>
        <!-- 영양정보 -->
        <div class="flex flex-col gap-2">
          <div class="text-[40px] text-mono-700 font-semibold">영양 정보</div>
          <p class="text-[20px] leading-[24px] text-mono-400">
            1일 영양성분 기준치에 대한 비율 (%)
          </p>
          <div class="">
            <div class="flex justify-between mt-[40px]">
              <template v-for="(value, key) in nutrition">
                <div class="w-[210px] h-[210px]">
                  <DoughnutChart :nutrition-info="key" :input-data="value" />
                </div>
              </template>
            </div>
          </div>
        </div>
        <!-- 요리 방법 -->
        <div class="flex flex-col gap-2">
          <div class="text-[40px] text-mono-700 font-semibold">요리 방법</div>
          <div class="flex flex-col">
            <template v-for="(manual, index) in manuals" :key="index">
              <div class="flex gap-[32px] items-center py-[24px]">
                <div
                  class="w-[52px] h-[52px] rounded-[8px] bg-main-400 text-[32px] text-mono-050 font-bold text-center py-2 leading-9 shrink-0"
                >
                  {{ index + 1 }}
                </div>
                <div class="text-[24px] text-mono-700">
                  {{ manual.slice(3) }}
                </div>
              </div>
              <hr v-if="index + 1 < manuals.length" />
            </template>
          </div>
        </div>
        <!-- 연관 레시피 -->
        <div class="flex flex-col gap-2">
          <div class="text-[40px] text-mono-700 font-semibold">연관 레시피</div>
          <div class="flex gap-[24px]">
            <div class="bg-mono-200 h-[360px] w-full rounded-2xl overflow-hidden">
              <iframe :src="`https://www.youtube.com/embed/${videoId[0]}`" class="w-full h-full" />
            </div>
            <div class="bg-mono-200 h-[360px] w-full rounded-2xl overflow-hidden">
              <iframe :src="`https://www.youtube.com/embed/${videoId[1]}`" class="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
