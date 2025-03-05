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
    <swiper-slide v-for="(item, i) in background_items" :key="i">
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

import { background_items} from "@/config/config";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const currentSlide = ref(0);



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
