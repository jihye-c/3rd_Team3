<script setup lang="ts">
import { ref, computed } from 'vue';

interface Props {
  totalPages: number;
}

const props = defineProps<Props>();
const currentPage = ref(1);

const getPageRange = computed(() => {
  if (props.totalPages <= 5) {
    return Array.from({ length: props.totalPages }, (_, index) => index + 1);
  } else {
    if (currentPage.value <= 3) {
      return [1, 2, 3, 4, 5];
    } else if (currentPage.value >= props.totalPages - 2) {
      return [props.totalPages - 4, props.totalPages - 3, props.totalPages - 2, props.totalPages - 1, props.totalPages];
    } else {
      return [currentPage.value - 2, currentPage.value - 1, currentPage.value, currentPage.value + 1, currentPage.value + 2];
    }
  }
});

const emit = defineEmits(['pageChange']);

const changePage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    currentPage.value = page;
    emit('pageChange', page);
  }
};
</script>

<template>
  <div class="flex justify-center items-center space-x-2 mt-10">
    <!-- 이전 페이지 버튼 -->
    <button
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-3 py-1 border border-mono-300 rounded-md text-mono-900"
      :class="{ 'text-mono-400 cursor-not-allowed': currentPage === 1 }"
    >
      &lt;
    </button>

    <!-- 페이지 번호 버튼들 -->
    <button
      v-for="pageNum in getPageRange" :key="pageNum"
      @click="changePage(pageNum)"
      class="px-3 py-1 border border-mono-300 rounded-md"
      :class="{ 'bg-main-400 text-white': currentPage === pageNum, 'text-mono-900': currentPage !== pageNum }"
    >
      {{ pageNum }}
    </button>

    <!-- 다음 페이지 버튼 -->
    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === props.totalPages"
      class="px-3 py-1 border border-mono-300 rounded-md text-mono-900"
      :class="{ 'text-mono-400 cursor-not-allowed': currentPage === props.totalPages }"
    >
      &gt;
    </button>
  </div>
</template>
