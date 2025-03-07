<script setup lang="ts">
  const emit = defineEmits<{
    (event: 'share'): void;
  }>();

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('URL이 복사되었습니다!');
      emit('share');
    } catch (error) {
      console.error('URL 복사 실패:', error);
    }
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
