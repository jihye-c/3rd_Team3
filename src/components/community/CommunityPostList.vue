<script setup lang="ts">
  interface Props {
    image?: string;
    title: string;
    content: string;
    dong: string;
    tags: string[];
    bookmarks: number;
    comments: number;
  }
  defineProps<Props>();
</script>

<template>
  <div class="flex gap-10 py-[40px]">
    <div class="flex flex-col gap-10">
      <div class="flex flex-col gap-4">
        <div class="text-[28px] text-mono-700 font-bold">
          {{ title }}
        </div>
        <div class="text-[24px] text-mono-500 line-clamp-1">
          {{ content }}
        </div>
        <div class="flex gap-4">
          <div class="text-[24px] text-mono-400">{{ dong }}</div>
          <div class="flex gap-4">
            <template v-for="tag in tags">
              <div
                class="text-[18px] text-mono-600 leading-[20px] bg-mono-200 self-start py-1 px-3 rounded-[4px]"
              >
                {{ tag }}
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="flex gap-6">
        <div class="flex gap-2 justify-center items-center">
          <v-icon size="28">mdi-bookmark-outline</v-icon>
          <div class="text-[24px] text-mono-400">{{ bookmarks }}개</div>
        </div>
        <div class="flex gap-2 justify-center items-center">
          <v-icon size="28">mdi-comment-text-outline</v-icon>
          <div class="text-[24px] text-mono-400">{{ comments }}개</div>
        </div>
      </div>
    </div>
    <div v-if="image" class="w-[200px] h-[200px] overflow-hidden shrink-0 rounded-[12px]">
      <img :src="image" alt="reviewImg" class="w-full h-full object-cover object-center" />
    </div>
  </div>
</template>

<style scoped>
  :deep(.v-icon) {
    color: var(--color-mono-400);
  }
</style>
