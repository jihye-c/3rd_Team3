<script setup lang="ts">
  import CommunityLinkBanner from '@/components/Subscription/CommunityLinkBanner.vue';
  import MainBannerSection from '@/components/Subscription/MainBannerSection.vue';
  import SubscriptionCategoryCard from '@/components/Subscription/SubscriptionCategoryCard.vue';
  import TodaySubscriptionSection from '@/components/Subscription/TodaySubscriptionSection.vue';
  import NewsCardComponent from '@/components/Subscription/NewsCardComponent.vue';
  import HomeSubscriptionSection from '@/components/Home/HomeSubscriptionSection.vue';
  import HomeSection from '@/components/Home/common/HomeSection.vue';
  import SubscriptionMap from '@/components/Subscription/SubscriptionMap.vue';
  import MonthlySubscriptionSection from '@/components/Subscription/MonthlySubscriptionSection.vue';

  const SubscriptionCategoryData = [
    {
      category: 'APT',
      sort: '01',
      image: '/images/subscription/subscriptionCard01.png',
    },
    {
      category: '도시형 생활주택',
      sort: '0201',
      image: '/images/subscription/subscriptionCard02.png',
    },
    {
      category: '오피스텔',
      sort: '0202',
      image: '/images/subscription/subscriptionCard03.png',
    },
    {
      category: '생활형 숙박시설',
      sort: '0204',
      image: '/images/subscription/subscriptionCard04.png',
    },
    {
      category: '민간임대',
      sort: '0203',
      image: '/images/subscription/subscriptionCard05.png',
    },
    {
      category: '공공지원 민간임대',
      sort: '0303',
      image: '/images/subscription/subscriptionCard06.png',
    },
  ];

  const cards = [
    {
      id: '67c914d3822d1f733057817d',
      imageURL:
        'https://www.i-sh.co.kr/main/upload/bbs/KS070702/20241231011825178_979eaf8298e446fa93b9dd312c70d80d.jpg',
      title: '2024년 공공임대주택 및 토지 등 자산공개',
      date: '2024년 02월 20일',
    },
    {
      id: '67c9255c822d1f73305781b5',
      imageURL:
        'https://www.i-sh.co.kr/main/upload/bbs/KS070702/20241218102520326_8402fff2063b460c88a5915459b73bb9.jpg',
      title: '주거안심종합센터, 원스톱 주거복지서비스',
      date: '2024년 02월 20일',
    },
    {
      id: '67c93a83822d1f7330578285',
      imageURL:
        'https://www.i-sh.co.kr/main/upload/bbs/KS070702/20240726110238300_c59c5ac0c00e404eba79740af1345c59.jpg',
      title: '카드뉴스로 보는 주택분양제도, 선분양과 후분양',
      date: '2024년 02월 20일',
    },
    {
      id: '67c93b09822d1f73305782b7',
      imageURL:
        'https://www.i-sh.co.kr/main/upload/bbs/KS070702/20241025031052149_9ab1cfac61cc4614a7b4bf2b56e292da.jpg',
      title: '서울주택도시공사, 세곡2 공공임대 주택 자산 가치 증가로 개발이익 대폭 증가',
      date: '2024년 02월 20일',
    },
  ];
</script>

<template>
  <!-- 청약 메인배너 -->
  <MainBannerSection />

  <!-- 청약 카테고리 -->
  <section class="mt-13">
    <div class="container">
      <div class="ft-point text-7xl pt-10 pb-6">유형별 청약 정보 보기</div>
      <div class="flex gap-6">
        <SubscriptionCategoryCard
          v-for="item in SubscriptionCategoryData"
          :key="item.category"
          :card="item"
        />
      </div>
    </div>
  </section>

  <!-- 오늘의 청약 정보 -->
  <TodaySubscriptionSection />

  <!-- 이달의 청약 정보 -->
  <section class="container">
    <div class="mt-48">
      <MonthlySubscriptionSection />
    </div>
  </section>

  <!-- 청약카드뉴스 -->
  <section class="mt-26">
    <div class="container">
      <div class="flex ft-point text-7xl pt-10 pb-6 items-center">
        <div>카드뉴스로 확인하는 청약 정보</div>
        <RouterLink to="/subscription/news" class="ml-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
          >
            <path
              d="M21.4 26.6L26.6 21.4C26.9667 21.0333 27.15 20.5667 27.15 20C27.15 19.4333 26.9667 18.9667 26.6 18.6L21.35 13.35C20.9833 12.9833 20.5253 12.808 19.976 12.824C19.4253 12.8413 18.9667 13.0333 18.6 13.4C18.2333 13.7667 18.05 14.2333 18.05 14.8C18.05 15.3667 18.2333 15.8333 18.6 16.2L20.4 18H13.95C13.3833 18 12.9167 18.1913 12.55 18.574C12.1833 18.958 12 19.4333 12 20C12 20.5667 12.192 21.0413 12.576 21.424C12.9587 21.808 13.4333 22 14 22H20.4L18.55 23.85C18.1833 24.2167 18.008 24.6753 18.024 25.226C18.0413 25.7753 18.2333 26.2333 18.6 26.6C18.9667 26.9667 19.4333 27.15 20 27.15C20.5667 27.15 21.0333 26.9667 21.4 26.6ZM20 40C17.2333 40 14.6333 39.4747 12.2 38.424C9.76667 37.3747 7.65 35.95 5.85 34.15C4.05 32.35 2.62533 30.2333 1.576 27.8C0.525334 25.3667 0 22.7667 0 20C0 17.2333 0.525334 14.6333 1.576 12.2C2.62533 9.76667 4.05 7.65 5.85 5.85C7.65 4.05 9.76667 2.62467 12.2 1.574C14.6333 0.524667 17.2333 0 20 0C22.7667 0 25.3667 0.524667 27.8 1.574C30.2333 2.62467 32.35 4.05 34.15 5.85C35.95 7.65 37.3747 9.76667 38.424 12.2C39.4747 14.6333 40 17.2333 40 20C40 22.7667 39.4747 25.3667 38.424 27.8C37.3747 30.2333 35.95 32.35 34.15 34.15C32.35 35.95 30.2333 37.3747 27.8 38.424C25.3667 39.4747 22.7667 40 20 40Z"
              fill="#0C0A09"
            />
          </svg>
        </RouterLink>
      </div>
      <div class="flex gap-6">
        <NewsCardComponent v-for="card in cards" :key="card.title" :card="card" />
      </div>
    </div>
  </section>

  <!-- 커뮤니티 이동 배너 -->
  <CommunityLinkBanner />
</template>

<style scoped></style>
