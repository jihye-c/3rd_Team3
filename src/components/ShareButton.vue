<script setup lang="ts">
  const emit = defineEmits<{
    (event: 'share'): void;
  }>();

  const handleClick = () => {
    emit('share');
  };
</script>

<template>
  <v-btn
    variant="outlined"
    block
    height="52"
    @click="handleClick"
    :style="{borderColor: 'var(--color-mono-300)'}"
  >
    <v-icon size="24">mdi-share-variant</v-icon>
  </v-btn>
</template>

<style scoped>
  :deep(.v-icon) {
    color: var(--color-mono-400);
  }
</style>
