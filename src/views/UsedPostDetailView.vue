<script setup lang="ts">
  import {onMounted, ref} from 'vue';
  import BannerComponent from '@/components/BannerComponent.vue';
  import {useRoute, useRouter} from 'vue-router';
  import type {Post} from '@/types/PostResponse';
  import {programmersApiInstance} from '@/utils/axiosInstance';

  // const postTitle = ref('게시글 제목');
  // const author = ref('자취생A');
  // const postDate = ref('0000년 00월 00일');
  // const postPrice = ref('20,000원');
  // const postContent = ref(
  //   `Lorem ipsum dolor sit amet consectetur. Sit odio id proin libero potenti cras. Sed est tristique nunc pulvinar scelerisque fermentum. Donec egestas vitae accumsan diam faucibus volutpat tortor urna erat.`,
  // );
  // const postImage = ref('/images/post/sample.png'); // 예제 이미지

  const route = useRoute();
  const router = useRouter();
  const PostId = route.params.id;

  const comments = ref([
    {author: '현서', content: '정말 좋은 정보네요!', date: '2025.02'},
    {author: '도형', content: '구매하고 싶어요!', date: '2025.02'},
  ]);

  const isLoggedIn = ref(true);
  const newComment = ref('');

  const postData = ref<Post | null>();
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  onMounted(async () => {
    // api 호출
    try {
      isLoading.value = true;
      // post 데이터 불러오기
      const response = await programmersApiInstance.get(`/posts/${PostId}`);
      postData.value = response.data;
      // console.log(postData.value);
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
    <div class="mt-12">
      <p class="text-[20px] font-semibold text-mono-900">댓글 {{ comments.length }}개</p>
      <div class="mt-6 space-y-6">
        <div v-for="(comment, index) in comments" :key="index" class="flex gap-4">
          <img
            src="/images/post/default.png"
            alt="Profile"
            class="w-[24px] h-[24px] rounded-full"
          />
          <div>
            <p class="text-[18px] text-mono-900">{{ comment.author }}</p>
            <p class="text-[16px] text-mono-600">{{ comment.content }}</p>
            <p class="text-[16px] text-mono-400 mt-1">{{ comment.date }}</p>
          </div>
        </div>
      </div>

      <!-- 댓글 입력 -->
      <div class="mt-8 p-4 bg-gray-100 rounded-lg">
        <textarea
          class="w-full h-[80px] p-2 border border-mono-300 rounded-lg"
          v-model="newComment"
          placeholder="댓글을 작성해보세요!"
        ></textarea>
        <button class="mt-4 w-full py-2 bg-main-400 text-mono-050 font-semibold rounded-lg">
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
