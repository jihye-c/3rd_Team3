<template>
  <div class="w-full h-full flex text-mono-900 items-center">
    <div class="w-full flex flex-col items-start gap-4">
      <div class="">
        <span class="w-2 h-2 rounded-full bg-main-400 block mb-1"></span>
        <strong class="font-semibold text-2xl">{{id}}</strong>
      </div>
      <div class="">
        <swiper
          :slidesPerView="2"
          :pagination="{
            type: 'progressbar',
            el: '.progressbar',
          }"
          :modules="[Pagination]"
          class="mySwiper flex w-[800px] "
        >
          <swiper-slide v-for="(subData,index) in data" :key="index"><SubscriptionSlideCardItem :data="subData"/></swiper-slide>
        </swiper>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import SubscriptionSlideCardItem from './SubscriptionSlideCardItem.vue';
import { onMounted } from 'vue';

const {data,id} = defineProps({
  data: Object,
  id: String,
})

onMounted(()=>{
  console.log(data)
  console.log(id)
})
</script>

<style scoped></style>
