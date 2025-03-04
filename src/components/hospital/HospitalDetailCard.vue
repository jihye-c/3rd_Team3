<script setup lang="ts">
  interface Props {
    name: string;
    // treatment: string; // treatment 배열의 첫번째 값
    type: string;
    tel: string;
    addr: string;
    homepage: string;
    // 진료 시간 데이터 어떻게 할지?
    lunchbreack_weekday: string | null;
    lunchbreack_sat: string | null;
    // 휴진 정보 데이터 어떻게 할지?
    reception_weekday: string | null;
    reception_sat: string | null;
    parking_etc: string | null;
    // 길안내 정보는 없는 것 같음..
  }

  defineProps<Props>();

  // 이벤트 정의
  const emit = defineEmits(['close']);

  const handleClick = () => {
    emit('close');
  };
</script>

<template>
  <div
    class="w-[400px] px-[28px] pt-[28px] pb-[40px] h-full shadow-[4px_0_10px_rgba(0,0,0,0.1)] flex flex-col gap-12 overflow-auto"
  >
    <div class="flex flex-col gap-2">
      <div class="flex justify-end">
        <v-icon class="close" size="20" @click="handleClick">mdi-close</v-icon>
      </div>
      <div class="text-[24px] font-medium text-mono-700">{{ name }}</div>
      <div class="flex gap-2 text-[16px] text-mono-500">
        <div>소아청소년과</div>
        <div>|</div>
        <div v-if="type">{{ type }}</div>
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <div class="text-[24px] font-medium text-mono-700">기본정보</div>
      <v-divider class="border-opacity-100" thickness="3"></v-divider>
      <div class="flex flex-col gap-2 px-2 text-mono-700">
        <div class="flex gap-2 items-center">
          <v-icon size="20">mdi-phone</v-icon>
          <div class="text-[16px]" v-if="tel">{{ tel }}</div>
        </div>
        <div class="flex gap-2 items-center">
          <v-icon size="20">mdi-map-marker</v-icon>
          <div class="text-[16px]">{{ addr }}</div>
        </div>
        <div class="flex gap-2 items-center">
          <v-icon size="20">mdi-web</v-icon>
          <div class="text-[16px]">{{ homepage }}</div>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <div class="text-[24px] font-medium text-mono-700">진료정보</div>
      <v-divider class="border-opacity-100" thickness="3"></v-divider>
      <div class="flex flex-col gap-3 px-2 text-mono-700">
        <div>
          <div class="flex gap-2 items-center">
            <v-icon size="20">mdi-clock-time-four-outline</v-icon>
            <div class="text-[16px]">진료 시간</div>
          </div>
          <div class="flex flex-col pl-7 pt-2 gap-1">
            <div>평일 : 00 ~ 00</div>
            <div>주말 : 00 ~ 00</div>
          </div>
        </div>
        <div>
          <div class="flex gap-2 items-center">
            <v-icon size="20">mdi-map-marker</v-icon>
            <div class="text-[16px]">점심시간</div>
          </div>
          <div class="flex flex-col pl-7 pt-2 gap-1">
            <div>평일 : {{ lunchbreack_weekday }}</div>
            <div>주말 : {{ lunchbreack_sat }}</div>
          </div>
        </div>
        <div>
          <div class="flex gap-2 items-center">
            <v-icon size="20">mdi-cancel</v-icon>
            <div class="text-[16px]">휴진 정보</div>
          </div>
          <div class="flex flex-col pl-7 pt-2 gap-1">
            <div>평일 : 00 ~ 00</div>
            <div>주말 : 00 ~ 00</div>
          </div>
        </div>
        <div>
          <div class="flex gap-2 items-center">
            <v-icon size="20">mdi-text-box-check-outline</v-icon>
            <div class="text-[16px]">접수 시간</div>
          </div>
          <div class="flex flex-col pl-7 pt-2 gap-1">
            <div>평일 : {{ reception_weekday }}</div>
            <div>주말 : {{ reception_sat }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <div class="text-[24px] font-medium text-mono-700">위치 정보</div>
      <v-divider class="border-opacity-100" thickness="3"></v-divider>
      <div class="flex flex-col gap-2 px-2 text-mono-700">
        <div>
          <div class="flex gap-2 items-center">
            <v-icon size="20">mdi-car</v-icon>
            <div class="text-[16px]">길 안내</div>
          </div>
          <div class="flex flex-col pl-7 pt-1 gap-1">
            <p>내손동 KB 국민은행 건물 4층</p>
          </div>
        </div>
        <div>
          <div class="flex gap-2 items-center">
            <v-icon size="20">mdi-parking</v-icon>
            <div class="text-[16px]">주차 정보</div>
          </div>
          <div class="flex flex-col pl-7 pt-1 gap-1">
            <p>{{ parking_etc }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
