<script setup lang="ts">

import { ref, computed, onMounted, watchEffect, watch } from 'vue';
import RecipeCard from '@/components/community/RecipeCard.vue';
import ResaleCard from '@/components/community/ResaleCard.vue';
import CommunityPostList from '@/components/community/CommunityPostList.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import { useUserStore } from '@/stores/userStore';
import {onBeforeRouteUpdate, useRoute, useRouter} from 'vue-router';
import Modal from '@/components/ModalComponent.vue';
import FollowComponent from '@/components/mypage/FollowComponent.vue';
import { useCultureStore } from "../stores/cultureStore";
// import { getUserScrapList, toggleScrap } from "@/apis/userService";
// import { useCommunityStore } from "@/stores/communityStore";
import BookmarkButton from '@/components/BookmarkButton.vue';

const route = useRoute<string>();
const showModal = ref(false);
const followCategory = ref();
const router = useRouter();
const userInfo = ref()
const userFollowerInfo = ref();
const userFollowingInfo = ref();
const defaultImage = '/images/mypage/mypage_default_img.png';
const cultureStore = useCultureStore()
const id = localStorage.getItem('userId');
const routeId =  route.params.id
const userStore = useUserStore()
// const communityStore = useCommunityStore();

const bio = ref(
  `안녕하세요! :house_with_garden: 자취 3년 차, 이제는 라면 하나도 예술처럼 끓이는 자취생입니다.
  안녕하세요! :house_with_garden: 자취 3년 차, 이제는 라면 하나도 예술처럼 끓이는 자취생입니다.
  안녕하세요! :house_with_garden: 자취 3년 차, 이제는 라면 하나도 예술처럼 끓이는 자취생입니다.
  안녕하세요! :house_with_garden: 자취 3년 차, 이제는 라면 하나도 예술처럼 끓이는 자취생입니다.
:ramen: `
);

const selectedTab = ref('동네리뷰'); // 기본 탭
const currentPage = ref(1);
const itemsPerPage = 12;

const subCategories = [
  { name: "문화관광축제", code: "A02070100" },
  { name: "일반축제", code: "A02070200" },
  { name: "전통공연", code: "A02080100" },
  { name: "연극", code: "A02080200" },
  { name: "뮤지컬", code: "A02080300" },
  { name: "오페라", code: "A02080400" },
  { name: "전시회", code: "A02080500" },
  { name: "박람회", code: "A02080600" },
  { name: "무용", code: "A02080800" },
  { name: "클래식음악회", code: "A02080900" },
  { name: "대중콘서트", code: "A02081000" },
  { name: "영화", code: "A02081100" },
  { name: "스포츠경기", code: "A02081200" },
  { name: "기타행사", code: "A02081300" },
];

const formatDate = (dateString: string) => {
  if (!dateString || dateString.length !== 8) return "날짜 미정"; // 예외 처리
  return `${dateString.substring(0, 4)}.${dateString.substring(4, 6)}.${dateString.substring(6, 8)}`;
};

// :small_blue_diamond: 동네 리뷰 게시글 데이터
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
const goToCultureDetail = (contentId) => {
  router.push(`/culture/${contentId}`);
};
const getCategoryName = (code: string) => {
  const category = subCategories.find((sub) => sub.code === code);
  return category ? category.name : "기타";
};

// 현재 페이지에 맞게 데이터 필터링
const paginatedRecipes = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return recipeList.slice(start, start + itemsPerPage);
});

const openModal = (category: string) => {
  showModal.value = true;
  followCategory.value = category;
};

const closeModal = () => {
  showModal.value = false;
  followCategory.value = '';
};

// const totalCulturePages = computed(() => {
//   console.log(":memo: 현재 스크랩된 문화생활 개수:", cultureStore.bookmarkedFestivals?.length);
//   return Math.ceil((cultureStore.bookmarkedFestivals?.length || 0) / itemsPerPage);
// });
const paginatedFestivals = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return (cultureStore.bookmarkedFestivals ?? []).slice(start, start + itemsPerPage);
});

const totalPages = computed(() => Math.ceil(recipeList.length / itemsPerPage));

const handlePageChange = (page: number) => {
  console.log(":pushpin: 페이지 변경 요청:", page);
  currentPage.value = page;
  console.log(":white_check_mark: 변경된 현재 페이지:", currentPage.value);
};

watchEffect(async () => {
  if (!id) return;

  await userStore.getUser(routeId);
  userInfo.value = userStore.userInfo;
  userFollowerInfo.value = userStore.followerInfo;
  userFollowingInfo.value = userStore.followingInfo;

  // const scrapList = await getUserScrapList(id);
  const hasChannel = (post: any): post is { channel: { name: string } } => {
  return post.channel && typeof post.channel.name === "string";
  };

  // communityStore.bookmarkedPosts = {
  //   recipeScraps: scrapList.filter(post => hasChannel(post) && post.channel.name === "recipe"),
  //   tradeScraps: scrapList.filter(post => hasChannel(post) && post.channel.name === "trade"),
  //   reviewScraps: scrapList.filter(post => hasChannel(post) && post.channel.name === "review"),
  //   QnAScraps: scrapList.filter(post => hasChannel(post) && post.channel.name === "QnA"),
  //   cultureScraps: scrapList.filter(post => hasChannel(post) && post.channel.name === "culture"),
  // };
});

// const handleScrapToggle = async (festival) => {
//   try {
//     const userId = localStorage.getItem("userId");
//     if (!userId) {
//       console.warn("로그인이 필요합니다.");
//       return;
//     }

//     console.log("마이페이지에서 북마크 추가/삭제 요청:", festival);

//     await toggleScrap(userId, festival);

//     // 최신 북마크 목록 다시 불러오기
//     const updatedScrapList = await getUserScrapList(userId);
//     cultureStore.bookmarkedFestivals = updatedScrapList.filter(post => post.channel?.name === "culture");

//     console.log("마이페이지 북마크 업데이트 완료!");
//   } catch (error) {
//     console.error("북마크 저장 실패:", error);
//   }
// };


onMounted(async () => {
  const userId = localStorage.getItem("userId");
  const profileId = route.params.id; // 방문한 유저의 ID

  if (profileId) {
    await userStore.getUser(profileId);
    userInfo.value = { ...userStore.userInfo };
    console.log("유저 정보 불러오기 완료:", userInfo.value);
  }

  if (userId) {
    // await communityStore.loadBookmarks(userId);
    // console.log("[유저별] 커뮤니티 북마크 목록 정리 완료:", communityStore.bookmarkedPosts);

    // const scrapList = await getUserScrapList(userId);
    // cultureStore.bookmarkedFestivals = scrapList.filter(post => post.channel?.name === "culture");
    // console.log("[유저별] 문화생활 북마크 불러오기 완료:", cultureStore.bookmarkedFestivals);
  }
});

const isBookmarked = (contentId) => {
  return cultureStore.bookmarkedFestivals.some(festival => festival.content_id === contentId);
};
</script>

<template>
  <div class="w-full container pt-24">
    <div class="mx-auto mt-4">
      <!-- 내 정보 박스 -->
      <div class="w-full bg-white rounded-lg p-6 flex items-center justify-between relative">
        <!-- 프로필 이미지 & 유저 정보 -->
        <div class="flex items-center gap-12">
          <div
            class="relative w-[300px] h-[300px] rounded-full overflow-hidden bg-gray-200 border border-mono-200"
          >
            <img
              :src="userInfo?.image ?? defaultImage"
              alt="Profile"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="w-[800px]">
            <p class="text-[28px] font-medium text-mono-900">
              {{ userInfo?.fullName.nickname }}님 안녕하세요
            </p>
            <p class="text-[16px] text-mono-600">{{ userInfo?.email }}</p>
            <div class="flex items-center gap-4 mt-2 py-2">
              <div
                @click="openModal('follower')"
                class="text-mono-900 font-medium flex items-center gap-2"
              >
                <span class="text-2xl">{{ userFollowerInfo?.length }}</span>
                <p class="text-mono-400 font-normal">팔로워</p>
              </div>
              <div
                @click="openModal('following')"
                class="text-mono-900 font-medium flex items-center gap-2"
              >
                <span class="text-2xl">{{ userFollowingInfo?.length }}</span>
                <p class="text-mono-400 font-normal">팔로잉</p>
              </div>
            </div>
            <!-- 자기 소개 -->
            <div class="mt-4 w-full">
              <p v-if="userInfo?.fullName.introduction" class="text-mono-600 text-wrap text-[16px]">{{ userInfo?.fullName.introduction }}</p>
              <p v-else class="text-mono-600 text-wrap text-[16px]">사용자의 소개가 아직 없습니다:)</p>

            </div>
          </div>
        </div>

        <!-- 수정 & 알림 버튼 -->
        <div v-if="routeId === id" class="absolute top-6 right-6 flex gap-4">
          <button @click="router.push('/mypage/user-update')" class="w-[20px] h-[20px]">
            <img src="/images/mypage/edit.png" alt="Edit" class="w-full h-full object-contain" />
          </button>
          <button class="w-[20px] h-[20px]">
            <img src="/images/mypage/alert.png" alt="Alert" class="w-full h-full object-contain" />
          </button>
        </div>
        <div v-else-if="!followCheck()" class="absolute top-6 right-6 flex gap-4">
          <button
          @click=" followHandeler"
            class="w-[120px] text-main-50 cursor-pointer hover:bg-main-400/80 bg-main-400 py-2 rounded-md"
          >
            <span class="text-md">팔로우</span>
          </button>
        </div>
        <div v-else class="absolute top-6 right-6 flex gap-4">
          <button
          @click=" deleteFollowHandeler"
            class="w-[120px] text-main-400 cursor-pointer hover:bg-main-400/80 border-main-400 border-1 py-2 rounded-md"
          >
            <span class="text-md">팔로우 취소</span>
          </button>
        </div>
      </div>

      <!-- 나의 스크랩 -->
      <div class="mt-12">

        <h2 class="text-[32px] font-semibold text-mono-900">나의 스크랩</h2>

        <!-- 기존 탭 -->
        <div class="flex border-b border-mono-200 mt-6">
          <button
            v-for="tab in ['동네리뷰', '중고거래', '질문게시판', '나만의 레시피', '문화생활']"
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
          <div class="mt-6">
            <!-- ✅ 문화생활 탭 추가 -->
            <div v-if="selectedTab === '문화생활'" class="grid grid-cols-3 gap-4 w-full">
              <div
                v-for="(festival, index) in paginatedFestivals"
                :key="index"
                class="p-4 rounded-lg shadow border border-mono-300 cursor-pointer"
                @click="goToCultureDetail(festival.content_id)"
              >
                <div class="flex justify-between items-center mb-4">
                  <!-- 카테고리 태그 -->
                  <p class="text-sm text-mono-600 flex items-center">
                    <span class="w-2 h-2 bg-main-400 rounded-full mr-2"></span
                    >{{ getCategoryName(festival.category3) }}
                  </p>
                  <!-- ✅ BookmarkButton 크기 제한 적용 -->
                  <BookmarkButton
                    :isBookmarked="isBookmarked(festival.content_id)"
                    @toggle="handleScrapToggle(festival)"
                    :small="true"
                  />
                </div>

                <img
                  :src="
                    festival.homepage &&
                    typeof festival.homepage === 'string' &&
                    festival.homepage.startsWith('http')
                      ? festival.homepage
                      : '/images/default-image.jpg'
                  "

                  class="h-[340px] w-full object-cover rounded-lg"
                />
                <div class="mt-4">
                  <p class="font-bold text-mono-900">{{ festival.name }}</p>
                </div>
                <div class="mt-4 text-[12px] text-mono-600">
                  {{ formatDate(festival.event_start_date) }} ~
                  {{ formatDate(festival.event_end_date) }}
                  <br />
                  {{ festival.gu_name }}
                </div>
              </div>
            </div>
          </div>
          <!-- 페이지네이션 추가 -->
          <PaginationComponent :totalPages="totalPages" @pageChange="handlePageChange" />
          <Modal :isOpen="showModal" @close="closeModal">
            <FollowComponent
              v-if="followCategory === 'follower'"
              :items="userFollowerInfo"
              :isOpen="showModal" @close="closeModal"
              title="팔로워"
            />
            <FollowComponent
              v-if="followCategory === 'following'"
              :items="userFollowingInfo"
              :isOpen="showModal" @close="closeModal"
              title="팔로잉"
            />
          </Modal>
        </div>
      </div>
    </div>
  </div>
</template>
