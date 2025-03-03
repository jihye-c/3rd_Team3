<script setup lang="ts">
import { ref } from 'vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import CalendarComponent from '@/components/CalendarComponent.vue';
import FestivalSearchComponent from '@/components/FestivalSearchComponent.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';

const categories = ['공연', '전시', '행사', '축제'];
const subCategories = ['전통공연', '연극', '뮤지컬', '오페라', '무용', '클래식 음악회', '대중콘서트'];
const periods = ['1개월', '3개월', '6개월', '1년'];
const selectedCategory = ref('');

const banners = ref([
  {
    image: '/images/festival/banner0.png',
    category: categories[3],
    location: '서울특별시 종로구',
    title: '서울스프링페스타',
    description: '모바일 공연, 퍼레이드 등을 선보이는 대화형 거리 축제',
  },
  {
    image: '/images/festival/banner1.jpg',
    category: categories[0],
    location: '서울특별시 강남구',
    title: '강남뮤직페스티벌',
    description: '국내외 아티스트가 참여하는 대형 음악 축제',
  },
  {
    image: '/images/festival/banner2.jpg',
    category: categories[2],
    location: '서울특별시 마포구',
    title: '홍대 스트릿 페스티벌',
    description: '거리 공연과 다양한 체험이 가능한 예술 축제',
  }
]);

const totalPages = ref(100);
const currentPage = ref(1);

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

const events = ref([
  { type: '전시', title: '강원관광두레 팝업스토어', period: '02.10 ~ 02.20', location: '중랑구' },
  { type: '전시', title: '서울아트페어', period: '03.05 ~ 03.15', location: '강남구' },
  { type: '공연', title: '국악한마당', period: '03.10 ~ 03.20', location: '종로구' },
  { type: '축제', title: '봄꽃 페스티벌', period: '04.01 ~ 04.10', location: '여의도' },
]);
</script>

<template>
  <div class="w-full">
    <!-- 배너 -->
    <div class="w-full h-[582px] relative">
      <Swiper :modules="[Pagination, Navigation]" :pagination="{ clickable: true }" :navigation="true">
        <SwiperSlide v-for="(banner, index) in banners" :key="index" class="relative">
          <!-- 배너 오버레이 문구 -->
          <div 
            class="absolute top-1/2 right-[5%] sm:right-[10%] md:right-[15%] lg:right-[160px] 
            transform -translate-y-1/2 text-mono-100 text-right p-4 md:p-8 z-20 max-w-[500px]">
            <p class="text-[16px] sm:text-[18px] md:text-[20px]">{{ banner.location }}</p>
            <p class="text-[32px] sm:text-[40px] md:text-[48px] font-bold">{{ banner.title }}</p>
            <p class="text-[16px] sm:text-[18px] md:text-[20px]">{{ banner.description }}</p>
          </div>
          <!-- 배경 그라데이션 -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent to-pink-main opacity-95 pointer-events-none z-10"></div>
          <img :src="banner.image" class="w-full h-[582px] object-cover" />
        </SwiperSlide>
      </Swiper>
    </div>


    <div class="max-w-[1600px] mx-auto">
      <!-- 전체 컨텐츠에 패딩과 중앙 정렬 적용 -->
      <!-- 달력 & 일정 -->
      <div class="flex justify-center flex-wrap gap-8 mt-10">
        <!-- 달력 -->
        <div class="flex-1 max-w-[700px] min-w-[300px]">
          <CalendarComponent />
        </div>
        
        <!-- 일정 -->
        <div class="flex-1 max-w-[900px] min-w-[300px] p-6 border border-mono-300 rounded-lg">
          <h2 class="text-[32px] font-semibold text-mono-900 text-left">2025.02.21 (금)</h2>
          <div class="grid grid-cols-2 gap-4 mt-4">
            <div v-for="(event, index) in events" :key="index" class="bg-white p-4 rounded shadow">
              <span class="bg-main-400 text-white text-sm px-2 py-1 rounded w-fit inline-block">{{ event.type }}</span>
              <p class="text-[24px] font-semibold mt-2 text-mono-900">{{ event.title }}</p>
              <p class="text-[16px] text-mono-600">행사기간 : {{ event.period }} | 장소 : {{ event.location }}</p>
            </div>
          </div>
        </div>
      </div>


      <!-- 검색바 & 카드 리스트 -->
      <div class="max-w-[1600px] mx-auto">
      <!-- 검색바 & 카드 리스트 -->
      <div class="flex justify-center gap-8 mt-10 items-start">
        <FestivalSearchComponent />
        
        <div class="flex flex-col items-center w-[1200px]">
          <!-- 카드 리스트 -->
          <div class="grid grid-cols-3 gap-4 w-full">
            <div v-for="n in 9" :key="n" class="p-4 rounded-lg shadow border border-mono-300">
              <p class="text-sm text-mono-600 flex items-center mb-4">
                <span class="w-2 h-2 bg-main-400 rounded-full mr-2"></span>{{ banners[n % banners.length].category }}
              </p>
              <img :src="banners[n % banners.length].image" class="h-[340px] w-full object-cover rounded-lg" />
              <div class="mt-4">
                <p class="font-bold text-mono-900">{{ banners[n % banners.length].title }}</p>
                <p class="text-mono-600">{{ banners[n % banners.length].description }}</p>
              </div>
            </div>
          </div>
          <!-- 페이지네이션 -->
          <div class="w-full flex justify-center">
            <PaginationComponent :totalPages="totalPages" @pageChange="handlePageChange" />
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>





