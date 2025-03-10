<script setup lang="ts">
  import {DotLottieVue} from '@lottiefiles/dotlottie-vue';
</script>

<template>
  <div>
    <DotLottieVue class="lottie" autoplay loop src="/animation/noData.json" />
    <p class="text-xl text-mono-400 text-center z-10 relative -mt-4">검색 결과가 없습니다.</p>
  </div>
</template>

<style scoped>
  .lottie {
    transform: scale(2) !important;
    transform-origin: center center;
  }
</style>
