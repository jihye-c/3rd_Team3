<script setup lang="ts">
import { ref } from 'vue';
import BannerComponent from '@/components/BannerComponent.vue';

const postTitle = ref('자취생이 가볍게 즐길 수 있는 문화생활?');
const author = ref('자취생 A');
const postDate = ref('2025년 03월 04일');
const postContent = ref(`Lorem ipsum dolor sit amet consectetur. Sit odio id proin libero potenti cras. Sed est tristique nunc pulvinar scelerisque fermentum. Donec egestas vitae accumsan diam faucibus volutpat tortor urna erat. Id pharetra aenean nibh et. Sit vitae pellentesque urna ornare sagittis phasellus imperdiet posuere consequat. Eu adipiscing tortor enim placerat integer scelerisque. Sed mattis etiam risus lacus cursus adipiscing.
Facilisis ipsum accumsan luctus sed fames eu. Nisl ac adipiscing morbi proin in turpis ac mauris. Orci imperdiet vel quam mattis ut. Augue feugiat molestie diam lectus ac. Posuere est pharetra lacus tortor est augue malesuada lorem donec. Elit odio ornare massa vestibulum luctus dui.
A semper et dignissim maecenas integer integer. Cras quis vitae neque sapien. Ultrices vitae nisi eu tristique gravida lobortis magna. Leo integer ullamcorper metus id eget et duis gravida. Netus habitasse ipsum tristique dolor arcu.
Nibh massa vulputate mattis morbi nibh sit gravida arcu. In justo egestas lacus sed. Vestibulum sed sed nec venenatis a eu. Turpis consequat placerat ultrices suscipit. Massa dui curabitur turpis at. Sociis cras egestas laoreet ut. Volutpat quam mus diam aliquet pharetra.
Interdum convallis at non ante et. Molestie nec eu habitant mi ut. Lobortis sed pellentesque urna suscipit sed. Integer nibh platea commodo a ut tellus. Mauris habitant elit vulputate vel et lectus velit mauris tellus. Justo dui amet in leo in. Eget eget sit pharetra est enim egestas. Tristique eget urna orci id.

Lorem ipsum dolor sit amet consectetur. Sit odio id proin libero potenti cras. Sed est tristique nunc pulvinar scelerisque fermentum. Donec egestas vitae accumsan diam faucibus volutpat tortor urna erat. Id pharetra aenean nibh et. Sit vitae pellentesque urna ornare sagittis phasellus imperdiet posuere consequat. Eu adipiscing tortor enim placerat integer scelerisque. Sed mattis etiam risus lacus cursus adipiscing.
Facilisis ipsum accumsan luctus sed fames eu. Nisl ac adipiscing morbi proin in turpis ac mauris. Orci imperdiet vel quam mattis ut. Augue feugiat molestie diam lectus ac. Posuere est pharetra lacus tortor est augue malesuada lorem donec. Elit odio ornare massa vestibulum luctus dui.

A semper et dignissim maecenas integer integer. Cras quis vitae neque sapien. Ultrices vitae nisi eu tristique gravida lobortis magna. Leo integer ullamcorper metus id eget et duis gravida. Netus habitasse ipsum tristique dolor arcu.
Nibh massa vulputate mattis morbi nibh sit gravida arcu. In justo egestas lacus sed. Vestibulum sed sed nec venenatis a eu. Turpis consequat placerat ultrices suscipit. Massa dui curabitur turpis at. Sociis cras egestas laoreet ut. Volutpat quam mus diam aliquet pharetra.
Interdum convallis at non ante et. Molestie nec eu habitant mi ut. Lobortis sed pellentesque urna suscipit sed. Integer nibh platea commodo a ut tellus. Mauris habitant elit vulputate vel et lectus velit mauris tellus. Justo dui amet in leo in. Eget eget sit pharetra est enim egestas. Tristique eget urna orci id.`);

const previousPost = ref({ title: '자취생의 레시피 고민', link: '#' });
const nextPost = ref({ title: '청약 정보 공유', link: '#' });

const comments = ref([
  { author: '도형', content: '정말 흥미로운 주제네요!', date: '2025.02' },
  { author: '현서', content: '좋은 정보 감사합니다.', date: '2025.02' }
]);

const isLoggedIn = ref(true); // 로그인 여부 체크 (예제)
const newComment = ref('');
</script>

<template>
  <!-- 배너 -->
  <BannerComponent
    background="#f89a00"
    title="질문 상세"
    subtitle="궁금한 건 무엇이든 질문하고, 함께 해결해요"
    :breadcrumbs="[{title: '홈', href: '/'}, {title: '커뮤니티'}, {title: '질문게시판'}]"
    ><img
      src="/images/community/community_question.svg"
      alt="illustration"
      class="h-full"
    />
  </BannerComponent>
  <div class="w-full flex justify-center pt-16">
    <div class="flex gap-8 max-w-[1600px] w-full px-6">
      <!-- 좌측 버튼 -->
      <div class="flex flex-col gap-4">
        <button class="w-[52px] h-[52px] flex items-center justify-center border border-mono-200 rounded-lg">
          <img src="/images/post/like.png" alt="Like" class="w-[20px] h-[20px]" />
        </button>
        <button class="w-[52px] h-[52px] flex items-center justify-center border border-mono-200 rounded-lg">
          <img src="/images/post/comment.png" alt="Comment" class="w-[20px] h-[20px]" />
        </button>
        <button class="w-[52px] h-[52px] flex items-center justify-center border border-mono-200 rounded-lg">
          <img src="/images/post/scrap.png" alt="Scrap" class="w-[20px] h-[20px]" />
        </button>
        <button class="w-[52px] h-[52px] flex items-center justify-center border border-mono-200 rounded-lg">
          <img src="/images/post/share.png" alt="Share" class="w-[20px] h-[20px]" />
        </button>
      </div>

      <!-- 게시물 상세 -->
      <div class="flex-1 max-w-[1054px] mx-auto px-8">
        <!-- 게시물 제목 -->
        <h1 class="text-[48px] font-bold text-mono-900">
          {{ postTitle }}
        </h1>

        <!-- 작성자 정보 -->
        <div class="flex items-center gap-4 mt-4">
          <img src="/images/post/default.png" alt="Profile" class="w-[40px] h-[40px] rounded-full" />
          <p class="text-[16px] text-mono-600">{{ author }} · {{ postDate }}</p>
        </div>

        <!-- 가로선 -->
        <div class="w-full h-[2px] bg-mono-200 my-6"></div>

        <!-- 게시물 내용 -->
        <p class="text-[20px] text-mono-700 leading-8">
          {{ postContent }}
        </p>

        <!-- 가로선 -->
        <div class="w-full h-[2px] bg-mono-200 my-6"></div>

        <!-- 이전글 & 다음글 -->
        <div class="w-full flex justify-between items-center bg-gray-100 p-4 rounded-lg">
          <div class="flex flex-col">
            <p class="text-[16px] font-medium text-mono-700">이전 글</p>
            <p class="text-[20px] text-mono-900">{{ previousPost.title }}</p>
          </div>
          <div class="flex flex-col text-right">
            <p class="text-[16px] font-medium text-mono-700">다음 글</p>
            <p class="text-[20px] text-mono-900">{{ nextPost.title }}</p>
          </div>
        </div>

        <div class="w-full h-[2px] bg-mono-200 my-6"></div>

        <!-- 댓글 개수 -->
        <p class="mt-8 text-[20px] font-semibold text-mono-900">댓글 {{ comments.length }}개</p>

        <!-- 댓글 리스트 -->
        <div class="mt-6 space-y-6">
          <div v-for="(comment, index) in comments" :key="index" class="flex gap-4">
            <img src="/images/post/default.png" alt="Profile" class="w-[24px] h-[24px] rounded-full" />
            <div>
              <p class="text-[18px] text-mono-900">{{ comment.author }}</p>
              <p class="text-[16px] text-mono-600">{{ comment.content }}</p>
              <p class="text-[16px] text-mono-400 mt-1">{{ comment.date }}</p>
            </div>
          </div>
        </div>

        <!-- 댓글 작성 -->
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
  </div>
</template>
