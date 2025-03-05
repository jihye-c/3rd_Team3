<template>
  <div class="flex w-full gap-4">
    <div class="flex flex-col justify-between gap-15">
      <HomeTitle title="이 달의 청약정보" content="놓치지 말아야 할 이 달의 청약정보" />
      <DatePicker
        expanded
        locale="en"
        :attributes="attributes"
        first-day-of-week="2"
        :masks="{title: 'YYYY.MM', weekdays: 'WWW'}"
      ></DatePicker>
      <!-- ✅ Self-closing 문제 해결 -->
    </div>
    <div class="w-full mt-6 px-5 pl-10 py-10 rounded-lg bg-mono-050">
      <div>
        <swiper
          :direction="'vertical'"
          :slidesPerView="3"
          :space-between="40"
          :centeredSlides="true"
          :pagination="{
            type: 'progressbar',
            el: '.progressbar',
          }"
          :modules="[Pagination]"
          class="mySwiper w-full h-[500px]"
        >
          <swiper-slide><SubscriptionSlideCard /></swiper-slide>
          <swiper-slide><SubscriptionSlideCard /></swiper-slide>
          <swiper-slide><SubscriptionSlideCard /></swiper-slide>
          <swiper-slide><SubscriptionSlideCard /></swiper-slide>
          <swiper-slide><SubscriptionSlideCard /></swiper-slide>
          <div class="swiper-pagination progressbar"></div>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {computed, onMounted, ref} from 'vue';
  import {DatePicker} from 'v-calendar';
  import {Swiper, SwiperSlide} from 'swiper/vue';
  import {Pagination} from 'swiper/modules';

  import HomeTitle from './common/HomeTitle.vue';
  import SubscriptionSlideCard from '../SubscriptionSlideCard.vue';
  import {getAptData} from '@/apis/SubscriptionApi';
  import type {HouseInfo} from '@/types/SubscriptionTypes';

  import 'v-calendar/style.css';
  import 'swiper/css';
  import 'swiper/css/pagination';

  const data = ref<HouseInfo[]>([]); // 데이터를 반응형 상태로 선언

  const dotColors = ['#FF5733', '#33FF57', '#5733FF', '#FFD700', '#FF33A1'];

  const attributes = computed(() =>
    data.value.map((house, index) => ({
      key: `house-${index}`,
      dot: dotColors[index % dotColors.length], // ✅ 색상 순환 적용

      popover: {
        label: house.HOUSE_NM, // 툴팁에 표시할 텍스트
      },
      dates: [new Date(house.RCRIT_PBLANC_DE)],
    })),
  );

  onMounted(async () => {
    const result = await getAptData();
    console.log(result);
    data.value = result.data; // data에 할당
  });
</script>

<style scoped>
  :deep(.vc-title) {
    font-weight: 800;
  }
  :deep(.vc-bordered) {
    padding: 5px 80px;
    width: 653px;
    height: 400px;
  }
  :deep(.vc-weekday) {
    font-weight: 400;
  }
  :deep(.vc-header) {
    padding: 0 100px;
    margin: 20px 0px;
  }
  :deep(.vc-arrow) {
    width: 25px;
    height: 25px;
    color: #fff;
    background-color: var(--color-main-400);
  }
  :deep(.vc-day) {
    min-height: 45px;
  }
  :deep(.swiper-pagination-progressbar) {
    position: absolute;
    /* top: 300px; */
    left: 850px;
    height: 450px;
    top: 30px;
    z-index: 1000;
    width: 4px;
    background: rgba(0, 0, 0, 0.2);
  }

  /* Swiper 내부의 프로그레스 바 커스텀 */
  :deep(.swiper-pagination-progressbar-fill) {
    background: var(--color-main-400);
  }
</style>
