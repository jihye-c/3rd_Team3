<script setup lang="ts">
  const props = defineProps<{commentleng: number}>();
</script>

<template>
  <v-btn
    variant="outlined"
    block
    height="52"
    :style="{borderColor: 'var(--color-mono-300)'}"
    class="relative"
  >
    <v-icon size="24">mdi-message-text-outline</v-icon>
    <div
      class="absolute flex size-5 rounded-2xl bg-main-400 right-[-10px] top-[-10px] justify-center items-center text-mono-050"
    >
      {{ props.commentleng }}
    </div>
  </v-btn>
</template>

<style scoped>
  :deep(.v-icon) {
    color: var(--color-mono-400);
  }
</style>
