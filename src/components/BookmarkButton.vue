<script setup lang="ts">
  interface Props {
    isBookmarked: boolean;
    small?: boolean;
    class?: string | string[];
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
  <div>
    <v-btn
      :variant="props.small ? 'text' : 'outlined'"
      :block="!props.small"
      :height="props.small ? '32' : '52'"
      @click="toggleBookmark"
      :style="{
        borderColor: 'var(--color-mono-300)',
        width: props.small ? '32px' : 'auto',
        minWidth: props.small ? '32px' : 'auto',
        padding: props.small ? '0' : 'auto',
      }"
    >
      <v-icon size="30" :class="isBookmarked ? 'bookmarked' : 'unbookmarked'">{{
        props.isBookmarked ? 'mdi-bookmark' : 'mdi-bookmark-outline'
      }}</v-icon>
    </v-btn>
  </div>
</template>

<style scoped>
  :deep(.bookmarked) {
    color: var(--color-main-400);
  }

  :deep(.unbookmarked) {
    color: var(--color-mono-400);
  }
</style>
