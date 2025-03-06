<script setup lang="ts">
  import {ref, onMounted, computed, watch} from 'vue';
  import axios from 'axios';
  import BannerComponent from '@/components/BannerComponent.vue';
  import CommunityLinkBanner from '@/components/Subscription/CommunityLinkBanner.vue';
  import SubscriptionCard from '@/components/Subscription/NewsCardComponent.vue';

  interface Props {
    long?: boolean;
  }
  const props = defineProps<Props>();

  const emit = defineEmits(['search']);

  const searchText = ref<string>('');
  const searchType = ref<string>('title'); // 기본 값은 'title'
  const sortType = ref<string>('최신순'); // 기본 값은 '최신순'

  const cards = ref<SubscriptionCardData[]>([]);

  interface SubscriptionCardData {
    imageURL: string;
    title: string;
    date: string;
    id: string;
  }

  // ✅ API에서 카드 뉴스 데이터 가져오기
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
          };
        }
      });
    } catch (error) {
      console.error('API 요청 실패:', error);
    }
  };

  // ✅ 컴포넌트가 마운트되면 API 호출
  onMounted(fetchNews);

  // 검색된 카드 뉴스 필터링
  const filteredCards = computed(() => {
    return cards.value.filter((card) => {
      const searchTerm = searchText.value.trim().toLowerCase();
      if (searchType.value === 'title') {
        return card.title.toLowerCase().includes(searchTerm);
      }
      return false;
    });
  });

  // 페이지네이션 처리
  const currentPage = ref<number>(1);
  const itemsPerPage = 8;

  // 현재 페이지에 해당하는 카드들만 반환
  const paginatedCards = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    return filteredCards.value.slice(startIndex, startIndex + itemsPerPage);
  });

  // 전체 페이지 수 계산
  const totalPages = computed(() => {
    return Math.ceil(filteredCards.value.length / itemsPerPage);
  });

  // 페이지가 변경될 때 로그 추가
  watch(currentPage, (newPage, oldPage) => {
    console.log(`페이지가 ${oldPage}에서 ${newPage}로 변경되었습니다.`);
  });

  const handleClick = () => {
    emit('search', {text: searchText.value, type: searchType.value});
  };

  const setSortType = (type: string) => {
    sortType.value = type;
  };
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
      <div class="flex gap-7">
        <div
          :class="['text-xl', sortType === '최신순' ? 'font-semibold' : '']"
          @click="setSortType('최신순')"
        >
          최신순
        </div>
        <div
          :class="['text-xl', sortType === '스크랩순' ? 'font-semibold' : '']"
          @click="setSortType('스크랩순')"
        >
          스크랩순
        </div>
        <div
          :class="['text-xl', sortType === '좋아요순' ? 'font-semibold' : '']"
          @click="setSortType('좋아요순')"
        >
          좋아요순
        </div>
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
