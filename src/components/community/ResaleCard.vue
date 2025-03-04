<script setup lang="ts">
  interface Props {
    image: string;
    title: string;
    price: string;
    dong: string;
  }
  defineProps<Props>();
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="w-[380px] h-[380px] overflow-hidden rounded-[12px]">
      <img :src="image" alt="product" class="w-full h-full object-cover object-center" />
    </div>
    <div>
      <div class="text-[24px] text-mono-700">{{ title }}</div>
      <div class="text-[28px] text-mono-700 font-bold leading-[30px]">
        {{ new Intl.NumberFormat().format(Number(price)) }}원
      </div>
    </div>
    <div class="text-[20px] text-mono-400">수유1동</div>
  </div>
</template>

<style scoped></style>
