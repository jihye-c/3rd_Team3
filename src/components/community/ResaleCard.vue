<script setup lang="ts">
  interface Props {
    image: string;
    title: string;
    price: string;
    dong: string;
    available: boolean;
  }
  defineProps<Props>();
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="w-[380px] h-[380px] overflow-hidden rounded-[12px]">
      <div
        :style="{
          background: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
        class="w-full h-full"
      >
        <div v-if="!available" class="w-full h-full bg-mono-900/50"></div>
      </div>
    </div>
    <div>
      <div class="text-[24px] text-mono-700">{{ title }}</div>
      <div v-if="available" class="text-[28px] text-mono-700 font-bold leading-[30px]">
        {{ new Intl.NumberFormat().format(Number(price)) }}원
      </div>
      <div v-else class="text-[28px] text-mono-700 font-bold leading-[30px]">판매완료</div>
    </div>
    <div class="text-[20px] text-mono-400">{{ dong }}</div>
  </div>
</template>

<style scoped></style>
