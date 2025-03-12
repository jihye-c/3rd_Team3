<script setup lang="ts">
  import {ref, onMounted, computed} from 'vue';
  import axios from 'axios';
  import BannerComponent from '@/components/BannerComponent.vue';
  import CommunityLinkBanner from '@/components/Subscription/CommunityLinkBanner.vue';
  import SubscriptionCard from '@/components/Subscription/NewsCardComponent.vue';
  import OrderRadioButton from '@/components/community/OrderRadioButton.vue';
  import NoDataLottie from '@/components/NoDataLottie.vue';

  interface Props {
    long?: boolean;
  }
  const props = defineProps<Props>();

  const emit = defineEmits(['search']);

  const searchText = ref<string>('');
  const searchType = ref<string>('title'); // 기본 값은 'title'
  const selectedOrder = ref<string>('recent'); // 정렬 기준 (기본 값: 최신순)
  const currentPage = ref<number>(1); // 현재 페이지
  const itemsPerPage = 8; // 한 페이지당 아이템 수
  const cards = ref<SubscriptionCardData[]>([]); // 카드 데이터

  interface SubscriptionCardData {
    imageURL: string;
    title: string;
    date: string;
    id: string;
    likes: number;
    comments: number;
  }

  // API에서 카드 뉴스 데이터 가져오기
  const fetchNews = async () => {
    try {
      const response = await axios.get(
        'http://13.125.143.126:5003/posts/channel/67c343d6ff075444a9c231ab',
      );
      const posts = response.data;

      // 데이터를 변환하여 cards에 저장
      cards.value = posts.map((post: any) => {
        try {
          const parsedTitle = JSON.parse(post.title);
          return {
            id: post._id,
            imageURL: parsedTitle.thumbnail,
            title: parsedTitle.title,
            date: new Date(post.createdAt).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
            likes: post.likes || 0, // 좋아요 개수
            comments: post.comments?.length || 0, // 댓글 개수
          };
        } catch (error) {
          console.error('JSON 파싱 오류:', error);
          return {
            id: post._id,
            imageURL: '',
            title: '제목 없음',
            date: new Date(post.createdAt).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
            likes: 0, // 기본값
            comments: 0, // 기본값
          };
        }
      });
    } catch (error) {
      console.error('API 요청 실패:', error);
    }
  };

  // 정렬된 카드 리스트
  const sortedCards = computed(() => {
    if (selectedOrder.value === 'recent') {
      // 최신순: 기본 상태 그대로 반환
      return cards.value;
    } else if (selectedOrder.value === 'popular') {
      // 좋아요순 정렬
      return [...cards.value].sort((a, b) => b.likes - a.likes);
    } else if (selectedOrder.value === 'text') {
      // 댓글순 정렬
      return [...cards.value].sort((a, b) => b.comments - a.comments);
    }
    return cards.value; // 기본값
  });

  // 검색된 카드 리스트 필터링
  const filteredCards = computed(() => {
    const searchTerm = searchText.value.trim().toLowerCase();
    return sortedCards.value.filter((card) => {
      if (searchType.value === 'title') {
        return card.title.toLowerCase().includes(searchTerm);
      }
      return false;
    });
  });

  // 현재 페이지에 해당하는 카드들 반환
  const paginatedCards = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    return filteredCards.value.slice(startIndex, startIndex + itemsPerPage);
  });

  // 전체 페이지 수 계산
  const totalPages = computed(() => {
    return Math.ceil(filteredCards.value.length / itemsPerPage);
  });

  const handleClick = () => {
    emit('search', {text: searchText.value, type: searchType.value});
  };

  // 컴포넌트가 마운트되면 API 호출
  onMounted(fetchNews);
</script>

<template>
  <!-- 배너 -->
  <BannerComponent
    background="/images/subscription/newsBanner.png"
    title="청약 뉴스와 함께하는 집 마련 여정"
    subtitle="청약 준비부터 당첨까지, 완벽 가이드"
    :breadcrumbs="[
      {title: '홈', href: '/'},
      {title: '청약', href: '/subscription'},
      {title: '카드뉴스'},
    ]"
  />

  <CommunityLinkBanner />

  <section class="mb-10">
    <div class="container flex h-26 items-center justify-between">
      <!-- 정렬 -->
      <div class="flex gap-7">
        <OrderRadioButton v-model="selectedOrder" value="recent" label="최신순" />
        <OrderRadioButton v-model="selectedOrder" value="text" label="댓글순" />
        <OrderRadioButton v-model="selectedOrder" value="popular" label="좋아요순" />
      </div>

      <div
        class="w-296 h-11 px-1 py-[12px] rounded-[8px] border-1 border-mono-300 flex items-center"
      >
        <select v-model="searchType" class="text-lg px-5">
          <option value="title">제목</option>
        </select>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          v-model="searchText"
          @keyup.enter="handleClick"
          :class="
            props.long
              ? 'w-[850px] placeholder:text-[20px] text-[20px]'
              : 'w-[150px] placeholder:text-[18px] text-[18px]'
          "
          class="px-4 border-l-1 ml-4 w-full border-mono-300 outline-none text-mono-700"
        />
        <button @click="handleClick" class="ml-auto mr-2 cursor-pointer">
          <v-icon :size="props.long ? '40px' : '24px'">mdi-magnify</v-icon>
        </button>
      </div>
    </div>
  </section>

  <section class="mb-20">
    <div class="container grid grid-cols-4 gap-6">
      <div v-if="paginatedCards.length === 0" class="col-span-4 text-center text-gray-500 my-40">
        검색 결과가 없습니다.
      </div>
      <SubscriptionCard v-for="card in paginatedCards" :key="card.id" :card="card" />
    </div>

    <!-- v-pagination 컴포넌트 사용 -->
    <v-pagination v-model="currentPage" :length="totalPages" :total-visible="7" class="mt-6" />
  </section>
</template>

<style scoped>
  :deep(.v-icon) {
    color: #79716b;
  }
</style>
