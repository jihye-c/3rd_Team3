<script setup lang="ts">
  import {ref, onMounted} from 'vue';
  import {useRoute, useRouter} from 'vue-router';
  import {useAuthStore} from '@/stores/auth';
  import {useCommentStore} from '@/stores/commentStore';
  import axios from 'axios';
  import BannerComponent from '@/components/BannerComponent.vue';
  import BookmarkButton from '@/components/BookmarkButton.vue';
  import ShareButton from '@/components/ShareButton.vue';
  import {Swiper, SwiperSlide} from 'swiper/vue';
  import 'swiper/css';
  import 'swiper/css/navigation';
  import {FreeMode, Navigation} from 'swiper/modules';
  import TextAlertButton from '@/components/TextAlertButton.vue';
  import LikeButton from '@/components/LikeButton.vue';

  const modules = [FreeMode, Navigation];
  const currentRoute = useRoute();
  const router = useRouter();
  const authStore = useAuthStore();
  const commentStore = useCommentStore();

  interface PostData {
    title: string;
    date: string;
    images: string[];
  }

  const postData = ref<PostData>({
    title: '',
    date: '',
    images: [],
  });

  const isBookmarked = ref(false);
  const isLiked = ref(false);

  const comment = ref('');

  const toggleBookmark = () => {
    isBookmarked.value = !isBookmarked.value;
  };

  const toggleLike = () => {
    isLiked.value = !isLiked.value;
  };

  const submitComment = async () => {
    if (!authStore.isAuthenticated) {
      alert('로그인이 필요합니다.');
      router.push('/auth');
      return;
    }

    try {
      await commentStore.addComment(comment.value, currentRoute.params.id as string);
      comment.value = '';
    } catch (error) {
      console.error('Failed to submit comment:', error);
    }
  };

  const parseNickname = (fullName: string) => {
    try {
      const parsed = JSON.parse(fullName);
      return parsed.nickname || '';
    } catch (error) {
      console.error('Failed to parse fullName:', error);
      return fullName;
    }
  };

  const fetchPostDetail = async () => {
    try {
      const postId = currentRoute.params.id;
      const response = await axios.get(`http://13.125.143.126:5003/posts/${postId}`);
      const post = response.data;
      const parsedTitle = JSON.parse(post.title);
      postData.value = {
        title: parsedTitle.title,
        date: new Date(post.createdAt).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        images: parsedTitle.images || [],
      };
      await commentStore.fetchComments(postId as string);
    } catch (error) {
      console.error('게시글 데이터 불러오기 실패:', error);
    }
  };

  onMounted(fetchPostDetail);
</script>

<template>
  <BannerComponent
    background="/images/subscription/newsBanner.png"
    title="청약 뉴스와 함께하는 집 마련 여정"
    subtitle="청약 준비부터 당첨까지, 완벽 가이드"
    :breadcrumbs="[
      {title: '홈', href: '/'},
      {title: '청약', href: '/subscription'},
      {title: '카드 뉴스', href: '/subscription/news'},
      {title: '카드 뉴스 상세'},
    ]"
  />

  <div class="my-20">
    <div class="container flex gap-55">
      <div class="border-mono-200 w-[52px] h-[104px] flex flex-col gap-[12px]">
        <LikeButton :is-liked="isLiked" @toggle="toggleLike" />
        <TextAlertButton :commentleng="commentStore.comments.length" />
        <BookmarkButton :is-bookmarked="isBookmarked" @toggle="toggleBookmark" />
        <ShareButton />
      </div>

      <section class="w-270">
        <RouterLink
          to="/subscription/news"
          class="inline-flex rounded-lg text-mono-050 bg-main-400 text-xl pr-4 pl-1 py-1 items-center mb-5"
        >
          <v-icon>mdi-chevron-left</v-icon>
          <div>목록 보기</div>
        </RouterLink>
        <div class="font-bold text-5xl mb-2">{{ postData.title }}</div>
        <div class="text-mono-500">{{ postData.date }}</div>

        <div class="border-y-1 border-mono-200 mt-10 mb-6 py-12">
          <Swiper
            :modules="modules"
            :navigation="true"
            :slidesPerView="'auto'"
            :spaceBetween="10"
            class="mySwiper"
          >
            <SwiperSlide v-for="(image, index) in postData.images" :key="index">
              <img :src="image" alt="뉴스 이미지" />
            </SwiperSlide>
          </Swiper>
        </div>

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
              image="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201608/04/htm_2016080484837486184.jpg"
              class="mr-2"
            ></v-avatar>
            <div class="text-lg">{{ parseNickname(comment.author.fullName) }}</div>
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
            class="min-h-22 w-256 my-4 mx-7"
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
              class="bg-main-400 py-2 px-6 mr-4 rounded-lg text-mono-050 cursor-pointer"
            >
              작성하기
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
  .swiper {
    width: 100%;
  }

  .swiper-slide {
    width: 90%;
  }
</style>
