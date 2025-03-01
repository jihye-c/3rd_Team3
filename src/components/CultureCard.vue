<template>
  <div class="w-[300px] flex flex-col gap-3">
  <div class="relative rounded-lg overflow-hidden">
    <img :src="src" alt="">
    <span class="absolute left-3 py-1 text-sm top-3 px-6 text-main-500 font-bold rounded-full bg-[#fff]">{{ category }}</span>
  </div>
  <div>
    <strong class="text-2xl font-semibold">{{title}}</strong>
    <p class=" text-mono-700">{{ content }}</p>
  </div>
  </div>
</template>

<script setup lang="ts">
 const {title,content,src,category} = defineProps({
  title:String,
  content: String,
  src: String,
  category: String,
 })
</script>

<style scoped></style>
