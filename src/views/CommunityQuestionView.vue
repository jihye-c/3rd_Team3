<script setup lang="ts">
  import BannerComponent from '@/components/BannerComponent.vue';
  import CommunityPostList from '@/components/community/CommunityPostList.vue';
  import OrderRadioButton from '@/components/community/OrderRadioButton.vue';
  import SearchBar from '@/components/community/SearchBar.vue';
  import {ref} from 'vue';

  // 더미 데이터
  const postList = [
    {
      image: '/recipe/recipe_popular2.webp',
      title: '자취생이 가볍게 즐길 수 있는 문화생활 뭐가 있을까요?',
      content:
        '자취를 시작하고 나서 주말마다 너무 심심해요. 친구들이랑 시간을 보내기도 어렵고, 혼자서 뭔가 하려니 마땅한 게 없네요. 혼자서도 부담 없이 즐길 수 있는 문화생활이 뭐가 있을까요? 근처에서 열리는 전시회나 소극장 공연, 영화관 외에도 특별한 활동이 있으면 추천 부탁드려요.',
      dong: '신림동',
      tags: ['문화생활', '취미'],
      bookmarks: 5,
      comments: 4,
    },
    {
      image: '/recipe/recipe_popular3.webp',
      title: '자취생이 가볍게 즐길 수 있는 문화생활 뭐가 있을까요?',
      content:
        '자취를 시작하고 나서 주말마다 너무 심심해요. 친구들이랑 시간을 보내기도 어렵고, 혼자서 뭔가 하려니 마땅한 게 없네요. 혼자서도 부담 없이 즐길 수 있는 문화생활이 뭐가 있을까요? 근처에서 열리는 전시회나 소극장 공연, 영화관 외에도 특별한 활동이 있으면 추천 부탁드려요.',
      dong: '신림동',
      tags: ['문화생활', '취미', '여가'],
      bookmarks: 5,
      comments: 4,
    },
    {
      title: '자취생이 가볍게 즐길 수 있는 문화생활 뭐가 있을까요?',
      content:
        '자취를 시작하고 나서 주말마다 너무 심심해요. 친구들이랑 시간을 보내기도 어렵고, 혼자서 뭔가 하려니 마땅한 게 없네요. 혼자서도 부담 없이 즐길 수 있는 문화생활이 뭐가 있을까요? 근처에서 열리는 전시회나 소극장 공연, 영화관 외에도 특별한 활동이 있으면 추천 부탁드려요.',
      dong: '신림동',
      tags: ['문화생활', '취미', '여가'],
      bookmarks: 5,
      comments: 4,
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
      title="질문 게시판"
      subtitle="자취의 모든 궁금증, 여기서 함께 나눠요."
      :breadcrumbs="[{title: '홈', href: '/'}, {title: '커뮤니티'}, {title: '질문 게시판'}]"
      ><img
        src="/images/community/community_question_illustration.svg"
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
      <div class="flex flex-col gap-[28px] pt-[28px] pb-[100px] leading-[32px]">
        <template v-for="item in postList">
          <CommunityPostList
            :title="item.title"
            :content="item.content"
            :dong="item.dong"
            :tags="item.tags"
            :bookmarks="item.bookmarks"
            :comments="item.comments"
            :image="item.image"
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
</style>
