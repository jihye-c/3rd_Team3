<script setup lang="ts">
  import type {HospitalData} from '@/types/hospitalType';
  import {ref} from 'vue';
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const todayRuntime: string[] = [];
  const props = defineProps<{
    data: HospitalData;
  }>();
  const data = props.data;
  const timeInfo = ref<{
    startTime: string | null;
    closeTime: string | null;
    nowOpen: boolean;
  }>({
    startTime: null,
    closeTime: null,
    nowOpen: false,
  });

  const formatTime = (time: string) => {
    const timePad = time.padStart(4, '0');
    return `${timePad.slice(0, 2)}:${timePad.slice(2)}`;
  };
  const compareCurrentTime = (todayRunTime: string[]) => {
    const currentTime = new Date();
    const currentFormatedTime = `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}`;
    const startTime = todayRunTime[0] ? formatTime(todayRunTime[0]) : null;
    const closeTime = formatTime(todayRunTime[1]);
    timeInfo.value.startTime = startTime;
    timeInfo.value.closeTime = closeTime;
    if (
      (startTime ? startTime : '09:00') <= currentFormatedTime &&
      closeTime >= currentFormatedTime
    ) {
      timeInfo.value.nowOpen = true;
    }
  };

  // 영업 중 노출 처리
  if (data.hospital_detail) {
    const today = days[new Date().getDay()];
    const todayOpentime = 'opentime_' + today;
    const todayCloseTime = 'closetime_' + today;

    todayRuntime.push(data.hospital_detail[todayOpentime]);
    todayRuntime.push(data.hospital_detail[todayCloseTime]);

    if (todayRuntime[0] !== null || todayRuntime[1] !== null) {
      compareCurrentTime(todayRuntime);
    }
  }
</script>

<template>
  <div class="flex flex-col gap-2 items-start py-5">
    <span class="text-xs text-white bg-mono-200 leading-[14px] item px-3 py-1 rounded-full">{{
      data.type
    }}</span>

    <div>
      <div class="text-xl text-mono-700 font-medium  line-clamp-1">
        {{ data.name }}
      </div>
      <div class="flex items-center gap-1.5 relative">
        <svg
          width="10"
          height="14"
          viewBox="0 0 10 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.99967 0.333984C2.41967 0.333984 0.333008 2.42065 0.333008 5.00065C0.333008 8.50065 4.99967 13.6673 4.99967 13.6673C4.99967 13.6673 9.66634 8.50065 9.66634 5.00065C9.66634 2.42065 7.57967 0.333984 4.99967 0.333984ZM4.99967 6.66732C4.07967 6.66732 3.33301 5.92065 3.33301 5.00065C3.33301 4.08065 4.07967 3.33398 4.99967 3.33398C5.91967 3.33398 6.66634 4.08065 6.66634 5.00065C6.66634 5.92065 5.91967 6.66732 4.99967 6.66732Z"
            fill="#A6A09B"
          />
        </svg>
        <div class="text-[14px] text-mono-400 line-clamp-1">{{ data.addr }}</div>
      </div>
    </div>

    <div class="flex gap-2" v-show="timeInfo.closeTime">
      <div class="flex justify-center items-center gap-1" v-show="timeInfo.nowOpen">
        <v-icon color="var(--color-green-dark)" size="10">mdi-circle</v-icon>
        <div class="text-sm font-semibold text-green-dark">진료중</div>
      </div>
      <div class="flex justify-center items-center gap-1" v-show="!timeInfo.nowOpen">
        <v-icon color="var(--color-pink-dark)" size="10">mdi-circle</v-icon>
        <div class="text-sm font-semibold text-pink-dark">진료마감</div>
      </div>
      <div class="flex items-center h-[14px] w-[1px] place-self-center">
        <v-divider vertical></v-divider>
      </div>
      <div class="text-sm text-mono-300">
        <p class="inline" v-show="timeInfo.startTime">
          <span class="font-semibold">{{ timeInfo.startTime }}</span
          >부터
        </p>
        <p class="inline">
          <span class="font-semibold">{{ timeInfo.closeTime }}</span
          >까지 진료
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  :deep(.v-divider--vertical) {
    background-color: var(--color-mono-400);
    opacity: 1;
  }
</style>
