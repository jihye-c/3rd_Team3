<script setup lang="ts">
  import BannerComponent from '@/components/BannerComponent.vue';
  import OrderRadioButton from '@/components/community/OrderRadioButton.vue';
  import ResaleCard from '@/components/community/ResaleCard.vue';
  import SearchBar from '@/components/community/SearchBar.vue';
  import {RESALE_CHANNEL_ID} from '@/constants/channelId';
  import type {Post} from '@/types/PostResponse';
  import {programmersApiInstance} from '@/utils/axiosInstance';
  import {ref, watch} from 'vue';
  import {useRoute, useRouter} from 'vue-router';

  // 더미 데이터
  // const postList = [
  //   {
  //     image: '/images/community/community_resale_dummy.jpg',
  //     title: '상태 좋은 의자 판매합니다.',
  //     price: '50000',
  //     dong: '수유1동',
  //     available: true,
  //   },
  //   {
  //     image: '/images/community/community_resale_dummy.jpg',
  //     title: '상태 좋은 의자 판매합니다.',
  //     price: '50000',
  //     dong: '수유1동',
  //     available: true,
  //   },
  //   {
  //     image: '/images/community/community_resale_dummy.jpg',
  //     title: '상태 좋은 의자 판매합니다.',
  //     price: '50000',
  //     dong: '수유1동',
  //     available: false,
  //   },
  //   {
  //     image: '/images/community/community_resale_dummy.jpg',
  //     title: '상태 좋은 의자 판매합니다.',
  //     price: '50000',
  //     dong: '수유1동',
  //     available: true,
  //   },
  //   {
  //     image: '/images/community/community_resale_dummy.jpg',
  //     title: '상태 좋은 의자 판매합니다.',
  //     price: '50000',
  //     dong: '수유1동',
  //     available: true,
  //   },
  //   {
  //     image: '/images/community/community_resale_dummy.jpg',
  //     title: '상태 좋은 의자 판매합니다.',
  //     price: '50000',
  //     dong: '수유1동',
  //     available: true,
  //   },
  // ];

  const route = useRoute();
  const router = useRouter();

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
          `/posts/channel/${RESALE_CHANNEL_ID}`,
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
      title="중고거래"
      subtitle="우리 동네 사람들과 믿을 수 있는 중고거래를 시작하세요"
      :breadcrumbs="[{title: '홈', href: '/'}, {title: '커뮤니티'}, {title: '중고거래'}]"
      ><img
        src="/images/community/community_resale_illustration.svg"
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
        </div>
        <SearchBar
          v-model:searchCriteria="selectedSearchCriteria"
          v-model:searchQuery="searchQuery"
          @search=""
        />
      </div>

      <div class="flex justify-between items-center">
        <!-- 정렬 -->
        <div class="flex gap-7">
          <OrderRadioButton v-model="selectedOrder" value="recent" label="최신순" />
          <OrderRadioButton v-model="selectedOrder" value="popular" label="인기순" />
          <OrderRadioButton v-model="selectedOrder" value="available" label="판매완료 제외" />
        </div>
        <!-- 글작성 버튼 -->
        <v-btn variant="flat" class="write" @click="() => router.push('/community/create/resale')"
          >글작성</v-btn
        >
      </div>

      <!-- 리스트 -->
      <div class="grid grid-cols-4 gap-x-[24px] gap-y-[32px] pt-[28px] pb-[100px]">
        <template v-for="item in postList">
          <ResaleCard
            :image="item.image"
            :title="JSON.parse(item.title).title"
            :price="JSON.parse(item.title).price"
            :dong="JSON.parse(item.title).region"
            :available="JSON.parse(item.title).available"
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
