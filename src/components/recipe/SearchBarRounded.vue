<script setup lang="ts">
  import {ref} from 'vue';

  interface Props {
    long?: boolean;
  }
  const props = defineProps<Props>();

  // 검색어
  const searchText = ref<string>('');

  // 이벤트 정의
  const emit = defineEmits(['search']);

  const handleClick = () => {
    emit('search', searchText.value);
  };
</script>

<template>
  <div
    :class="long ? 'bg-mono-050 w-[1060px] px-[30px] py-[12px]' : 'bg-mono-100 px-[20px] py-[10px]'"
    class="rounded-[100px] flex items-center justify-between"
  >
    <input
      type="text"
      placeholder="검색어를 입력하세요"
      v-model="searchText"
      @keyup.enter="handleClick"
      :class="
        long
          ? 'w-[900px] placeholder:text-[20px] text-[20px]'
          : 'w-[200px] placeholder:text-[18px] text-[18px]'
      "
      class="outline-none text-mono-700"
    />
    <button @click="handleClick">
      <v-icon :size="long ? '40px' : '24px'">mdi-magnify</v-icon>
    </button>
  </div>
</template>

<style scoped>
  :deep(.v-icon) {
    color: #79716b;
  }
</style>
