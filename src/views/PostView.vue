<script setup lang="ts">
  import {
    QUESTION_CHANNEL_ID,
    RECIPE_CHANNEL_ID,
    RESALE_CHANNEL_ID,
    REVIEW_CHANNEL_ID,
  } from '@/constants/channelId';
  import {ref, onMounted, nextTick, computed, watch} from 'vue';

  interface Channel {
    name: string;
    id: string;
    type: string;
  }

  const channels: Channel[] = [
    {name: '질문게시판', type: 'question', id: QUESTION_CHANNEL_ID},
    {name: '동네리뷰', type: 'review', id: REVIEW_CHANNEL_ID},
    {name: '나만의 레시피', type: 'recipe', id: RECIPE_CHANNEL_ID},
    {name: '중고거래', type: 'resale', id: RESALE_CHANNEL_ID},
  ];

  const tags: Record<string, string[]> = {
    question: ['병원', '청약', '레시피', '문화생활', '자취꿀팁'],
    review: ['맛집', '생활편의', '교통', '주거', '문화'],
    recipe: ['밥', '반찬', '국', '후식', '일품'],
  };

  const selectedChannelId = ref<string | null>(REVIEW_CHANNEL_ID);
  const selectedImage = ref<string | null>(null);
  const title = ref('');
  const content = ref('');
  const selectedTag = ref('');
  const price = ref();

  const selectedChannel = computed(() => channels.find((c) => c.id === selectedChannelId.value));
  const availableTags = computed(() =>
    selectedChannel.value ? tags[selectedChannel.value.type] || [] : [],
  );

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

  // 채널이 바뀌면 이전 태그값 없애주기
  watch(selectedChannelId, () => {
    selectedTag.value = '';
  });

  // 페이지가 로드되면 기본 높이 조정
  onMounted(() => {
    nextTick(adjustTextareaHeight);
  });
</script>

<template>
  <div class="w-full flex flex-col items-center pt-40 pb-12">
    <!-- 페이지 제목 -->
    <h1 class="text-[48px] font-medium text-mono-900">글 작성하기</h1>

    <!-- 채널 선택 -->
    <div class="mt-8 w-full max-w-[1000px] flex flex-col gap-4">
      <h2 class="text-[28px] font-medium text-mono-900">게시판 선택하기</h2>
      <v-select
        variant="outlined"
        v-model="selectedChannelId"
        :items="channels"
        item-title="name"
        item-value="id"
        rounded="lg"
        class="custom-select w-1/2 text-[20px]"
      >
      </v-select>
    </div>

    <div class="mt-8 w-full max-w-[1000px]">
      <!-- 가격 선택 -->
      <div v-if="selectedChannelId === RESALE_CHANNEL_ID" class="flex flex-col gap-4">
        <h2 class="text-[28px] font-medium text-mono-900">가격</h2>
        <input
          v-model="price"
          type="number"
          maxlength="20"
          placeholder="가격을 입력하세요"
          class="h-[56px] p-4 border-1 border-mono-300 rounded-lg w-full text-[20px]"
        />
      </div>
      <!-- 태그 선택 -->
      <div v-else class="flex flex-col gap-4">
        <h2 class="text-[28px] font-medium text-mono-900">태그</h2>
        <div class="flex gap-4 flex-wrap">
          <label
            v-for="tag in availableTags"
            :key="tag"
            class="px-4 py-1 text-[20px] border-1 rounded-lg cursor-pointer"
            :class="
              selectedTag === tag ? 'bg-main-300 text-white' : 'border-mono-300 text-mono-900'
            "
          >
            <input type="radio" v-model="selectedTag" :value="tag" class="hidden" />
            {{ tag }}
          </label>
        </div>
      </div>
    </div>

    <!-- 제목 입력 -->
    <div class="mt-8 w-full max-w-[1000px] flex flex-col gap-4">
      <h2 class="text-[28px] font-medium text-mono-900">제목</h2>
      <input
        v-model="title"
        type="text"
        maxlength="20"
        placeholder="제목을 작성해주세요 (최대 20자)"
        class="h-[56px] p-4 border-1 border-mono-300 rounded-lg w-full text-[20px]"
      />
    </div>

    <!-- 내용 입력 -->
    <div class="mt-8 w-full max-w-[1000px] flex flex-col gap-4">
      <h2 class="text-[28px] font-medium text-mono-900">내용</h2>
      <textarea
        v-model="content"
        ref="contentTextarea"
        placeholder="내용을 입력해주세요"
        class="p-4 border-1 border-mono-300 rounded-lg w-full text-[20px] resize-none overflow-hidden"
        @input="adjustTextareaHeight"
      ></textarea>
    </div>

    <!-- 이미지 업로드 -->
    <div class="mt-8 w-full max-w-[1000px] flex flex-col gap-4">
      <h2 class="text-[28px] font-medium text-mono-900">이미지 선택하기</h2>
      <label
        class="w-full h-[400px] flex items-center justify-center border-1 border-mono-300 rounded-lg cursor-pointer"
      >
        <input type="file" class="hidden" @change="handleImageUpload" />
        <img
          v-if="selectedImage"
          :src="selectedImage"
          width="100px"
          alt="Uploaded Image"
          class="w-full h-full object-cover object-center rounded-lg"
        />

        <v-icon v-else size="80">mdi-image-search-outline</v-icon>
      </label>
    </div>

    <!-- 저장 버튼 -->
    <button class="mt-10 px-8 py-2 bg-main-400 text-mono-050 text-[20px] font-semibold rounded-lg">
      저장하기
    </button>
  </div>
</template>

<style scoped>
  :deep(.v-icon) {
    color: var(--color-mono-400);
  }
</style>
