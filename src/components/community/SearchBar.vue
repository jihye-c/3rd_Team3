<script setup lang="ts">
  import {ref, watch} from 'vue';

  const props = defineProps({
    searchCriteria: {
      type: String,
      default: '제목',
    },
    searchQuery: {
      type: String,
      default: '',
    },
    // input의 너비 (searchbar 전체 너비 아님 주의!!)
    width: {
      type: Number,
      required: false,
    },
  });

  const emit = defineEmits(['update:searchCriteria', 'update:searchQuery', 'search']);

  const localSearchCriteria = ref(props.searchCriteria);
  const localSearchQuery = ref(props.searchQuery);

  // 컴포넌트 내부 값이 변경될 때 부모에게 알림
  watch(localSearchCriteria, (newVal) => {
    emit('update:searchCriteria', newVal);
  });

  watch(localSearchQuery, (newVal) => {
    emit('update:searchQuery', newVal);
  });

  // 검색 버튼 클릭 또는 엔터키 입력시 검색 이벤트 발생
  const handleSearch = () => {
    emit('search', {
      criteria: localSearchCriteria.value,
      query: localSearchQuery.value,
    });
    alert('click');
  };
</script>

<template>
  <div class="flex border-1 border-mono-300 rounded-[8px] h-[40px] mb-6 justify-center">
    <v-select
      v-model="localSearchCriteria"
      :items="['제목', '본문']"
      class="flat"
      label="검색기준"
      variant="outlined"
      width="100"
      rounded="lg"
      density="compact"
    />
    <v-divider vertical></v-divider>
    <div class="flex justify-center items-center pr-4">
      <input
        type="text"
        name="search"
        v-model="localSearchQuery"
        placeholder="검색어를 입력하세요"
        class="outline-0 pl-4 text-[18px]"
        :style="{width: width ? width + 'px' : '1000px'}"
        @keyup.enter="handleSearch"
      />
      <v-icon @click="handleSearch">mdi-magnify</v-icon>
    </div>
  </div>
</template>

<style scoped>
  :deep(.v-divider) {
    background-color: var(--color-mono-200);
    opacity: 1;
  }
  :deep(.v-icon) {
    color: var(--color-mono-500);
  }
  :deep(.flat .v-field__outline) {
    display: none;
  }
</style>
