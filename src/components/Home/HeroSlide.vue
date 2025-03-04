<template>
  <swiper
    :modules="[Pagination, EffectFade, Autoplay]"
    :effect="'fade'"
    :pagination="{
      el: '.swiper-pagination',
      type: 'progressbar',
    }"
    @slideChange="onSlideChange"
    autoplay
    class="swiper h-[580px] pb-3"
  >
    <swiper-slide v-for="(item, i) in backgroundItems" :key="i">
      <div
        :style="{ backgroundColor: item.color }"
        class="flex items-center justify-center bg-mono-200 h-full"
      >
        <div class="container">
          <div class="w-full h-full flex items-center justify-between">
            <div class="flex items-start flex-col text-mono-050 gap-8">
              <h3 class="text-5xl font-bold">{{ item.title }}</h3>
              <div>
                <Motion
                  as="span"
                  v-for="(el, index) in item.content"
                  :key="`${currentSlide}-${index}`"
                  :initial="{ opacity: 0 }"
                  :animate="{ opacity: 1 }"
                  :transition="{
                    duration: 0.25,
                    delay: index / 20,
                  }"
                  class="text-xl"
                >
                  {{ el }}{{ "" }}
                </Motion>
              </div>
            </div>
            <div>
              <img :src="item.img" alt="" />
            </div>
          </div>
        </div>
      </div>
    </swiper-slide>

    <!-- 직접 렌더링한 프로그레스 바 -->
    <div class="container relative">
      <div class="absolute left-0 !bottom-[90px] z-10">
        <div class="swiper-pagination progressbar"></div>
      </div>
    </div>
  </swiper>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, EffectFade, Autoplay } from "swiper/modules";
import { Motion } from "motion-v";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const currentSlide = ref(0);

const backgroundItems = [
  {
    title: "병원정보",
    content: "내 주변 병원 정보를 한눈에 확인해보세요.",
    color: "var(--color-main-400)",
    img: "/home/main_hero1.webp",
  },
  {
    title: "나만의 레시피",
    content: "건강하고 맛있는 나만의 레시피를 찾아보세요!",
    color: "#f25267",
    img: "/home/main_hero2.webp",
  },
  {
    title: "동네정보",
    content: "우리 동네 생활 정보와 편의시설을 확인해보세요.",
    color: "#03d8b1",
    img: "/home/main_hero3.webp",
  },
  {
    title: "청약 정보",
    content: "내 집 마련! 청약 정보를 빠르게 확인해보세요.",
    color: "#00bdec",
    img: "/home/main_hero4.webp",
  },

];

const onSlideChange = (swiper: any) => {
  currentSlide.value = swiper.activeIndex;};
</script>

<style scoped>
/* 프로그레스 바 커스텀 스타일 */
:deep(.progressbar) {
  position: static;
  left: 0;
  width: 600px;
  z-index: 1000;
  height: 4px;
  background: rgba(0, 0, 0, 0.2);
}

/* Swiper 내부의 프로그레스 바 커스텀 */
:deep(.swiper-pagination-progressbar-fill) {
  background: rgba(0, 0, 0, 0.8);
}
</style>
