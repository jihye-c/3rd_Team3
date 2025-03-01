<script setup lang="ts">
  interface Props {
    image: string;
    label: string;
    isActive: boolean;
  }
  defineProps<Props>();
</script>

<template>
  <div class="flex flex-col gap-1.5 items-center">
    <div
      :class="isActive ? 'bg-main-50' : 'bg-mono-100'"
      class="w-[80px] h-[80px] rounded-[999px] p-2.5 flex justify-center"
    >
      <img :src="image" alt="icon" />
    </div>
    <div :class="isActive ? 'text-main-400' : 'text-mono-500'" class="text-[16px] font-semibold">
      {{ label }}
    </div>
  </div>
</template>
