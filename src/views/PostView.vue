<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';

const selectedImage = ref<string | null>(null);
const title = ref('');
const content = ref('');
const selectedTag = ref('');

const tags = ['병원', '청약', '태그종류1', '태그종류2', '태그종류3'];

const handleImageUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    selectedImage.value = URL.createObjectURL(file);
  }
};

const contentTextarea = ref<HTMLTextAreaElement | null>(null);

const adjustTextareaHeight = () => {
  if (contentTextarea.value) {
    contentTextarea.value.style.height = 'auto'; // 높이 초기화
    contentTextarea.value.style.height = contentTextarea.value.scrollHeight + 'px'; // 내용에 맞게 조절
  }
};


// 페이지가 로드되면 기본 높이 조정
onMounted(() => {
  nextTick(adjustTextareaHeight);
});
</script>

<template>
  <div class="w-full flex flex-col items-center pt-40 pb-12">
    <!-- 페이지 제목 -->
    <h1 class="text-[48px] font-medium text-mono-900">글 작성하기</h1>
    
    <!-- 이미지 업로드 -->
    <div class="mt-8 w-full max-w-[1000px] flex flex-col gap-4">
      <h2 class="text-[28px] font-medium text-mono-900">이미지 선택하기</h2>
      <label class="w-[96px] h-[96px] flex items-center justify-center border border-mono-300 rounded-lg cursor-pointer">
        <input type="file" class="hidden" @change="handleImageUpload" />
        <img v-if="selectedImage" :src="selectedImage" alt="Uploaded Image" class="w-full h-full object-cover rounded-lg" />
        <img v-else src="/images/imageUpload.png" alt="Upload" class="w-[40px] h-[40px]" />
      </label>
    </div>
    
    <!-- 태그 선택 -->
    <div class="mt-8 w-full max-w-[1000px] flex flex-col gap-4">
      <h2 class="text-[28px] font-regular text-mono-900">태그</h2>
      <div class="flex gap-2 flex-wrap">
        <button
          v-for="tag in tags"
          :key="tag"
          @click="selectedTag = tag"
          class="px-4 py-2 text-[20px] border rounded-lg"
          :class="selectedTag === tag ? 'bg-main-300 text-white' : 'border-mono-300 text-mono-900'"
        >
          {{ tag }}
        </button>
      </div>
    </div>

    <!-- 제목 입력 -->
    <div class="mt-8 w-full max-w-[1000px] flex flex-col gap-4">
      <h2 class="text-[28px] font-regular text-mono-900">제목</h2>
      <input
        v-model="title"
        type="text"
        maxlength="20"
        placeholder="제목을 작성해주세요 (최대 20자)"
        class="p-4 border border-mono-300 rounded-lg w-full text-[20px]"
      />
    </div>
    
    <!-- 내용 입력 -->
    <div class="mt-8 w-full max-w-[1000px] flex flex-col gap-4">
      <h2 class="text-[28px] font-regular text-mono-900">내용</h2>
      <textarea
        v-model="content"
        ref="contentTextarea"
        placeholder="내용을 입력해주세요"
        class="p-4 border border-mono-300 rounded-lg w-full text-[20px] resize-none overflow-hidden"
        @input="adjustTextareaHeight"
      ></textarea>
    </div>
    
    <!-- 저장 버튼 -->
    <button class="mt-10 px-8 py-4 bg-main-400 text-mono-050 text-[20px] font-semibold rounded-lg">
      저장하기
    </button>
  </div>
</template>

<style scoped></style>
