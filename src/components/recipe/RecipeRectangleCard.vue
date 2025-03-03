<script setup lang="ts">
  interface Props {
    image: string;
    title: string;
  }

  const props = defineProps<Props>();
</script>

<template>
  <div class="flex flex-col gap-[16px]">
    <div class="w-[516px] h-[344px] overflow-hidden rounded-[12px]">
      <div
        :style="{backgroundImage: `url(${props.image})`}"
        class="w-full h-full bg-cover bg-center"
      ></div>
    </div>
    <p class="text-[32px] text-mono-700">{{ props.title }}</p>
  </div>
</template>
