<script setup lang="ts">
  import {RouterView} from 'vue-router';
  import HeaderComponent from '@/components/HeaderComponent.vue';
</script>

<template>
  <div class="tw:w-full">
    <HeaderComponent />
    <RouterView />
  </div>
</template>
