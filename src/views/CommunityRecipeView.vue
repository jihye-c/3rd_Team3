<script setup lang="ts">
  import BannerComponent from '@/components/BannerComponent.vue';
  import OrderRadioButton from '@/components/community/OrderRadioButton.vue';
  import RecipeCard from '@/components/community/RecipeCard.vue';
  import SearchBar from '@/components/community/SearchBar.vue';
  import {ref} from 'vue';

  // 더미 데이터
  const postList = [
    {
      author: {
        profileImg: '/recipe/recipe_popular1.webp',
        name: '혼밥왕',
      },
      image: '/recipe/recipe_popular2.webp',
      title: '초간단 원팬 파스타',
      tag: '일품',
    },
    {
      author: {
        profileImg: '/recipe/recipe_popular1.webp',
        name: '혼밥왕',
      },
      image: '/recipe/recipe_popular2.webp',
      title: '초간단 원팬 파스타',
      tag: '일품',
    },
    {
      author: {
        profileImg: '/recipe/recipe_popular1.webp',
        name: '혼밥왕',
      },
      image: '/recipe/recipe_popular2.webp',
      title: '초간단 원팬 파스타',
      tag: '일품',
    },
    {
      author: {
        profileImg: '/recipe/recipe_popular1.webp',
        name: '혼밥왕',
      },
      image: '/recipe/recipe_popular2.webp',
      title: '초간단 원팬 파스타',
      tag: '일품',
    },
    {
      author: {
        profileImg: '/recipe/recipe_popular1.webp',
        name: '혼밥왕',
      },
      image: '/recipe/recipe_popular2.webp',
      title: '초간단 원팬 파스타',
      tag: '일품',
    },
    {
      author: {
        profileImg: '/recipe/recipe_popular1.webp',
        name: '혼밥왕',
      },
      image: '/recipe/recipe_popular2.webp',
      title: '초간단 원팬 파스타',
      tag: '일품',
    },
    {
      author: {
        profileImg: '/recipe/recipe_popular1.webp',
        name: '혼밥왕',
      },
      image: '/recipe/recipe_popular2.webp',
      title: '초간단 원팬 파스타',
      tag: '일품',
    },
    {
      author: {
        profileImg: '/recipe/recipe_popular1.webp',
        name: '혼밥왕',
      },
      image: '/recipe/recipe_popular2.webp',
      title: '초간단 원팬 파스타',
      tag: '일품',
    },
    {
      author: {
        profileImg: '/recipe/recipe_popular1.webp',
        name: '혼밥왕',
      },
      image: '/recipe/recipe_popular2.webp',
      title: '초간단 원팬 파스타',
      tag: '일품',
    },
  ];

  // 검색 기준
  const selectedSearchCriteria = ref('제목');
  // 검색어
  const searchQuery = ref('');
  // 정렬기준
  const selectedOrder = ref('recent');
</script>

<template>
  <div class="flex flex-col gap-[100px] pb-[100px]">
    <!-- 배너 -->
    <BannerComponent
      background="#f89a00"
      title="나만의 레시피"
      subtitle="이웃과 함께 나누는 나만의 레시피 이야기"
      :breadcrumbs="[{title: '홈', href: '/'}, {title: '커뮤니티'}, {title: '레시피'}]"
      ><img
        src="/images/community/community_recipe_illustration.svg"
        alt="illustration"
        class="h-full"
      />
    </BannerComponent>

    <div class="container">
      <!-- 검색 -->
      <div class="flex justify-between items-center pb-[60px]">
        <div class="flex gap-6">
          <v-select label="구 선택" variant="outlined" width="134" rounded="lg" density="compact" />
          <v-select label="동 선택" variant="outlined" width="134" rounded="lg" density="compact" />
          <v-select
            label="태그 선택"
            variant="outlined"
            width="134"
            rounded="lg"
            density="compact"
          />
        </div>
        <SearchBar
          v-model:searchCriteria="selectedSearchCriteria"
          v-model:searchQuery="searchQuery"
          @search=""
          :width="900"
        />
      </div>

      <div class="flex justify-between items-center">
        <!-- 정렬 -->
        <div class="flex gap-7">
          <OrderRadioButton v-model="selectedOrder" value="recent" label="최신순" />
          <OrderRadioButton v-model="selectedOrder" value="popular" label="인기순" />
        </div>
        <!-- 글작성 버튼 -->
        <v-btn variant="flat" class="write">글작성</v-btn>
      </div>

      <!-- 리스트 -->
      <div class="grid grid-cols-4 gap-x-[24px] gap-y-[32px] pt-[28px] pb-[100px]">
        <template v-for="item in postList">
          <RecipeCard
            :author="item.author"
            :image="item.image"
            :title="item.title"
            :tag="item.tag"
          />
        </template>
      </div>

      <!-- 페이지네이션 -->
      <v-pagination length="4"></v-pagination>
    </div>
  </div>
</template>

<style scoped>
  :deep(.write.v-btn) {
    background-color: var(--color-main-400);
    border-radius: 8px;
    font-size: 16px;
    padding-inline: 24px;
    padding-block: 10px;
    color: var(--color-mono-050);
    height: 40px;
  }
  :deep(.v-label) {
    font-size: 18px;
  }
  /* 선택된 값 표시 글자 크기 */
  /* :deep(.v-field__input) {
    font-size: 18px;
  } */
</style>
