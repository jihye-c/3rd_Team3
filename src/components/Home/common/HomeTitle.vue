<template>
  <div>
    <div class="text-5xl text-mono-800 font-light flex gap-3 py-2 ft-point">
    <p>{{ title }}</p>
    <span class="cursor-pointer"><v-icon size="40px">mdi-arrow-right-drop-circle</v-icon></span>
    </div>
    <div>{{ content }}</div>
  </div>
</template>

<script setup lang="ts">
  const {title, content} = defineProps({
    title: String,
    content:String,
    link: String
  })
</script>

<style scoped>

</style>
