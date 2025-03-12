<script setup lang="ts">
  import BannerComponent from '@/components/BannerComponent.vue';
  import CommunityPostList from '@/components/community/CommunityPostList.vue';
  import OrderRadioButton from '@/components/community/OrderRadioButton.vue';
  import SearchBar from '@/components/community/SearchBar.vue';
  import {QUESTION_CHANNEL_ID} from '@/constants/channelId';
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
  const dongList = computed(() => districtData[selectedGu.value as DistrictKeys]);
  const selectedDong = ref<string | null>(null);
  watch(selectedGu, () => {
    selectedDong.value = null;
  });
  const selectedTag = ref<string | null>(null);

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

      // 태그 필터링
      const matchesTag = selectedTag.value ? parsedData.tags.includes(selectedTag.value) : true;

      // 검색어 필터링
      const matchesText = searchKeyword.value
        ? selectedSearchCriteria.value === '제목'
          ? parsedData.title.includes(searchKeyword.value)
          : parsedData.content.includes(searchKeyword.value)
        : true;

      return matchesGu && matchesDong && matchesTag && matchesText;
    });
    // 정렬
    return filteredData.sort((a, b) => {
      if (selectedOrder.value === 'popular') {
        return b.comments.length - a.comments.length; // 'comments'가 많은 순으로 정렬
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
        name: 'community-question',
        query: {
          gu: selectedGu.value,
          dong: selectedDong.value,
          keyword: searchKeyword.value,
          order: selectedOrder.value,
        },
      });
    } else {
      router.push({
        name: 'community-question',
        query: {
          gu: selectedGu.value,
          dong: selectedDong.value,
          keyword: searchKeyword.value,
          order: selectedOrder.value,
        },
      });
    }
  };

  onMounted(async () => {
    try {
      if (init.value) {
        isLoading.value = true;
        const response = await programmersApiInstance.get<Post[]>(
          `/posts/channel/${QUESTION_CHANNEL_ID}`,
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
          <v-select
            v-model="selectedTag"
            label="태그 선택"
            :items="['병원', '청약', '레시피', '문화생활', '자취꿀팁']"
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
          :width="900"
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
        <template v-if="paginatedPostList.length" v-for="item in paginatedPostList">
          <CommunityPostList
            :title="JSON.parse(item.title).title"
            :content="JSON.parse(item.title).content"
            :dong="JSON.parse(item.title).region.dong"
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
</style>
