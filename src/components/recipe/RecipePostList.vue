<script setup lang="ts">
  interface Props {
    author: string;
    title: string;
    content: string;
    image: string;
    font_class?:string;
  }

  const props = defineProps<Props>();
</script>

<template>

  <div class="flex hover-target cursor-pointer h-[124px] w-full">
    <div class="min-w-[124px] w-[124px] rounded-[16px] overflow-hidden shrink-0">
      <div
        :style="{backgroundImage: `url(${props.image})`}"
        class="w-full h-full bg-cover bg-center"
      ></div>
    </div>
    <div class="flex flex-col gap-[8px] ml-4 overflow-hidden flex-1">
      <div class="text-[18px] text-mono-400 truncate">{{ props.author }}</div>
      <div :class="`text-[32px] text-mono-700 font-semibold leading-[38px] line-clamp-1 ${font_class}`">
        {{ props.title }}
      </div>
      <div class="text-[18px] text-mono-700 line-clamp-1">{{ props.content }}</div>
    </div>
  </div>
</template>
