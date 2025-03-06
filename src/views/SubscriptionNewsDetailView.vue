<script setup lang="ts">
  import {ref, onMounted} from 'vue';
  import {useRoute} from 'vue-router';
  import axios from 'axios';
  import BannerComponent from '@/components/BannerComponent.vue';
  import BookmarkButton from '@/components/BookmarkButton.vue';
  import ShareButton from '@/components/ShareButton.vue';

  // Swiper 관련 라이브러리
  import {Swiper, SwiperSlide} from 'swiper/vue';
  import 'swiper/css';
  import 'swiper/css/navigation';
  import {FreeMode, Navigation} from 'swiper/modules';

  const modules = [FreeMode, Navigation];
  const currentRoute = useRoute();

  // API에서 가져온 데이터 저장
  const postData = ref({
    title: '',
    date: '',
    images: [] as string[],
  });

  // 북마크 상태 관리
  const isBookmarked = ref(false);
  const toggleBookmark = () => {
    isBookmarked.value = !isBookmarked.value;
  };

  // 댓글 관리
  const comment = ref('');
  const submitComment = () => {
    alert('작성된 댓글: ' + comment.value);
    comment.value = '';
  };

  // API에서 특정 게시글 데이터 가져오기
  const fetchPostDetail = async () => {
    try {
      const postId = currentRoute.params.id;
      const response = await axios.get(`http://13.125.143.126:5003/posts/${postId}`);
      const post = response.data;

      // title 필드 JSON 파싱
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
    } catch (error) {
      console.error('게시글 데이터 불러오기 실패:', error);
    }
  };

  // 컴포넌트 마운트 시 API 호출
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
        <!-- 스크랩, 공유 버튼 -->
        <BookmarkButton :is-bookmarked="isBookmarked" @toggle="toggleBookmark" />
        <ShareButton />
      </div>

      <section class="w-270">
        <div class="font-bold text-5xl mb-2">{{ postData.title }}</div>
        <div class="text-mono-500">{{ postData.date }}</div>

        <!-- Swiper에 API에서 가져온 이미지 적용 -->
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

        <div class="flex justify-between">
          <div class="mr-10">
            <div class="text-mono-400">이전 글</div>
            <div class="w-125 text-xl overflow-hidden whitespace-nowrap text-ellipsis">
              제목제목제목
            </div>
          </div>
          <div class="border-1 border-mono-200"></div>
          <div class="text-right ml-10">
            <div class="text-mono-400">다음 글</div>
            <div class="w-125 text-xl overflow-hidden whitespace-nowrap text-ellipsis">
              가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사
            </div>
          </div>
        </div>

        <div class="flex font-medium text-[32px] pt-6 mt-6 mb-8 border-t-1 border-mono-200">
          <div class="mr-4">댓글</div>
          <div class="text-main-400">N</div>
          <div>개</div>
        </div>

        <div class="flex flex-col gap-6 py-4 border-b-1 border-mono-200 text-mono-500">
          <div class="flex items-center">
            <v-avatar
              size="24px"
              image="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201608/04/htm_2016080484837486184.jpg"
              class="mr-2"
            ></v-avatar>
            <div class="text-lg">닉네임</div>
          </div>
          <div>
            정말로 심금을 울리는 입숨로렘이었습니다. 정말로 심금을 울리는 입숨로렘이었습니다. 정말로
            심금을 울리는 입숨로렘이었습니다. 정말로 심금을 울리는 입숨로렘이었습니다.
          </div>
          <div>2025.02</div>
        </div>

        <div class="my-12 min-h-43 border-1 border-mono-200 rounded-lg">
          <textarea
            v-model="comment"
            class="min-h-22 w-256 my-4 mx-7"
            placeholder="댓글을 작성해보세요!"
          ></textarea>
          <div class="h-13 border-t-1 border-mono-200 flex items-center justify-end">
            <button
              @click="submitComment"
              class="bg-main-400 py-2 px-6 mr-4 rounded-lg text-mono-050"
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
