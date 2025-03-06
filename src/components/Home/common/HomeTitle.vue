<template>
  <div>
    <div class="text-5xl text-mono-800 font-light flex gap-3 py-2 ft-point">
    <p>{{ title }}</p>
    <RouterLink :to="link">
    <span class="cursor-pointer"><v-icon size="40px">mdi-arrow-right-drop-circle</v-icon></span>
  </RouterLink>
    </div>
    <div>{{ content }}</div>
  </div>
</template>

<script setup lang="ts">
  const {title, content,link} = defineProps({
    title: String,
    content:String,
    link: {
      default:'/',
      type: String
    }
  })
</script>

<style scoped>

</style>
