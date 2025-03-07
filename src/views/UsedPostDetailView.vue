<script setup lang="ts">
  import {onMounted, ref} from 'vue';
  import BannerComponent from '@/components/BannerComponent.vue';
  import {useRoute, useRouter} from 'vue-router';
  import type {Post} from '@/types/PostResponse';
  import {programmersApiInstance} from '@/utils/axiosInstance';
  import {useAuthStore} from '@/stores/auth';
  import {useCommentStore} from '@/stores/commentStore';

  const route = useRoute();
  const router = useRouter();
  const postId = route.params.id;

  const authStore = useAuthStore();
  const commentStore = useCommentStore();

  const postData = ref<Post | null>();
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const comment = ref('');

  const submitComment = async () => {
    if (!authStore.isAuthenticated) {
      alert('로그인이 필요합니다.');
      router.push('/auth');
      return;
    }

    try {
      await commentStore.addComment(comment.value, route.params.id as string);
      comment.value = '';
    } catch (error) {
      console.error('Failed to submit comment:', error);
    }
  };
  onMounted(async () => {
    // api 호출
    try {
      isLoading.value = true;
      // post 데이터 불러오기
      const response = await programmersApiInstance.get(`/posts/${postId}`);
      postData.value = response.data;
      // console.log(postData.value);
      await commentStore.fetchComments(postId as string);
    } catch (err) {
      error.value = '데이터를 불러오는 중 오류가 발생했습니다.';
    } finally {
      isLoading.value = false;
    }
  });
</script>

<template>
  <!-- 배너 -->
  <BannerComponent
    background="#f89a00"
    title="중고 거래 상세"
    subtitle="우리 동네 사람들과 믿을 수 있는 중고거래를 시작하세요"
    :breadcrumbs="[{title: '홈', href: '/'}, {title: '커뮤니티'}, {title: '중고거래'}]"
    ><img
      src="/images/community/community_resale_illustration.svg"
      alt="illustration"
      class="h-full"
    />
  </BannerComponent>

  <div class="w-full flex justify-center pt-16">
    <div class="flex gap-8 max-w-[1600px] w-full px-6">
      <!-- 좌측 버튼 -->
      <div class="flex flex-col gap-4">
        <button
          class="w-[52px] h-[52px] flex items-center justify-center border border-mono-200 rounded-lg"
        >
          <img src="/images/post/like.png" alt="Like" class="w-[20px] h-[20px]" />
        </button>
        <button
          class="w-[52px] h-[52px] flex items-center justify-center border border-mono-200 rounded-lg"
        >
          <img src="/images/post/comment.png" alt="Comment" class="w-[20px] h-[20px]" />
        </button>
        <button
          class="w-[52px] h-[52px] flex items-center justify-center border border-mono-200 rounded-lg"
        >
          <img src="/images/post/scrap.png" alt="Scrap" class="w-[20px] h-[20px]" />
        </button>
        <button
          class="w-[52px] h-[52px] flex items-center justify-center border border-mono-200 rounded-lg"
        >
          <img src="/images/post/share.png" alt="Share" class="w-[20px] h-[20px]" />
        </button>
      </div>

      <!-- 게시물 상세 (이미지 + 정보) -->
      <div
        v-if="postData"
        class="flex-1 max-w-[1054px] mx-auto flex gap-8 justify-center lg:-translate-x-[40px] md:-translate-x-[30px] sm:-translate-x-[20px]"
      >
        <!-- 좌측 이미지 -->
        <div class="w-[496px] h-[496px] overflow-hidden rounded-lg bg-gray-200">
          <img :src="postData.image" alt="Product Image" class="w-full h-full object-cover" />
        </div>

        <!-- 우측 게시글 정보 -->
        <div class="flex-1 flex flex-col justify-between">
          <div>
            <h1 class="text-[40px] font-bold text-mono-900">
              {{ JSON.parse(postData.title).title }}
            </h1>
            <div class="flex items-center gap-4 mt-2">
              <v-avatar
                :image="
                  postData.author.image
                    ? postData.author.image
                    : '/images/mypage/mypage_default_img.png'
                "
                size="28"
              ></v-avatar>
              <p class="text-[16px] text-mono-600">
                {{ JSON.parse(postData.author.fullName).nickname }}
              </p>
              <p class="text-[16px] text-mono-600">
                {{ new Date(postData.createdAt).toLocaleString() }}
              </p>
            </div>
            <p class="text-[32px] font-bold text-mono-900 mt-8">
              {{ Number(JSON.parse(postData.title).price).toLocaleString() }}원
            </p>
            <p class="content-text text-[18px] text-mono-700 leading-7 mt-5">
              {{ JSON.parse(postData.title).content }}
            </p>
          </div>
          <button
            class="w-full py-3 bg-main-400 text-mono-050 text-lg font-semibold rounded-lg mt-6"
          >
            채팅 보내기
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- 게시물 상세 이후의 컨텐츠를 감싸는 부모 div 추가 -->
  <div class="max-w-[1054px] mx-auto">
    <!-- 가로선 -->
    <div class="w-full h-[2px] bg-mono-200 my-6"></div>

    <!-- 댓글 섹션 -->
    <div class="flex font-medium text-[32px] pt-6 mt-6 mb-8">
      <div class="mr-4">댓글</div>
      <div class="text-main-400">{{ commentStore.comments.length }}</div>
      <div>개</div>
    </div>

    <div
      v-for="(comment, index) in commentStore.comments"
      :key="index"
      class="flex flex-col gap-6 py-4 border-b-1 border-mono-200 text-mono-500"
    >
      <div class="flex items-center">
        <v-avatar
          size="24px"
          :image="comment.author.image || '/images/mypage/mypage_default_img.png'"
          class="mr-2"
        ></v-avatar>
        <div class="text-lg">{{ JSON.parse(comment.author.fullName).nickname }}</div>
      </div>
      <div>{{ comment.comment }}</div>
      <div>
        {{
          new Date(comment.createdAt).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        }}
      </div>
    </div>
    <div class="my-12 min-h-43 border-1 border-mono-200 rounded-lg">
      <textarea
        v-if="authStore.isAuthenticated"
        v-model="comment"
        class="min-h-22 w-[990px] my-4 mx-7"
        placeholder="댓글을 작성해보세요!"
      ></textarea>
      <div
        v-else
        class="min-h-22 w-256 my-4 mx-7 cursor-pointer text-mono-500"
        @click="router.push('/auth')"
      >
        <div class="flex">
          <div class="font-bold text-main-400">로그인 후&nbsp;</div>
          <div>댓글을 작성해보세요!</div>
        </div>
      </div>
      <div class="h-13 border-t-1 border-mono-200 flex items-center justify-end">
        <button @click="submitComment" class="bg-main-400 py-2 px-6 mr-4 rounded-lg text-mono-050">
          작성하기
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .content-text {
    white-space: pre-line;
  }
</style>
