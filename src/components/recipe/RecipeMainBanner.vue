<script lang="ts" setup>
  // Import Swiper Vue.js components
  import {Swiper, SwiperSlide} from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/autoplay';

  // import required modules
  import {Autoplay} from 'swiper/modules';

  const modules = [Autoplay];
</script>

<template>
  <section class="h-140">
    <div class="relative">
      <Swiper
        :modules="modules"
        :slides-per-view="1"
        :loop="true"
        :autoplay="{delay: 2000, disableOnInteraction: false}"
        :speed="2000"
        class="mySwiper"
      >
        <SwiperSlide class="relative">
          <div class="w-full h-[560px] overflow-hidden">
            <div
              class="bg-[url(/images/recipe/recipe_banner2.webp)] w-full h-full bg-cover bg-center"
            ></div>
          </div>
        </SwiperSlide>
        <SwiperSlide class="relative">
          <div class="w-full h-[560px] overflow-hidden">
            <div
              class="bg-[url(/images/recipe/recipe_banner3.webp)] w-full h-full bg-cover bg-center"
            ></div>
          </div>
        </SwiperSlide>
        <SwiperSlide class="relative">
          <div class="w-full h-[560px] overflow-hidden">
            <div
              class="bg-[url(/images/recipe/recipe_banner1.webp)] w-full h-full bg-cover bg-center"
            ></div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div class="absolute top-0 z-10 w-full h-full bg-mono-900/30 flex place-content-center">
        <div class="container flex flex-col gap-2 justify-center items-start">
          <div class="text-[40px] text-mono-050 leading-[52px]">혼자 살아도 건강하게!</div>
          <div class="text-[60px] font-bold text-mono-050 leading-16">
            자취생을 위한 영양만점 레시피
          </div>
        </div>
      </div>
    </div>
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
