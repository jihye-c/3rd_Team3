<template>
  <div class=" w-[300px] hover-target cursor-pointer flex flex-col gap-3">
    <div class=" relative  group h-[375px]  rounded-lg overflow-hidden">
  <img
    :src="link"
    alt=""
    class=" group-hover:scale-110  w-full h-full object-cover transition-transform duration-300 ease-in-out"
  />
  <span
    class="absolute left-3 py-1 text-sm top-3 px-6 text-main-500 font-bold rounded-full bg-[#fff]"
  >
    {{ category }}
  </span>
</div>
  <div>
    <strong class="text-2xl line-clamp-1 font-semibold">{{title}}</strong>
    <p class=" text-mono-700">{{ content }}</p>
  </div>
  </div>
</template>

<script setup lang="ts">
 const {title,content,link,category} = defineProps({
  title:String,
  content: String,
  link: String,
  category: String,
 })
</script>

<style ></style>
