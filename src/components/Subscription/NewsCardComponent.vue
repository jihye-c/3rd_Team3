<script setup lang="ts">
  // prop 정의
  interface SubscriptionCardData {
    imageURL: string;
    title: string;
    date: string;
  }

  const props = defineProps<{card: SubscriptionCardData}>();
</script>

<template>
  <div class="border border-mono-200 w-95 h-99 rounded-2xl overflow-hidden">
    <div class="h-64 overflow-hidden">
      <img :src="props.card.imageURL" alt="" class="w-full object-cover" />
    </div>
    <div class="w-85 m-5">
      <div class="text-xl font-bold overflow-hidden whitespace-nowrap text-ellipsis">
        {{ card.title }}
      </div>
      <div class="text-sm text-mono-400">{{ props.card.date }}</div>
    </div>
    <div class="bg-mono-200 h-10 rounded-lg mx-5 flex justify-center items-center">
      <RouterLink to="/" class="font-bold text-mono-400"> 더 알아보기 </RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
