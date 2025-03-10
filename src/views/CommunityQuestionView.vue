<script setup lang="ts">
  import BannerComponent from '@/components/BannerComponent.vue';
  import CommunityPostList from '@/components/community/CommunityPostList.vue';
  import OrderRadioButton from '@/components/community/OrderRadioButton.vue';
  import SearchBar from '@/components/community/SearchBar.vue';
  import {QUESTION_CHANNEL_ID} from '@/constants/channelId';
  import {useAuthStore} from '@/stores/auth';
  import type {Post} from '@/types/PostResponse';
  import {programmersApiInstance} from '@/utils/axiosInstance';
  import {ref, watch} from 'vue';
  import {useRoute, useRouter} from 'vue-router';

  const route = useRoute();
  const router = useRouter();
  const authStore = useAuthStore();

  // 검색 기준
  const selectedSearchCriteria = ref('제목');
  // 검색어
  const searchQuery = ref('');
  // 정렬기준
  const selectedOrder = ref('recent');

  const postList = ref<Post[]>([]);
  const isLoading = ref<boolean>(false);

  watch(
    () => JSON.stringify(route.query),
    async (newQuery, oldQuery) => {
      try {
        isLoading.value = true;
        const response = await programmersApiInstance.get<Post[]>(
          `/posts/channel/${QUESTION_CHANNEL_ID}`,
        );
        postList.value = response.data;
        console.log(JSON.parse(response.data[0].title).title);
      } catch (error) {
        console.error('질문 데이터를 불러오는 중 문제가 생겼습니다.', error);
      } finally {
        isLoading.value = false;
      }
    },
    {immediate: true},
  );
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
        <v-btn
          v-if="authStore.isAuthenticated"
          variant="flat"
          class="write"
          @click="() => router.push('/community/create/question')"
          >글작성</v-btn
        >
      </div>

      <!-- 리스트 -->
      <div class="flex flex-col gap-[28px] pt-[28px] pb-[100px] leading-[32px]">
        <template v-if="!isLoading" v-for="item in postList">
          <CommunityPostList
            :title="JSON.parse(item.title).title"
            :content="JSON.parse(item.title).content"
            :dong="JSON.parse(item.title).region"
            :tags="JSON.parse(item.title).tags"
            :bookmarks="item.likes.length"
            :comments="item.comments.length"
            :image="item.image"
            @click="
              router.push({
                name: 'community-post-detail',
                params: {type: 'question', id: item._id},
              })
            "
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
