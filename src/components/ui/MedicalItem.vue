
<script setup lang="ts">
  const {src,alt,caption} = defineProps({
    src: String,
    alt: String,
    caption: String
  })
</script>

<template>
  <div class="w-[94px] h-[94px] bg-[#fff] border-main-400 border-1 rounded-lg flex flex-col justify-center items-center gap-1">
    <img :src="src" :alt="alt">
    <p>{{ caption }}</p>
  </div>
</template>


<style scoped>

</style>
