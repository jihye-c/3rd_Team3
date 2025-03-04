<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import HeaderComponent from '@/components/HeaderComponent.vue';
</script>

<template>
  <div class="w-full h-full relative">
    <HeaderComponent background-opacity />
    <RouterView />
  </div>
</template>

<style scoped>
/* 여기에 스타일 추가 가능 */
</style>
