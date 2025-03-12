<script setup lang="ts">
import {useRouter } from 'vue-router';
  const router = useRouter()
  const {src, alt, caption, link} = defineProps({
    src: String,
    alt: String,
    caption: String,
    link:String,
  });
  function handleLink() {
    if(link){
    router.push(link);
    }
  }
</script>

<template>
  <button
    class="w-[94px] h-[94px] bg-[#fff] hover:bg-main-300 transition-all border-main-400 border-1 rounded-lg flex flex-col justify-center items-center gap-1"
    @click.prevent="handleLink"
  >
    <img :src="src" :alt="alt" />
    <p>{{ caption }}</p>
  </button>
</template>

<style scoped></style>
