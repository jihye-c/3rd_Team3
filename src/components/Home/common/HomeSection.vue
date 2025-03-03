<template>
  <div
    :style="{
      opacity: isInView ? 1 : 0,
      transform: isInView ? 'none' : 'translateY(-100px)',
      transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s',
    }"
    ref="container"
    class="py-6"
  >
    <slot> </slot>
  </div>
</template>

<script setup lang="ts">
  import {ref} from 'vue';
  import {useInView} from 'motion-v';
  const container = ref<HTMLElement | null>(null);
  const isInView = useInView(container, {once: true});
</script>

<style scoped></style>
