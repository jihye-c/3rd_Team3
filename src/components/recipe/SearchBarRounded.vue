<script setup lang="ts">
  import {ref} from 'vue';

  interface Props {
    modelValue?: string | string[];
    long?: boolean;
  }
  const props = defineProps<Props>();

  // 이벤트 정의
  const emit = defineEmits(['update:modelValue']);

  // 검색어
  const searchText = ref<string>('');

  // ✅ 입력값을 업데이트하는 a함수
  const updateValue = () => {
    const trimmedValue = searchText.value.trim();
    // modelValue가 `string`이면 새로운 값으로 변경
    if (typeof props.modelValue === 'string') {
      emit('update:modelValue', trimmedValue);
    }
    // modelValue가 `string[]`이면 배열에 추가
    else if (Array.isArray(props.modelValue)) {
      // 값 입력 없으면 return
      if (!trimmedValue) return;
      // 이미 있는 값이라면 추가 X
      if (props.modelValue.includes(trimmedValue)) {
        searchText.value = ''; // 입력값 초기화
        return;
      }
      emit('update:modelValue', [...props.modelValue, trimmedValue]);
      searchText.value = ''; // 입력값 초기화
    }
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
      @keyup.enter="updateValue"
      :class="
        long
          ? 'w-[900px] placeholder:text-[20px] text-[20px]'
          : 'w-[200px] placeholder:text-[18px] text-[18px]'
      "
      class="outline-none text-mono-700"
    />
    <button @click="updateValue">
      <v-icon :size="long ? '40px' : '24px'">mdi-magnify</v-icon>
    </button>
  </div>
</template>

<style scoped>
  :deep(.v-icon) {
    color: #79716b;
  }
</style>
