<template>
  <div class="w-full h-full flex justify-center text-mono-900 items-center'">
    <div class=" w-[850px]  flex flex-col items-start gap-4">
      <div class="">
      <div v-if="active" class="flex px-12 gap-1">
        <span  v-for="(subData,index) in data" :key="index" class="w-2 h-2 rounded-full bg-main-400 block mb-1"></span>
      </div>
        <strong :class="`px-12 font-semibold  text-2xl ${active ? 'text-main-500' : 'text-mono-300'}`">{{id}}</strong>
      </div>
      <div class="w-full flex justify-center">
        <swiper
          :slidesPerView="2"
          :navigation="active"
          :modules="[Navigation]"
          class="mySwiper flex justify-center w-[850px] "
        >
          <swiper-slide  v-for="(subData,index) in data" :key="index"><SubscriptionSlideCardItem :active :data="subData"/></swiper-slide>
        </swiper>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import SubscriptionSlideCardItem from './SubscriptionSlideCardItem.vue';
import {  onMounted } from 'vue';


const {data,id,active} = defineProps({
  data: Object,
  id: String,
  active:Boolean
})

onMounted(()=>{


})
</script>

<style scoped>
:deep(.swiper-button-prev, .swiper-button-next){
  left: 0px;

}
:deep(.swiper-button-next){
  color: var(--color-main-400) !important;
}
:deep(.swiper-button-prev){
  color: var(--color-main-400) !important;
}

</style>
