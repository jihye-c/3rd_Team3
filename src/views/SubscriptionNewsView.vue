<script setup lang="ts">
  import BannerComponent from '@/components/BannerComponent.vue';
  import CommunityLinkBanner from '@/components/Subscription/CommunityLinkBanner.vue';
  import SubscriptionCard from '@/components/Subscription/NewsCardComponent.vue';
  import {ref} from 'vue';

  interface Props {
    long?: boolean;
  }
  const props = defineProps<Props>();

  // 이벤트 정의
  const emit = defineEmits(['search']);

  // 검색어와 검색 타입
  const searchText = ref<string>('');
  const searchType = ref<string>('title'); // 기본 값은 'title'로 설정

  // 정렬 상태
  const sortType = ref<string>('최신순'); // 기본 값은 '최신순'로 설정

  const handleClick = () => {
    emit('search', {text: searchText.value, type: searchType.value});
  };

  const setSortType = (type: string) => {
    sortType.value = type;
  };

  interface SubscriptionCardData {
    imageURL: string;
    title: string;
    date: string;
  }

  const cards = ref<SubscriptionCardData[]>([
    {
      imageURL:
        'https://www.i-sh.co.kr/main/upload/bbs/KS070702/20241231011825178_979eaf8298e446fa93b9dd312c70d80d.jpg',
      title: '2024년 공공임대주택 및 토지 등 자산공개',
      date: '2024년 02월 20일',
    },
    {
      imageURL:
        'https://www.i-sh.co.kr/main/upload/bbs/KS070702/20241218102520326_8402fff2063b460c88a5915459b73bb9.jpg',
      title: '주거안심종합센터, 원스톱 주거복지서비스',
      date: '2024년 02월 20일',
    },
    {
      imageURL:
        'https://www.i-sh.co.kr/main/upload/bbs/KS070702/20241029011156405_6d3d0afba27b4791b0e0534a455aa776.jpg',
      title: '서울주택도시공사 장기전세주택 운영 성과 분석, 장기전세 확대해야',
      date: '2024년 02월 20일',
    },
    {
      imageURL:
        'https://www.i-sh.co.kr/main/upload/bbs/KS070702/20241025031052149_9ab1cfac61cc4614a7b4bf2b56e292da.jpg',
      title: '서울주택도시공사, 세곡2 공공임대 주택 자산 가치 증가로 개발이익 대폭 증가',
      date: '2024년 02월 20일',
    },
    {
      imageURL:
        'https://www.i-sh.co.kr/main/upload/bbs/KS070702/20241231011825178_979eaf8298e446fa93b9dd312c70d80d.jpg',
      title: '2024년 공공임대주택 및 토지 등 자산공개',
      date: '2024년 02월 20일',
    },
    {
      imageURL:
        'https://www.i-sh.co.kr/main/upload/bbs/KS070702/20241218102520326_8402fff2063b460c88a5915459b73bb9.jpg',
      title: '주거안심종합센터, 원스톱 주거복지서비스',
      date: '2024년 02월 20일',
    },
    {
      imageURL:
        'https://www.i-sh.co.kr/main/upload/bbs/KS070702/20241029011156405_6d3d0afba27b4791b0e0534a455aa776.jpg',
      title: '서울주택도시공사 장기전세주택 운영 성과 분석, 장기전세 확대해야',
      date: '2024년 02월 20일',
    },
    {
      imageURL:
        'https://www.i-sh.co.kr/main/upload/bbs/KS070702/20241025031052149_9ab1cfac61cc4614a7b4bf2b56e292da.jpg',
      title: '서울주택도시공사, 세곡2 공공임대 주택 자산 가치 증가로 개발이익 대폭 증가',
      date: '2024년 02월 20일',
    },
    {
      imageURL:
        'https://www.i-sh.co.kr/main/upload/bbs/KS070702/20241231011825178_979eaf8298e446fa93b9dd312c70d80d.jpg',
      title: '2024년 공공임대주택 및 토지 등 자산공개',
      date: '2024년 02월 20일',
    },
    {
      imageURL:
        'https://www.i-sh.co.kr/main/upload/bbs/KS070702/20241218102520326_8402fff2063b460c88a5915459b73bb9.jpg',
      title: '주거안심종합센터, 원스톱 주거복지서비스',
      date: '2024년 02월 20일',
    },
    {
      imageURL:
        'https://www.i-sh.co.kr/main/upload/bbs/KS070702/20241029011156405_6d3d0afba27b4791b0e0534a455aa776.jpg',
      title: '서울주택도시공사 장기전세주택 운영 성과 분석, 장기전세 확대해야',
      date: '2024년 02월 20일',
    },
    {
      imageURL:
        'https://www.i-sh.co.kr/main/upload/bbs/KS070702/20241025031052149_9ab1cfac61cc4614a7b4bf2b56e292da.jpg',
      title: '서울주택도시공사, 세곡2 공공임대 주택 자산 가치 증가로 개발이익 대폭 증가',
      date: '2024년 02월 20일',
    },
  ]);
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
          <option value="content">내용</option>
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
        <button @click="handleClick" class="ml-auto mr-2">
          <v-icon :size="props.long ? '40px' : '24px'">mdi-magnify</v-icon>
        </button>
      </div>
    </div>
  </section>

  <section class="mb-20">
    <div class="container grid grid-cols-4 gap-6">
      <SubscriptionCard v-for="card in cards" :key="card.title" :card="card" />
    </div>
    <v-pagination class="mt-19" length="4"></v-pagination>
  </section>
</template>

<style scoped>
  :deep(.v-icon) {
    color: #79716b;
  }
</style>
