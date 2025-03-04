<script setup lang="ts">
  interface Author {
    profileImg: string;
    name: string;
  }
  interface Props {
    author: Author;
    image: string;
    title: string;
    tag: string;
  }
  defineProps<Props>();
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-3">
      <v-avatar :image="author.profileImg" size="30"></v-avatar>
      <div class="text-[20px] text-mono-500">{{ author.name }}</div>
    </div>
    <div class="w-[380px] h-[380px] overflow-hidden rounded-[12px]">
      <img :src="image" alt="product" class="w-full h-full object-cover object-center" />
    </div>
    <div class="text-[28px] text-mono-700 font-bold leading-[32px]">{{ title }}</div>
    <div
      class="text-[18px] text-mono-600 leading-[20px] bg-mono-200 self-start py-1 px-3 rounded-[4px]"
    >
      {{ tag }}
    </div>
  </div>
</template>

<style scoped></style>
