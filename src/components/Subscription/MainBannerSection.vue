<script lang="ts" setup>
  // Import Swiper Vue.js components
  import {Swiper, SwiperSlide} from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/scrollbar';

  // import required modules
  import {Scrollbar} from 'swiper/modules';

  const modules = [Scrollbar];
</script>

<template>
  <section class="h-140">
    <Swiper :scrollbar="{hide: false}" :modules="modules" :loop="true" class="mySwiper">
      <SwiperSlide class="relative">
        <img src="/images/subscription/mainBanner01.webp" alt="" />
        <div
          class="absolute top-1/2 left-60 w-full text-mono-050 bg-black bg-opacity-50 transform -translate-y-1/2"
        >
          <div class="text-6xl font-bold mb-4">청약의 모든 것, 한눈에 확인하세요</div>
          <div class="text-3xl font-semibold">
            나의 첫 집 찾기<br />
            자수성가로 시작해볼까?
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide class="relative">
        <img src="/images/subscription/mainBanner02.webp" alt="" />
        <div
          class="absolute top-1/2 left-60 w-full text-mono-050 bg-black bg-opacity-50 transform -translate-y-1/2"
        >
          <div class="text-6xl font-bold mb-4">청약의 모든 것, 한눈에 확인하세요</div>
          <div class="text-3xl font-semibold">
            나의 첫 집 찾기<br />
            자수성가로 시작해볼까요?
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<style scoped>
  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.7);
  }
</style>
