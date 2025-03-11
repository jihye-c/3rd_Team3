<script setup lang="ts">
  import {
    QUESTION_CHANNEL_ID,
    RECIPE_CHANNEL_ID,
    RESALE_CHANNEL_ID,
    REVIEW_CHANNEL_ID,
  } from '@/constants/channelId';
  import {useAuthStore} from '@/stores/auth';
  import {useUserStore} from '@/stores/userStore';
  import {programmersApiInstance} from '@/utils/axiosInstance';
  import {ref, onMounted, nextTick, computed, watch} from 'vue';
  import {useRoute, useRouter} from 'vue-router';
  import districtData from '@/assets/data/district.json';

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

  const route = useRoute();
  const router = useRouter();

  // 토큰 가져오기
  const authStore = useAuthStore();
  const {token} = authStore;

  // 지역 가져오기
  const userStore = useUserStore();
  const {userLocation} = userStore;

  const paramType = ref(route.params.type);
  const defaultChannel = channels.find((c) => c.type === paramType.value)?.id || REVIEW_CHANNEL_ID;
  const selectedChannelId = ref<string>(defaultChannel);
  const selectedTags = ref<string[]>([]);
  const price = ref<number>();
  const title = ref<string>('');
  const content = ref<string>('');
  const selectedImage = ref<File | null>(null);
  const imagePreview = ref<string | null>(null);

  const selectedChannel = computed(() => channels.find((c) => c.id === selectedChannelId.value));
  const availableTags = computed(() =>
    selectedChannel.value ? tags[selectedChannel.value.type] || [] : [],
  );

  // 지역 선택 관련
  const GuList = Object.keys(districtData);
  const selectedGu = ref<string>(userLocation?.address || '강남구');

  type DistrictKeys = keyof typeof districtData;
  const dongList = computed(() => districtData[selectedGu.value as DistrictKeys]);
  const selectedDong = ref<string>(dongList.value[0]);
  watch(selectedGu, () => {
    selectedDong.value = dongList.value[0];
  });

  const handleImageUpload = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      selectedImage.value = file; // 실제 파일 저장
      imagePreview.value = URL.createObjectURL(file); // 미리 보기용 URL 생성
    }
  };

  const contentTextarea = ref<HTMLTextAreaElement | null>(null);

  const adjustTextareaHeight = () => {
    if (contentTextarea.value) {
      contentTextarea.value.style.height = 'auto'; // 높이 초기화
      contentTextarea.value.style.height = contentTextarea.value.scrollHeight + 'px'; // 내용에 맞게 조절
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append(
        'title',
        JSON.stringify({
          title: title.value,
          content: content.value,
          tags: selectedTags.value,
          price: price.value,
          available: true,
          region: {gu: selectedGu.value, dong: selectedDong.value},
        }),
      );

      if (selectedImage.value) {
        formData.append('image', selectedImage.value);
      }

      formData.append('channelId', selectedChannelId.value);

      const response = await programmersApiInstance.post('/posts/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200 || response.status === 201) {
        alert('작성 성공!');
        router.replace(`/community/${selectedChannel.value?.type}`);
      }
    } catch (error) {
      console.error('게시글 생성 중 오류가 발생했습니다.', error);
    }
  };

  // 채널이 바뀌면 이전 태그값 없애주기
  watch(selectedChannelId, () => {
    selectedTags.value = [];
  });

  // 페이지가 로드되면 기본 높이 조정
  onMounted(() => {
    nextTick(adjustTextareaHeight);
  });
</script>

<template>
  <div id="communityCreateContent" class="w-full flex flex-col items-center pt-40 pb-12">
    <!-- 페이지 제목 -->
    <h1 class="text-[48px] font-medium text-mono-900">글 작성하기</h1>
    <form class="w-full flex flex-col items-center" @submit.prevent="handleSubmit">
      <!-- 지역 선택 -->
      <div class="mt-8 w-full flex flex-col gap-4 max-w-[1000px]">
        <h2 class="text-[28px] font-medium text-mono-900">지역 선택하기</h2>
        <div class="flex gap-5 w-[500px]">
          <v-select
            variant="outlined"
            v-model="selectedGu"
            :items="GuList"
            item-title="name"
            item-value="id"
            rounded="lg"
            class="custom-select w-[200px] text-[20px]"
          >
          </v-select>
          <v-select
            variant="outlined"
            v-model="selectedDong"
            :items="dongList"
            item-title="name"
            item-value="id"
            rounded="lg"
            class="custom-select w-[200px] text-[20px]"
          >
          </v-select>
        </div>
      </div>
      <!-- 채널 선택 -->
      <div class="mt-8 w-full flex flex-col gap-4 max-w-[1000px]">
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
            required
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
                selectedTags.includes(tag)
                  ? 'bg-main-300 text-white'
                  : 'border-mono-300 text-mono-900'
              "
            >
              <input type="checkbox" v-model="selectedTags" :value="tag" class="hidden" />
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
          required
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
          required
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
            v-if="imagePreview"
            :src="imagePreview"
            width="100px"
            alt="Uploaded Image"
            class="w-full h-full object-cover object-center rounded-lg"
          />

          <v-icon v-else size="80">mdi-image-search-outline</v-icon>
        </label>
      </div>

      <!-- 저장 버튼 -->
      <button
        class="mt-10 px-8 py-2 bg-main-400 text-mono-050 text-[20px] font-semibold rounded-lg"
      >
        저장하기
      </button>
    </form>
  </div>
</template>

<style scoped>
  :deep(.v-icon) {
    color: var(--color-mono-400);
  }
</style>
