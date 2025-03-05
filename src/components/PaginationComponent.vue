<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  totalPages: number;
  currentPage: number; // ✅ 부모에서 현재 페이지를 받음
}

const props = defineProps<Props>();
const emit = defineEmits(["pageChange"]);

// ✅ 현재 페이지가 변경될 때, 페이지네이션 버튼 범위 업데이트
const getPageRange = computed(() => {
  if (props.totalPages <= 5) {
    return Array.from({ length: props.totalPages }, (_, index) => index + 1);
  } else {
    if (props.currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    } else if (props.currentPage >= props.totalPages - 2) {
      return [
        props.totalPages - 4,
        props.totalPages - 3,
        props.totalPages - 2,
        props.totalPages - 1,
        props.totalPages,
      ];
    } else {
      return [
        props.currentPage - 2,
        props.currentPage - 1,
        props.currentPage,
        props.currentPage + 1,
        props.currentPage + 2,
      ];
    }
  }
});

// ✅ 부모(`CultureView.vue`)에 변경된 페이지 값 전달
const changePage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit("pageChange", page); // ✅ 부모 컴포넌트에 변경된 페이지 전달
  }
};
</script>

<template>
  <div class="flex justify-center items-center space-x-2 mt-10">
    <!-- 이전 페이지 버튼 -->
    <button
      @click="changePage(props.currentPage - 1)"
      :disabled="props.currentPage === 1"
      class="px-3 py-1 border border-mono-300 rounded-md text-mono-900"
      :class="{ 'text-mono-400 cursor-not-allowed': props.currentPage === 1 }"
    >
      &lt;
    </button>

    <!-- 페이지 번호 버튼들 -->
    <button
      v-for="pageNum in getPageRange"
      :key="pageNum"
      @click="changePage(pageNum)"
      class="px-3 py-1 border border-mono-300 rounded-md"
      :class="{ 'bg-main-400 text-white': props.currentPage === pageNum, 'text-mono-900': props.currentPage !== pageNum }"
    >
      {{ pageNum }}
    </button>

    <!-- 다음 페이지 버튼 -->
    <button
      @click="changePage(props.currentPage + 1)"
      :disabled="props.currentPage === props.totalPages"
      class="px-3 py-1 border border-mono-300 rounded-md text-mono-900"
      :class="{ 'text-mono-400 cursor-not-allowed': props.currentPage === props.totalPages }"
    >
      &gt;
    </button>
  </div>
</template>

