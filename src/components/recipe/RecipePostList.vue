<script setup lang="ts">
  interface Props {
    author: string;
    title: string;
    content: string;
    image: string;
  }

  const props = defineProps<Props>();
</script>

<template>
  <div class="flex h-[124px] w-[788px] justify-between">
    <div class="w-[124px] rounded-[16px] overflow-hidden">
      <div
        :style="{backgroundImage: `url(${props.image})`}"
        class="w-full h-full bg-cover bg-center"
      ></div>
    </div>
    <div class="flex flex-col gap-[8px] w-[648px]">
      <div class="text-[18px] text-mono-400">{{ props.author }}</div>
      <div class="text-[32px] text-mono-700 font-semibold leading-[38px]">{{ props.title }}</div>
      <div class="text-[18px] text-mono-700 line-clamp-1">{{ props.content }}</div>
    </div>
  </div>
</template>
