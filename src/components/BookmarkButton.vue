<script setup lang="ts">
  interface Props {
    isBookmarked: boolean;
  }

  const props = defineProps<Props>();

  const emit = defineEmits<{
    (event: 'toggle'): void;
  }>();

  const toggleBookmark = () => {
    emit('toggle');
  };
</script>

<template>
  <v-btn
    variant="outlined"
    block
    height="52"
    @click="toggleBookmark"
    :style="{borderColor: 'var(--color-mono-300)'}"
  >
    <v-icon size="30" :class="isBookmarked ? 'bookmarked' : 'unbookmarked'">{{
      props.isBookmarked ? 'mdi-bookmark' : 'mdi-bookmark-outline'
    }}</v-icon>
  </v-btn>
</template>

<style scoped>
  :deep(.bookmarked) {
    color: var(--color-main-400);
  }

  :deep(.unbookmarked) {
    color: var(--color-mono-400);
  }
</style>
