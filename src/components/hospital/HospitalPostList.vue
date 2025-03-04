<script setup lang="ts">
  interface Props {
    name: string;
    type: string;
    closeTime: string;
    addr: string;
  }

  defineProps<Props>();

  // 시간 포맷터
  const formatTime = (time: string) => time.slice(0, 2) + ':' + time.slice(2);
</script>

<template>
  <div class="h-[148px] p-5 flex flex-col gap-2">
    <div class="text-[20px] text-mono-700 font-medium leading-[24px] line-clamp-1">
      {{ name }}
    </div>
    <div class="text-[14px] text-mono-400 leading-[16px]">{{ type }}</div>
    <div class="flex gap-2">
      <div class="flex justify-center items-center gap-2">
        <v-icon color="#5BA744" size="8">mdi-circle</v-icon>
        <div class="text-[14px] text-[#5BA744]">진료중</div>
      </div>
      <div class="flex items-center h-[14px] w-[1px] place-self-center">
        <v-divider vertical></v-divider>
      </div>
      <div class="text-[14px] text-mono-400">{{ formatTime(closeTime) }}에 마감</div>
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
      <div class="text-[14px] text-mono-400 line-clamp-1">{{ addr }}</div>
    </div>
  </div>
</template>

<style scoped>
  :deep(.v-divider--vertical) {
    background-color: var(--color-mono-400);
    opacity: 1;
  }
</style>
