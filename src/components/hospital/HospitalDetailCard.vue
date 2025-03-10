<script setup lang="ts">
  import Supabase from '@/apis/supabase';
  import {ref, watch} from 'vue';
  import type {HospitalFullData} from '@/types/hospitalType';
  const data = ref<HospitalFullData>({});
  // 이벤트 정의
  const props = defineProps({
    selectedHospital: String,
  });
  const emit = defineEmits(['close']);
  const handleClick = () => {
    emit('close');
  };
  function formatDate(dateString: string|null) {
    if (!dateString || dateString.length < 0) return '';

    if (dateString.length === 8) {
      const year = dateString.slice(0, 4);
      const month = dateString.slice(4, 6);
      const day = dateString.slice(6, 8);

      return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
    }

    if(dateString.length === 4){
      return dateString.slice(0,2);
    }
  }
  watch(
    () => props.selectedHospital,
    async () => {
      if (!props.selectedHospital) return;
      const res = await Supabase.getDetailHospitalData(props.selectedHospital);
      if (res) {
        data.value = res;
        console.log(data.value);
      }
    },
  );
</script>

<template>
  <div
    class="w-full px-[28px] pt-[28px] pb-[40px] h-full shadow-[4px_0_10px_rgba(0,0,0,0.1)] flex flex-col gap-10 overflow-auto"
  >
    <div>
      <div class="flex justify-end">
        <v-icon class="close" size="20" @click="handleClick">mdi-close</v-icon>
      </div>
      <div class="bg-mono-200 leading-3.5 inline-block px-3 py-1 rounded-full text-sm">
        {{ data.type }}
      </div>
      <div class="text-2xl font-semibold text-mono-700 my-2">{{ data.name }}</div>
      <div v-if="data.open_date" class="mb-2">개원일 : {{ formatDate(data.open_date) }}</div>
      <div v-if="data.treatment" class="text-mono-400">
        <span class="treatment" v-for="treatment in data.treatment" :key="treatment.code">{{
          treatment.code_name
        }}</span>
      </div>
    </div>

    <div>
      <div class="text-xl font-semibold text-mono-700">기본정보</div>
      <v-divider class="border-opacity-100 my-2" thickness="1"></v-divider>
      <div class="flex flex-col gap-2 px-2 text-mono-700">
        <div v-if="data.tel" class="flex gap-2 items-center">
          <v-icon size="20">mdi-phone</v-icon>
          <div>{{ data.tel }}</div>
        </div>
        <div v-if="data.addr" class="flex gap-2 items-center">
          <v-icon size="20">mdi-map-marker</v-icon>
          <div>{{ data.addr }}</div>
        </div>
        <div v-if="data.homepage" class="flex gap-2 items-center">
          <v-icon size="20">mdi-web</v-icon>
          <a class="hover:text-sky-main transition-all" :href="data.homepage">{{
            data.homepage
          }}</a>
        </div>
      </div>
    </div>

    <div v-if="data.detail" class="">
      <div class="text-xl font-semibold text-mono-700">진료정보</div>
      <v-divider class="border-opacity-100 my-2" thickness="1"></v-divider>
      <div class="flex flex-col gap-3 px-2 text-mono-700">
        <div v-if="data.detail.closetime_tue">
          <div class="flex gap-2 items-center">
            <v-icon size="20">mdi-clock-time-four-outline</v-icon>
            <div class="text-lg font-semibold">진료 시간</div>
          </div>
          <div class="flex flex-col pl-7 pt-2 gap-1">
            <div>평일 : <span v-if="data.detail.opentime_tue">{{ formatDate(data.detail.opentime_tue) }}부터 </span> <span v-if="data.detail.closetime_tue">{{ formatDate(data.detail.closetime_tue) }}</span>시까지</div>
            <div v-if="data.detail.closetime_sat">주말 : <span v-if="data.detail.opentime_sat">{{ formatDate(data.detail.opentime_sat) }}부터 </span> <span v-if="data.detail.closetime_sat">{{ formatDate(data.detail.closetime_sat) }}</span>시까지</div>
          </div>
        </div>
        <div v-if="data.detail.lunchbreak_weekday">
          <div class="flex gap-2 items-center">
            <v-icon size="20">mdi-map-marker</v-icon>
            <div class="text-lg font-semibold">점심시간</div>
          </div>
          <div class="flex flex-col pl-7 pt-2 gap-1">
            <div>평일 : {{ data.detail.lunchbreak_weekday }}</div>
            <div v-if="data.detail.lunchbreak_sat">주말 : {{ data.detail.lunchbreak_sat }}</div>
          </div>
        </div>
        <div v-if="data.detail.closed_sun || data.detail.closed_holiday">
          <div class="flex gap-2 items-center">
            <v-icon size="20">mdi-cancel</v-icon>
            <div class="text-lg font-semibold">휴진 정보</div>
          </div>
          <div class="flex flex-col pl-7 pt-2 gap-1">
            <div v-if="data.detail.closed_sun">일요일 : {{ data.detail.closed_sun }}</div>
            <div v-if="data.detail.closed_holiday">공휴일 : {{ data.detail.closed_holiday }}</div>
          </div>
        </div>
        <div v-if="data.detail.reception_weekday">
          <div class="flex gap-2 items-center">
            <v-icon size="20">mdi-text-box-check-outline</v-icon>
            <div class="text-lg font-semibold">접수 시간</div>
          </div>
          <div class="flex flex-col pl-7 pt-2 gap-1">
            <div>평일 : {{ data.detail.reception_weekday }}</div>
            <div>주말 : {{ data.detail.reception_sat }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="data.detail?.location_place">
      <div class="text-xl font-semibold text-mono-700">위치 정보</div>
      <v-divider class="border-opacity-100 my-3" thickness="1"></v-divider>
      <div class="flex flex-col gap-2 px-2 text-mono-700">
        <div v-if="data.detail.location_place">
          <div class="flex gap-2 items-center">
            <v-icon size="20">mdi-car</v-icon>
            <div class="text-lg font-semibold">길 안내</div>
          </div>
          <div class="flex flex-col pl-7 pt-1">
            <p>{{ data.detail.location_direction }}, {{ data.detail.location_distance }}</p>
            <p>{{ data.detail.location_place }}</p>
          </div>
        </div>
        <div v-if="data.detail.parking_capacity">
          <div class="flex gap-2 items-center">
            <v-icon size="20">mdi-parking</v-icon>
            <div class="text-lg font-semibold">주차 정보</div>
          </div>
          <div class="flex flex-col pl-7 pt-1">
            <p>주차 가능 대수 : {{ data.detail.parking_capacity }}대</p>
            <p>유/무료 : {{ data.detail.parking_cost == 'Y' ? '유료' : '무료' }}</p>
            <p class="text-mono-400">{{ data.detail.parking_etc }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  * {
    word-break: keep-all;
  }
  .treatment::after {
    content: ',';
    margin-right: 4px;
  }
  .treatment:last-child:after {
    content: '';
  }
  :deep(.v-divider) {
    color: var(--color-mono-600);
  }
  :deep(.v-icon) {
    color: var(--color-main-400);
  }
  :deep(.v-icon.close) {
    color: var(--color-mono-400);
  }
</style>
