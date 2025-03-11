<script setup lang="ts">
  interface Props {
    isLiked: boolean;
  }

  const props = defineProps<Props>();

  const emit = defineEmits<{
    (event: 'toggle'): void;
  }>();

  const toggleLike = () => {
    emit('toggle');
  };
</script>

<template>
  <div>
    <v-btn
      variant="outlined"
      block
      height="52"
      @click="toggleLike"
      :style="{borderColor: 'var(--color-mono-300)'}"
    >
      <v-icon size="30" :class="isLiked ? 'liked' : 'unliked'">{{
        props.isLiked ? 'mdi-thumb-up' : 'mdi-thumb-up-outline'
      }}</v-icon>
    </v-btn>
  </div>
</template>

<style scoped>
  :deep(.liked) {
    color: var(--color-main-400);
  }

  :deep(.unliked) {
    color: var(--color-mono-400);
  }
</style>
