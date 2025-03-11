<template>
  <div class="flex w-full gap-4">
    <div class="flex flex-col justify-between gap-15">

      <HomeTitle title="이 달의 청약정보" link="/subscription" content="놓치지 말아야 할 이 달의 청약정보" />
      <Calendar
        expanded
        locale="en"
        @dayclick="handleDayClick"
        @did-move="onMonthChangee"
        :attributes="attributes"
        :first-day-of-week="2"
        :masks="{title: 'YYYY.MM', weekdays: 'WWW'}"
      ></Calendar>
    </div>
    <div class="w-full mt-6 px-5 py-10 rounded-lg bg-mono-050">

      <div v-if="filterData?.length !== 0">
        <SwiperComponent
          @swiper="setSwiper"
          @slide-change="onSlideChange"
          :direction="'vertical'"
          :slidesPerView="3"
          :modules="[Pagination]"
          :space-between="40"
          :centeredSlides="true"
          :pagination="{
            type: 'progressbar',
            el: '.progressbar',
          }"
          class="mySwiper w-full h-[500px]"
        >
          <swiper-slide v-for="([key, value], index) in Object.entries(filterData)" :key="index">
            <SubscriptionSlideCard
              :id="String(key)"
              :active="index === activeIndex"
              :data="value"
            />
          </swiper-slide>
          <div class="swiper-pagination progressbar"></div>
        </SwiperComponent>
      </div>
      <div v-else class=" w-full h-full flex flex-col gap-10 items-center justify-center"  >
        <img class="w-64" src="/home/main_subscription_no_post_back.png" alt="">
        <p class="text-md text-gray-600">아쉽게도 청약 일정이 없어요.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {computed, onUpdated, ref, watchEffect} from 'vue';
  import {Calendar} from 'v-calendar';
  import {Swiper as SwiperComponent, SwiperSlide} from 'swiper/vue';
  import { Pagination } from 'swiper/modules';

  import type {Swiper} from 'swiper/types';
  import type {CalendarDay, Page} from 'v-calendar/dist/types/src/utils/page.js';
  import type {AttributeConfig} from 'v-calendar/dist/types/src/utils/attribute.js';
  import type {HouseInfo} from '@/types/SubscriptionTypes';

  import {useSubscriptionStore} from '@/stores/subscriptionStore.ts';
  import {getLocalDate} from '@/utils/format';
  import HomeTitle from '@/components/Home/common/HomeTitle.vue';
  import SubscriptionSlideCard from '@/components/SubscriptionSlideCard.vue';

  import 'v-calendar/style.css';
  import 'swiper/css';
  import 'swiper/css/pagination';


  const subscriptionStore = useSubscriptionStore();

  const swipers = ref<Swiper | null>(null);
  const data = ref<HouseInfo[] | null>([]); // 데이터를 반응형 상태로 선언
  const filterData = ref<HouseInfo[] | null>([]); // 데이터를 반응형 상태로 선언
  const activeIndex = ref<number>();
  const dotColors = ['#FF5733', '#33FF57', '#5733FF', '#FFD700', '#FF33A1'];

  const attributes = computed<AttributeConfig[]>(() =>
    data.value!.map((house, index) => ({
      key: `house-${index}`,
      dot: {
        style: {
          backgroundColor: dotColors[index % dotColors.length],
        },
      },
      popover: {
        label: house.HOUSE_NM,
        visibility: 'click',
      },
      dates: [new Date(house.RCRIT_PBLANC_DE)],
    })),
  );

  const setSwiper = (instance: Swiper): void => {
    swipers.value = instance;
  };

  const onSlideChange = (swiper: Swiper) => {
    activeIndex.value = swiper.activeIndex;
  };

  const handleDayClick = (calendarDay: CalendarDay) => {
    const date = getLocalDate(calendarDay.date);
    const index = Object.keys(filterData.value!).findIndex((k) => k === date);

    swipers.value?.slideTo(index);
  };

  const onMonthChangee = async (calendarWeek: Page[]) => {
    subscriptionStore.filteredData(calendarWeek[0].id);
  };

  watchEffect(async () => {
    data.value = subscriptionStore.SubscriptionList;
    filterData.value = subscriptionStore.filteredDayhDatas;
    console.log(filterData.value);
  });

  onUpdated(() => {
    swipers.value?.slideTo(1);

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
    left: 885px;
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
