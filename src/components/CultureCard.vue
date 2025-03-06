<template>
  <div class=" relative  w-[300px] !cursor-pointer flex flex-col gap-3">
    <div class="relative hover-target group rounded-lg overflow-hidden">
  <img
    :src="src"
    alt=""
    class="group-hover:scale-110 transition-transform duration-300 ease-in-out"
  />
  <span
    class="absolute left-3 py-1 text-sm top-3 px-6 text-main-500 font-bold rounded-full bg-[#fff]"
  >
    {{ category }}
  </span>
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
