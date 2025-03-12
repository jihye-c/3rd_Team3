<script setup lang="ts">
  import {onMounted, ref} from 'vue';
  import BannerComponent from '@/components/BannerComponent.vue';
  import {useRoute, useRouter} from 'vue-router';
  import type {Post} from '@/types/PostResponse';
  import {programmersApiInstance} from '@/utils/axiosInstance';
  import {useAuthStore} from '@/stores/auth';
  import {useCommentStore} from '@/stores/commentStore';
  // import { toggleScrap, getUserScrapList } from '@/apis/userService';
  // import { useCommunityStore } from '@/stores/communityStore';
  import BookmarkButton from '@/components/BookmarkButton.vue';
  import ShareButton from '@/components/ShareButton.vue';
  import LikeButton from '@/components/LikeButton.vue';
  import TextAlertButton from '@/components/TextAlertButton.vue';

  const communityChannels = {
    question: {
      name: '질문 게시판',
      title: '질문 상세',
      subtitle: '궁금한 건 무엇이든 질문하고, 함께 해결해요',
    },
    recipe: {
      name: '나만의 레시피',
      title: '나만의 레시피 상세',
      subtitle: '이웃과 함께 나누는 나만의 레시피 이야기',
    },
    review: {
      name: '동네 리뷰',
      title: '동네 리뷰 상세',
      subtitle: '이웃 주민과 동네의 소식을 공유해보세요',
    },
  };

  const route = useRoute();
  const router = useRouter();
  const CommunityType = route.params.type;
  const postId = route.params.id;
  const userId = ref(localStorage.getItem("userId") || "");
  const authStore = useAuthStore();
  const commentStore = useCommentStore();
  // const communityStore = useCommunityStore();

  // const comments = ref([
  //   {author: '도형', content: '정말 흥미로운 주제네요!', date: '2025.02'},
  //   {author: '현서', content: '좋은 정보 감사합니다.', date: '2025.02'},
  // ]);

  // const isLoggedIn = ref(true); // 로그인 여부 체크 (예제)
  // const newComment = ref('');

  const postData = ref<Post | null>();
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const comment = ref('');
  const isBookmarked = ref(false);

  const toggleBookmark = () => {
    isBookmarked.value = !isBookmarked.value;
  };

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

// 스크랩 상태 확인 함수
// const checkIfBookmarked = async () => {
//   const userId = localStorage.getItem("userId");
//   if (!userId) return;

//   const scrapList = await getUserScrapList(userId);
//   isBookmarked.value = scrapList.some((scrap) => scrap._id === postId);
// };

// 스크랩 추가/삭제 기능
// const handleScrapToggle = async () => {
//   if (!userId.value) {
//     alert("로그인이 필요합니다.");
//     router.push("/auth");
//     return;
//   }

//   try {
//     console.log("스크랩 토글 요청:", postData.value);

//     if (!postData.value) return;

//     // title이 JSON이 아니라면 변환
//     let postTitle = postData.value.title;
//     try {
//       postTitle = typeof postData.value.title === "string" ? JSON.parse(postData.value.title) : postData.value.title;
//     } catch (error) {
//       console.warn("⚠️ postTitle JSON 변환 오류:", postData.value.title, error);
//       postTitle = { title: postData.value.title, content: "" }; // 기본 값 설정
//     }

//     // 새로운 북마크 데이터 생성
//     const newBookmark = {
//       content_id: postData.value._id,
//       title: postTitle.title,
//       content: postTitle.content || "",
//       image: postData.value.image || "/images/default-image.jpg",
//       channel: postData.value.channel.name,
//       createdAt: postData.value.createdAt,
//     };

//     // 스크랩 저장 (서버에 요청)
//     const updatedScraps = await toggleScrap(userId.value, newBookmark);

//     // 최신 스크랩 목록 업데이트
//     communityStore.bookmarkedPosts = updatedScraps;
//     isBookmarked.value = !isBookmarked.value;

//     console.log("스크랩 업데이트 완료!");
//   } catch (error) {
//     console.error("스크랩 토글 실패:", error);
//   }
// };



  onMounted(async () => {
    // api 호출
    try {
      isLoading.value = true;
      // post 데이터 불러오기
      const response = await programmersApiInstance.get(`/posts/${postId}`);
      postData.value = response.data;
      // console.log(postData.value);
      await checkIfBookmarked();
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
    :title="communityChannels[CommunityType as keyof typeof communityChannels].title"
    :subtitle="communityChannels[CommunityType as keyof typeof communityChannels].subtitle"
    :breadcrumbs="[
      {title: '홈', href: '/'},
      {title: '커뮤니티'},
      {
        title: communityChannels[CommunityType as keyof typeof communityChannels].name,
        href: `/community/${CommunityType}`,
      },
      {title: '상세 페이지'},
    ]"
    ><img src="/images/community/community_question.svg" alt="illustration" class="h-full" />
  </BannerComponent>
  <div class="w-full flex justify-center pt-16">
    <div class="flex gap-8 max-w-[1600px] w-full px-6">
      <!-- 좌측 버튼 -->
      <div class="flex flex-col gap-4 w-[52px]">
        <LikeButton :is-liked="false" />
        <TextAlertButton :commentleng="commentStore.comments.length" />
        <BookmarkButton :is-bookmarked="isBookmarked" @toggle="handleScrapToggle" />
        <ShareButton />
      </div>

      <!-- 게시물 상세 -->
      <div v-if="postData" class="flex-1 max-w-[1054px] mx-auto px-8">
        <!-- 목록 보기 버튼 -->
        <v-btn
          prepend-icon="mdi-chevron-left"
          flat
          color="#f89a00"
          rounded="lg"
          class="custom mb-10 cursor-pointer"
          @click="router.push(`/community/${CommunityType}`)"
        >
          목록보기</v-btn
        >
        <!-- 게시물 제목 -->
        <h1 class="text-[48px] font-bold text-mono-900">
          {{ JSON.parse(postData.title).title }}
        </h1>

        <!-- 작성자 정보 -->
        <div class="flex items-center gap-4 mt-4">
          <v-avatar
          @click="router.push(`/mypage/${postData.author._id}`)"
            :image="
              postData.author.image
                ? postData.author.image
                : '/images/mypage/mypage_default_img.png'
            "
            size="30"
          ></v-avatar>
          <p class="text-[16px] text-mono-600">
            {{ JSON.parse(postData.author.fullName).nickname }}
          </p>
          <p class="text-[16px] text-mono-600">
            {{ new Date(postData.createdAt).toLocaleString() }}
          </p>
          <div
            v-for="tag in JSON.parse(postData.title).tags"
            class="text-[18px] text-mono-600 leading-[20px] bg-mono-200 self-start py-1 px-3 rounded-[4px]"
          >
            {{ tag }}
          </div>
        </div>

        <!-- 가로선 -->
        <div class="w-full h-[2px] bg-mono-200 my-6"></div>

        <!-- 게시물 내용 -->
        <div v-if="postData.image" class="w-full h-[500px] overflow-hidden rounded-2xl mb-6">
          <img :src="postData.image" alt="img" class="w-full h-full object-cover" />
        </div>
        <p class="content-text text-[20px] text-mono-700 leading-8">
          {{ JSON.parse(postData.title).content }}
        </p>

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
            class="min-h-22 w-[900px] my-4 mx-7"
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
            <button
              @click="submitComment"
              class="bg-main-400 py-2 px-6 mr-4 rounded-lg text-mono-050"
            >
              작성하기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .content-text {
    white-space: pre-line;
  }
  .custom :deep(.v-btn__content) {
    color: var(--color-mono-050);
  }
  .custom :deep(.v-btn__prepend) {
    color: var(--color-mono-050);
  }
</style>
