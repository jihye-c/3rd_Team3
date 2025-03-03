<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps<{
  isAnimated: boolean;
  setIsAnimated: (value: boolean) => void;
  title: string;
}>();

const handleClick = () => {
  props.setIsAnimated(!props.isAnimated);
};
</script>

<template>
  <div class="p-8 flex text-main-50 flex-col gap-12 text-center">
    <div class="text-main-50">
      <p>자취의 수많은 성공 가이드</p>
      <h1 class="!text-5xl ft-point mb-4">자수성가</h1>
    </div>
    <div>
      당신의 자취 생활,<br />
      이제 성공으로 채워드립니다
    </div>
    <div>
      <button
        class="py-3 w-full px-6 bg-transparent text-center text-white font-bold uppercase ring-1 !rounded-full ring-white active:scale-110 transition-transform ease-in"
        @click="handleClick"
      >
        {{ title }}
      </button>
    </div>
  </div>
</template>
