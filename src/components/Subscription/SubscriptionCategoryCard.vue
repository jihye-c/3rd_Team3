<script setup lang="ts">
  // prop 정의
  interface CategoryCardData {
    sort: string;
    image: string;
    category: string;
  }

  const props = defineProps<{card: CategoryCardData}>();
</script>

<template>
  <RouterLink :to="`/subscription/calendar?sort=${props.card.sort}`">
    <div class="w-[247px] h-[287px]">
      <div class="size-[247px] rounded-2xl overflow-hidden">
        <img :src="props.card.image" alt="" />
      </div>
      <div class="font-semibold text-2xl pt-2">{{ props.card.category }}</div>
    </div>
  </RouterLink>
</template>

<style scoped></style>
