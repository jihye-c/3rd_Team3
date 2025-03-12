<script setup lang="ts">
  import BannerComponent from '@/components/BannerComponent.vue';
  import OrderRadioButton from '@/components/community/OrderRadioButton.vue';
  import ResaleCard from '@/components/community/ResaleCard.vue';
  import SearchBar from '@/components/community/SearchBar.vue';
  import {RESALE_CHANNEL_ID} from '@/constants/channelId';
  import {useAuthStore} from '@/stores/auth';
  import type {Post} from '@/types/PostResponse';
  import {programmersApiInstance} from '@/utils/axiosInstance';
  import {computed, onMounted, ref, watch} from 'vue';
  import {useRouter} from 'vue-router';
  import districtData from '@/assets/data/district.json';
  import {useUserStore} from '@/stores/userStore';
  import PaginationComponent from '@/components/PaginationComponent.vue';

  type DistrictKeys = keyof typeof districtData;

  const router = useRouter();
  const authStore = useAuthStore();
  const UserStore = useUserStore();
  const {userLocation} = UserStore;

  // 지역 필터
  const guList = Object.keys(districtData);
  const selectedGu = ref<string>(userLocation?.address || '강남구');
  console.log();
  const dongList = computed(() => districtData[selectedGu.value as DistrictKeys]);
  const selectedDong = ref<string | null>(null);
  watch(selectedGu, () => {
    selectedDong.value = null;
  });

  // 검색 기준
  const selectedSearchCriteria = ref('제목');
  // 검색어
  const searchKeyword = ref('');
  // 정렬기준
  const selectedOrder = ref('recent');

  const postList = ref<Post[]>([]);
  const isLoading = ref<boolean>(false);
  const init = ref<boolean>(true);

  const currentPage = ref(1);
  const itemsPerPage = 12;

  const filteredPostList = computed(() => {
    const filteredData = postList.value.filter((data: Post) => {
      const parsedData = JSON.parse(data.title);
      // 구 필터링
      const matchesGu = selectedGu.value ? parsedData.region.gu === selectedGu.value : true;

      // 동 필터링
      const matchesDong = selectedDong.value ? parsedData.region.dong === selectedDong.value : true;

      // 검색어 필터링
      const matchesText = searchKeyword.value
        ? selectedSearchCriteria.value === '제목'
          ? parsedData.title.includes(searchKeyword.value)
          : parsedData.content.includes(searchKeyword.value)
        : true;

      return matchesGu && matchesDong && matchesText;
    });
    // 정렬
    return filteredData.sort((a, b) => {
      if (selectedOrder.value === 'popular') {
        return b.likes.length - a.likes.length; // 'likes'가 많은 순으로 정렬
      } else if (selectedOrder.value === 'available') {
        return (JSON.parse(b.title).available ? 1 : 0) - (JSON.parse(a.title).available ? 1 : 0); // 판매가능 순으로 정렬
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // 최신순 정렬
      }
    });
  });

  const paginatedPostList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredPostList.value.slice(start, start + itemsPerPage);
  });

  const totalPages = computed(() => Math.ceil(filteredPostList.value.length / itemsPerPage));
  const handlePageChange = (page: number) => {
    currentPage.value = page;
  };

  const updateQuery = () => {
    if (init.value) {
      router.replace({
        name: 'community-resale',
        query: {
          gu: selectedGu.value,
          dong: selectedDong.value,
          keyword: searchKeyword.value,
          order: selectedOrder.value,
          page: currentPage.value,
        },
      });
    } else {
      router.push({
        name: 'community-resale',
        query: {
          gu: selectedGu.value,
          dong: selectedDong.value,
          keyword: searchKeyword.value,
          order: selectedOrder.value,
          page: currentPage.value,
        },
      });
    }
  };

  onMounted(async () => {
    try {
      if (init.value) {
        isLoading.value = true;
        const response = await programmersApiInstance.get<Post[]>(
          `/posts/channel/${RESALE_CHANNEL_ID}`,
        );
        postList.value = response.data;
        updateQuery();
        init.value = false;
      }
    } catch (error) {
      console.error('질문 데이터를 불러오는 중 문제가 생겼습니다.', error);
    } finally {
      isLoading.value = false;
    }
  });
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
      <div class="flex justify-between items-center pb-[60px] gap-4">
        <div class="flex gap-6">
          <v-select
            v-model="selectedGu"
            :items="guList"
            label="구 선택"
            variant="outlined"
            width="134"
            rounded="lg"
            density="compact"
            @update:modelValue="updateQuery"
          />
          <v-select
            v-model="selectedDong"
            :items="dongList"
            label="동 선택"
            variant="outlined"
            width="134"
            rounded="lg"
            density="compact"
            @update:modelValue="updateQuery"
          />
        </div>
        <SearchBar
          v-model:searchCriteria="selectedSearchCriteria"
          v-model:searchQuery="searchKeyword"
          @search="updateQuery"
        />
      </div>

      <div class="flex justify-between items-center">
        <!-- 정렬 -->
        <div class="flex gap-7">
          <OrderRadioButton
            v-model="selectedOrder"
            value="recent"
            label="최신순"
            @update:modelValue="updateQuery"
          />
          <OrderRadioButton
            v-model="selectedOrder"
            value="popular"
            label="인기순"
            @update:modelValue="updateQuery"
          />
          <OrderRadioButton
            v-model="selectedOrder"
            value="available"
            label="판매완료 제외"
            @update:modelValue="updateQuery"
          />
        </div>
        <!-- 글작성 버튼 -->
        <v-btn
          v-if="authStore.isAuthenticated"
          variant="flat"
          class="write"
          @click="() => router.push('/community/create/resale')"
          >글작성</v-btn
        >
      </div>

      <!-- 리스트 -->
      <div class="grid grid-cols-4 gap-x-[24px] gap-y-[32px] pt-[28px] pb-[100px]">
        <template v-if="paginatedPostList.length" v-for="item in paginatedPostList">
          <ResaleCard
            :image="item.image"
            :title="JSON.parse(item.title).title"
            :price="JSON.parse(item.title).price"
            :dong="JSON.parse(item.title).region.dong"
            :available="JSON.parse(item.title).available"
            @click="
              router.push({
                name: 'used-post-detail',
                params: {id: item._id},
              })
            "
          />
        </template>
      </div>

      <!-- 페이지네이션 -->
      <PaginationComponent :totalPages="totalPages" :currentPage="currentPage" @pageChange="handlePageChange" />
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
  /* :deep(.v-label) {
    font-size: 18px;
  } */
  /* 선택된 값 표시 글자 크기 */
  /* :deep(.v-field__input) {
    font-size: 18px;
  } */
</style>
