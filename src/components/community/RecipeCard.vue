<script setup lang="ts">
  import type {Author} from '@/types/PostResponse';

  interface Props {
    author: Author;
    image: string;
    title: string;
    tags: string[];
  }
  defineProps<Props>();
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-3">
      <v-avatar
        :image="author.image ? author.image : '/images/mypage/mypage_default_img.png'"
        size="30"
      ></v-avatar>
      <div class="text-[20px] text-mono-500">
        {{ JSON.parse(author.fullName).nickname }}
      </div>
    </div>
    <div class="w-[380px] h-[380px] overflow-hidden rounded-[12px]">
      <img :src="image" alt="product" class="w-full h-full object-cover object-center" />
    </div>
    <div class="text-[28px] text-mono-700 font-bold leading-[32px]">{{ title }}</div>
    <div
      v-for="tag in tags"
      class="text-[18px] text-mono-600 leading-[20px] bg-mono-200 self-start py-1 px-3 rounded-[4px]"
    >
      {{ tag }}
    </div>
  </div>
</template>

<style scoped></style>
