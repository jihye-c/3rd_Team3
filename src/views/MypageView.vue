<script setup lang="ts">
import { ref, computed } from 'vue';
import RecipeCard from '@/components/community/RecipeCard.vue';
import ResaleCard from '@/components/community/ResaleCard.vue';
import CommunityPostList from '@/components/community/CommunityPostList.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';

const profileImage = ref<string | null>(null);
const nickname = ref('도형');
const userId = ref('lee123so');
const followers = ref(125);
const following = ref(125);
const isEditing = ref(false); // 자기소개 편집 모드 여부
const bio = ref(
  `안녕하세요! 🏡 자취 3년 차, 이제는 라면 하나도 예술처럼 끓이는 자취생입니다. 
🍜 서울에서 혼자 살면서 요리, 청소, 생활 꿀팁을 공유하는 걸 좋아해요! 
여러분과 자취 생활 꿀팁을 나누고 함께 성장하고 싶어요 😊 잘 부탁드립니다!`
);

const selectedTab = ref('동네리뷰'); // 기본 탭
const currentPage = ref(1);
const itemsPerPage = 12;

const handleImageUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    profileImage.value = URL.createObjectURL(file);
  }
};

const toggleEdit = () => {
  isEditing.value = !isEditing.value;
};

// 🔹 동네 리뷰 게시글 데이터
const communityPostList = ref([
  {
    image: '/recipe/recipe_popular2.webp',
    title: '자취생이 가볍게 즐길 수 있는 문화생활 뭐가 있을까요?',
    content: '자취를 시작하고 나서 주말마다 너무 심심해요...',
    dong: '신림동',
    tags: ['문화생활', '취미'],
    bookmarks: 5,
    comments: 4,
  },
  {
    image: '/recipe/recipe_popular3.webp',
    title: '집 근처 조용한 카페 추천해주세요!',
    content: '집에서 공부하려니 너무 집중이 안 되네요...',
    dong: '강남구',
    tags: ['카페', '스터디'],
    bookmarks: 3,
    comments: 2,
  },
  {
    title: '맛있는 배달 음식 추천 좀 해주세요!',
    content: '매번 똑같은 배달음식만 먹어서 새로운 거...',
    dong: '홍대',
    tags: ['배달음식', '맛집'],
    bookmarks: 7,
    comments: 5,
  },
  {
    title: '맛있는 배달 음식 추천 좀 해주세요!',
    content: '매번 똑같은 배달음식만 먹어서 새로운 거...',
    dong: '홍대',
    tags: ['배달음식', '맛집'],
    bookmarks: 7,
    comments: 5,
  },
  {
    title: '맛있는 배달 음식 추천 좀 해주세요!',
    content: '매번 똑같은 배달음식만 먹어서 새로운 거...',
    dong: '홍대',
    tags: ['배달음식', '맛집'],
    bookmarks: 7,
    comments: 5,
  },
  {
    title: '맛있는 배달 음식 추천 좀 해주세요!',
    content: '매번 똑같은 배달음식만 먹어서 새로운 거...',
    dong: '홍대',
    tags: ['배달음식', '맛집'],
    bookmarks: 7,
    comments: 5,
  },
]);

const postList = [
  {
    image: '/images/community/community_resale_dummy.jpg',
    title: '상태 좋은 의자 판매합니다.',
    price: '50000',
    dong: '수유1동',
    available: true,
  },
  {
    image: '/images/community/community_resale_dummy.jpg',
    title: '상태 좋은 의자 판매합니다.',
    price: '50000',
    dong: '수유1동',
    available: true,
  },
  {
    image: '/images/community/community_resale_dummy.jpg',
    title: '상태 좋은 의자 판매합니다.',
    price: '50000',
    dong: '수유1동',
    available: false,
  },
  {
    image: '/images/community/community_resale_dummy.jpg',
    title: '상태 좋은 의자 판매합니다.',
    price: '50000',
    dong: '수유1동',
    available: true,
  },
  {
    image: '/images/community/community_resale_dummy.jpg',
    title: '상태 좋은 의자 판매합니다.',
    price: '50000',
    dong: '수유1동',
    available: true,
  },
  {
    image: '/images/community/community_resale_dummy.jpg',
    title: '상태 좋은 의자 판매합니다.',
    price: '50000',
    dong: '수유1동',
    available: true,
  },
  {
    image: '/images/community/community_resale_dummy.jpg',
    title: '상태 좋은 의자 판매합니다.',
    price: '50000',
    dong: '수유1동',
    available: true,
  },
];

const recipeList = [
  { name: '저염된장 삼치구이', image: '/recipe/recipe_popular1.webp', author: { profileImg: '/images/user1.png', name: '자취생A' }, tag: '한식' },
  { name: '참나물 소보로 덮밥', image: '/recipe/recipe_popular2.webp', author: { profileImg: '/images/user2.png', name: '자취생B' }, tag: '덮밥' },
  { name: '코코넛워터 토마토카레', image: '/recipe/recipe_popular3.webp', author: { profileImg: '/images/user3.png', name: '자취생C' }, tag: '퓨전' },
  { name: '저염된장 삼치구이', image: '/recipe/recipe_popular1.webp', author: { profileImg: '/images/user1.png', name: '자취생A' }, tag: '한식' },
  { name: '참나물 소보로 덮밥', image: '/recipe/recipe_popular2.webp', author: { profileImg: '/images/user2.png', name: '자취생B' }, tag: '덮밥' },
  { name: '코코넛워터 토마토카레', image: '/recipe/recipe_popular3.webp', author: { profileImg: '/images/user3.png', name: '자취생C' }, tag: '퓨전' },
];

// 현재 페이지에 맞게 데이터 필터링
const paginatedRecipes = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return recipeList.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => Math.ceil(recipeList.length / itemsPerPage));

const handlePageChange = (page: number) => {
  currentPage.value = page;
};
</script>



<template>
  <div class="w-full pt-24">
    <div class="max-w-[1600px] mx-auto mt-4">
      <!-- 내 정보 박스 -->
      <div class="w-full bg-white shadow-lg rounded-lg p-6 flex items-center justify-between relative">
        <!-- 프로필 이미지 & 유저 정보 -->
        <div class="flex items-center gap-6">
          <div class="relative w-[280px] h-[280px] rounded-full overflow-hidden bg-gray-200 border border-mono-200">
            <input 
              type="file" 
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
              @change="handleImageUpload" 
            />
            <img 
              v-if="profileImage" 
              :src="profileImage" 
              alt="Profile" 
              class="w-full h-full object-cover" 
            />
          </div>
          <div>
            <p class="text-[28px] font-medium text-mono-900">{{ nickname }}님 안녕하세요</p>
            <p class="text-[16px] text-mono-600">{{ userId }}</p>
            <div class="flex items-center gap-4 mt-2 py-2 w-[280px] h-[48px]">
              <span class="text-mono-900 font-medium">{{ followers }} 팔로워</span>
              <span class="text-mono-900 font-medium">{{ following }} 팔로잉</span>
            </div>
            <!-- 자기 소개 -->
            <div class="mt-4 w-full">
              <textarea 
                v-if="isEditing"
                v-model="bio"
                class="p-2 border border-mono-300 rounded-lg w-full h-[100px]"
                placeholder="자기소개를 입력하세요."
              />
              <p v-else class="text-mono-600 text-[16px]">{{ bio }}</p>
            </div>
          </div>
        </div>

        <!-- 수정 & 알림 버튼 -->
        <div class="absolute top-6 right-6 flex gap-4">
          <button @click="toggleEdit" class="w-[20px] h-[20px]">
            <img v-if="!isEditing" src="/images/mypage/edit.png" alt="Edit" class="w-full h-full object-contain" />
            <img v-else src="/images/mypage/edit.png" alt="Save" class="w-full h-full object-contain" />
          </button>
          <button class="w-[20px] h-[20px]">
            <img src="/images/mypage/alert.png" alt="Alert" class="w-full h-full object-contain" />
          </button>
        </div>
      </div>

      <!-- 나의 스크랩 -->
      <div class="mt-12">
        <h2 class="text-[32px] font-semibold text-mono-900">나의 스크랩</h2>

        <!-- 탭 -->
        <div class="flex border-b border-mono-200 mt-6">
          <button
            v-for="tab in ['동네리뷰', '중고거래', '질문게시판', '나만의 레시피']"
            :key="tab"
            @click="selectedTab = tab"
            class="px-6 py-3 text-[20px] font-medium text-mono-600 transition-colors duration-200"
            :class="selectedTab === tab ? 'border-b-4 border-main-400 text-mono-900' : ''"
          >
            {{ tab }}
          </button>
        </div>

        <!-- 탭 컨텐츠 -->
        <div class="mt-6">
          <!-- 동네 리뷰 탭 -->
          <div v-if="selectedTab === '동네리뷰'" class="grid grid-cols-2 gap-6">
            <CommunityPostList
              v-for="(post, index) in communityPostList"
              :key="index"
              :title="post.title"
              :content="post.content"
              :dong="post.dong"
              :tags="post.tags"
              :bookmarks="post.bookmarks"
              :comments="post.comments"
              :image="post.image"
              class="w-full"
            />
          </div>
          <div v-if="selectedTab === '중고거래'" class="grid grid-cols-4 gap-6">
            <ResaleCard
              v-for="(post, index) in postList"
              :key="index"
              :title="post.title"
              :image="post.image"
              :price="post.price"
              :dong="post.dong"
              :available="post.available"
            />
          </div>
          <div v-if="selectedTab === '질문게시판'" class="grid grid-cols-2 gap-6">
            <CommunityPostList
              v-for="(post, index) in communityPostList"
              :key="index"
              :title="post.title"
              :content="post.content"
              :dong="post.dong"
              :tags="post.tags"
              :bookmarks="post.bookmarks"
              :comments="post.comments"
              :image="post.image"
              class="w-full"
            />
          </div>
          <!-- "나만의 레시피" 탭 - 카드 리스트 -->
          <div v-if="selectedTab === '나만의 레시피'" class="grid grid-cols-4 gap-6">
            <RecipeCard
              v-for="(recipe, index) in paginatedRecipes"
              :key="index"
              :title="recipe.name"
              :image="recipe.image"
              :author="recipe.author"
              :tag="recipe.tag"
            />
          </div>

          <!-- 페이지네이션 추가 -->
          <PaginationComponent :totalPages="totalPages" @pageChange="handlePageChange" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
