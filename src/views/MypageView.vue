<script setup lang="ts">
  type Post = {
    title: string;
    content: string;
    tags?: string[];
    image?: string;
    available?: boolean;
    authorName?: string;
    price?: number;
    region?: {
      gu: string;
      dong: string;
    };
    likes?: string[];
    comments?: string[];
    author?: string;
  };

  import {ref, computed, watchEffect} from 'vue';
  import RecipeCard from '@/components/community/RecipeCard.vue';
  import ResaleCard from '@/components/community/ResaleCard.vue';
  import CommunityPostList from '@/components/community/CommunityPostList.vue';
  import { reviewData,resaleData,questionData,recipData } from '@/config/config';
  import {useUserStore} from '@/stores/userStore';
  import {useRoute, useRouter} from 'vue-router';
  import Modal from '@/components/ModalComponent.vue';
  import FollowComponent from '@/components/mypage/FollowComponent.vue';
  import {useCultureStore} from '../stores/cultureStore';
  // import {getUserScrapList, toggleScrap} from '@/apis/userService';

  import {
    QUESTION_CHANNEL_ID,
    RECIPE_CHANNEL_ID,
    RESALE_CHANNEL_ID,
    REVIEW_CHANNEL_ID,
  } from '@/constants/channelId';
  import Supabase from '@/apis/supabase';
  import type ScrapItem from '@/types/ScrapRespnse';
  import RecipeRectangleCard from '@/components/recipe/RecipeRectangleCard.vue';

  const route = useRoute<string>();
  const showModal = ref(false);
  const followCategory = ref();
  const router = useRouter();
  const userInfo = ref();
  const userFollowerInfo = ref();
  const userFollowingInfo = ref();
  const defaultImage = '/images/mypage/mypage_default_img.png';
  const cultureStore = useCultureStore();
  const id = localStorage.getItem('userId');
  const routeId = ref();
  const userStore = useUserStore();

  const selectedTab = ref('동네리뷰'); // 기본 탭
  const currentPage = ref(1);
  const itemsPerPage = 12;
  const reviewList = ref<Post[]>([]);
  const resaleList = ref<Post[]>([]);
  const questionList = ref<Post[]>([]);
  const recipeList = ref<Post[]>([]);

  const listMap = {
    recipeList,
    resaleList,
    questionList,
    reviewList,
  };
  const channelMap: Record<string, string> = {
    recipeList: RECIPE_CHANNEL_ID,
    resaleList: RESALE_CHANNEL_ID,
    questionList: QUESTION_CHANNEL_ID,
    reviewList: REVIEW_CHANNEL_ID,
    // cultureList: CULT_CHANNEL_ID,
  };

  const goToCultureDetail = (contentId: string) => {
    router.push(`/culture/${contentId}`);
  };
  const getCategoryName = (code: string) => {
    const category = subCategories.find((sub) => sub.code === code);
    return category ? category.name : '기타';
  };

  // 현재 페이지에 맞게 데이터 필터링
  const paginatedRecipes = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return recipeList.value.slice(start, start + itemsPerPage);
  });

  const openModal = (category: string) => {
    showModal.value = true;
    followCategory.value = category;
  };

  const closeModal = () => {
    showModal.value = false;
    followCategory.value = '';
  };

  const totalCulturePages = computed(() => {
    console.log(':memo: 현재 스크랩된 문화생활 개수:', cultureStore.bookmarkedFestivals?.length);
    return Math.ceil((cultureStore.bookmarkedFestivals?.length || 0) / itemsPerPage);
  });
  const paginatedFestivals = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return (cultureStore.bookmarkedFestivals ?? []).slice(start, start + itemsPerPage);
  });

  const totalPages = computed(() => Math.ceil(recipeList.value.length / itemsPerPage));

  const handlePageChange = (page: number) => {
    console.log(':pushpin: 페이지 변경 요청:', page);
    currentPage.value = page;
    console.log(':white_check_mark: 변경된 현재 페이지:', currentPage.value);
  };

  const followHandeler = async () => {
    const {id} = route.params;
    try {
      await userStore.postFollowUser(id);
      userFollowerInfo.value = userStore.followerInfo;
      userFollowingInfo.value = userStore.followingInfo;
      console.log(userStore.followingInfo);
      console.log(userStore.followerInfo);

      followCheck();
    } catch (e) {
      console.log(e);
    }
  };
  const deleteFollowHandeler = async () => {
    const {id} = route.params;
    try {
      await userStore.deleteFollowUser(id);
      userFollowerInfo.value = userStore.followerInfo;
      userFollowingInfo.value = userStore.followingInfo;
    } catch (e) {
      console.log(e);
    }
  };
  // const handleScrapToggle = async (festival) => {
  //   try {
  //     const userId = localStorage.getItem('userId');
  //     if (!userId) {
  //       console.warn(':warning: 로그인이 필요합니다.');
  //       return;
  //     }

  //     console.log(':white_check_mark: 마이페이지에서 북마크 추가/삭제 요청:', festival);

  //     // :white_check_mark: scrap 채널에 저장 or 삭제 (서버에 요청)
  //     const updatedScraps = await toggleScrap(userId, festival);

  //     // :white_check_mark: 최신 북마크 목록으로 업데이트
  //     cultureStore.bookmarkedFestivals = updatedScraps;

  //     console.log(':white_check_mark: 마이페이지 북마크 업데이트 완료!');
  //   } catch (error) {
  //     console.error(':x: 북마크 저장 실패:', error);
  //   }
  // };
  const followCheck = () => {
    if (userFollowerInfo.value) {
      return userFollowerInfo.value.some((item) => item.id === id);
    }
  };

  // 스크랩 목록 데이터
  const commRecipeData = ref<object[]>([]);
  const commReviewData = ref<object[]>([]);
  const commQuestionData = ref<object[]>([]);
  const commResaleData = ref<object[]>([]);
  const cultureData = ref<object[]>([]);
  const recipeData = ref<object[]>([]);
  const subscriptionData = ref<object[]>([]);
  //

  watchEffect(async () => {
    routeId.value = route.params.id;
    const id: string | null = localStorage.getItem('userId');
    const path = route.params.id;
    console.log(path);
    if (path) {
      await userStore.getUser(path as string);
      userInfo.value = userStore.userInfo;
      userFollowerInfo.value = userStore.followerInfo;
      userFollowingInfo.value = userStore.followingInfo;
      // ✅ 유저별 스크랩 목록 가져오기
      if (path === id) {
        const commRecipeResponse = await Supabase.getScrapData(id, 'comm_recipe');
        commRecipeData.value = commRecipeResponse;
        const commReviewResponse = await Supabase.getScrapData(id, 'comm_review');
        commReviewData.value = commReviewResponse;
        const commQuestionResponse = await Supabase.getScrapData(id, 'comm_qna');
        commQuestionData.value = commQuestionResponse;
        const commResaleResponse = await Supabase.getScrapData(id, 'comm_sale');
        commResaleData.value = commResaleResponse;
        const cultureResponse = await Supabase.getScrapData(id, 'culture');
        cultureData.value = cultureResponse;
        const recipeResponse = await Supabase.getScrapData(id, 'recipe');
        recipeData.value = recipeResponse;
        const subscriptionResponse = await Supabase.getScrapData(id, 'subscription');
        subscriptionData.value = subscriptionResponse;

        // console.log('레시피', JSON.stringify(commRecipeResponse, null, 2));
        // console.log('리뷰', commReviewData.value);
        // console.log('질문', commQuestionData.value);
        // console.log('중고거래', commResaleData.value);
        // console.log('문화', cultureData.value);
        console.log('레시피', recipeData.value);
        console.log('청약', subscriptionData.value);

        // 스크랩 불러오는 거 여기서 하시면 됩니다!!!
        // const scrapList = await getUserScrapList(id);
        // cultureStore.bookmarkedFestivals = scrapList;
        // console.log('✅ [유저별] 북마크 불러오기 완료:', cultureStore.bookmarkedFestivals);
      } else if (path !== id) {
        Object.keys(channelMap).forEach((key) => {
          const channelId = channelMap[key];
          listMap[key as keyof typeof listMap].value = userInfo.value.posts
            .filter((item) => item.channel === channelId)
            .map((item: Post) => {
              try {
                const parsedTitle = JSON.parse(item.title);
                return {
                  image_src: item.image,
                  likes: item.likes,
                  comments: item.comments,
                  ...parsedTitle,
                  author: {...userInfo.value, fullName: JSON.stringify(userInfo.value.fullName)},
                };
              } catch (error) {
                console.error('Error parsing item title:', error);
                return item;
              }
            });
        });
      }
    }
  });

  // :white_check_mark: 북마크 상태 확인 (현재 스크랩 여부)
  const isBookmarked = (contentId: string) => {
    return cultureStore.bookmarkedFestivals.some((festival) => festival.content_id === contentId);
  };
</script>

<template>
  <div id="communityCreateContent" class="w-full container pt-24">
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
              <p v-if="userInfo?.fullName.introduction" class="text-mono-600 text-wrap text-[16px]">
                {{ userInfo?.fullName.introduction }}
              </p>
              <p v-else class="text-mono-600 text-wrap text-[16px]">
                사용자의 소개가 아직 없습니다:)
              </p>
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
            @click="followHandeler"
            class="w-[120px] text-main-50 cursor-pointer hover:bg-main-400/80 bg-main-400 py-2 rounded-md"
          >
            <span class="text-md">팔로우</span>
          </button>
        </div>
        <div v-else class="absolute top-6 right-6 flex gap-4">
          <button
            @click="deleteFollowHandeler"
            class="w-[120px] text-main-400 cursor-pointer hover:bg-main-400/80 border-main-400 border-1 py-2 rounded-md"
          >
            <span class="text-md">팔로우 취소</span>
          </button>
        </div>
      </div>

      <!-- 나의 스크랩 -->
      <div class="mt-12">
        <h2 v-if="routeId === id" class="text-[32px] font-semibold text-mono-900">나의 스크랩</h2>
        <h2 v-else class="text-[32px] font-semibold text-mono-900">작성 게시물</h2>
        <!-- 기존 탭 -->
        <div class="flex border-b border-mono-200 mt-6">
          <button
            v-for="tab in [
              '동네리뷰',
              '중고거래',
              '질문게시판',
              '나만의 레시피',
              '문화생활',
              '레시피',
            ]"
            :key="tab"
            @click="selectedTab = tab"
            class="px-6 py-3 text-[20px] font-medium text-mono-600 transition-colors duration-200"
            :class="selectedTab === tab ? 'border-b-4 border-main-400 text-mono-900' : ''"
          >
            {{ tab }}
          </button>
        </div>
        <!-- 탭 컨텐츠 -->
        <div class="mt-6 mb-[120px]">
          <!-- 동네 리뷰 탭 -->
          <div v-if="selectedTab === '동네리뷰'" class="grid grid-cols-2 gap-6">
            <CommunityPostList
              v-for="(post, index) in routeId === id ?  commReviewData :reviewData"
              :key="index"
              :title="post.title"
              :content="post.content"
              :dong="post[0].dong"
              :tags="post[0].tags"
              :image="post.image_src"
              class="w-full"
              @click="router.push(post.post_url)"
            />
          </div>
          <div v-if="selectedTab === '중고거래'" class="grid grid-cols-4 gap-6">
            <ResaleCard
              v-for="(post, index) in routeId === id ? commResaleData: resaleData"
              :key="index"
              :title="post.title"
              :image="post.image_src"
              :price="post[0].price"
              :dong="post[0].dong"
              :available="true"
              @click="router.push(post.post_url)"
            />
          </div>
          <div v-if="selectedTab === '질문게시판'" class="grid grid-cols-2 gap-6">
            <CommunityPostList
              v-for="(post, index) in routeId === id ?  commQuestionData :questionData"
              :key="index"
              :title="post.title"
              :content="post.content"
              :dong="post[0].dong"
              :tags="post.tags"
              :image="post.image_src"
              class="w-full"
              @click="router.push(post.post_url)"
            />
          </div>
          <!-- "나만의 레시피" 탭 - 카드 리스트 -->
          <div v-if="selectedTab === '나만의 레시피'" class="grid grid-cols-4 gap-6">
            <RecipeCard
              v-for="(recipe, index) in routeId === id ?  commRecipeData : recipData"
              :key="index"
              :title="recipe.title ?? ''"
              :image="recipe.image_src ?? ''"
              :author-img="null"
              :author-name="recipe[0].author_name"
              :tag="recipe[0].tags"
              @click="router.push(recipe.post_url)"
            />
          </div>
          <!-- "레시피" 탭 - 카드 리스트 -->
          <div v-if="selectedTab === '레시피'" class="grid grid-cols-3 gap-6">
            <RecipeRectangleCard
              v-for="(recipe, index) in recipeData"
              :key="index"
              :title="recipe.title"
              :image="recipe.image_src"
              @click="router.push(recipe.post_url)"
            />
          </div>
          <!-- "청약뉴스" 탭 - 카드 리스트 -->
          <!-- <div v-if="selectedTab === '청약뉴스'" class="grid grid-cols-4 gap-6">
            <SubscriptionCard
              v-for="(card, index) in subscriptionData"
              :key="card.id" :card="card"
              @click="router.push(recipe.post_url)"
            />
            <SubscriptionCard v-for="card in paginatedCards" :key="card.id" :card="card" />
          </div> -->
          <div class="mt-6">
            <!-- ✅ 문화생활 탭 추가 -->
            <div
              v-if="selectedTab === '문화생활' && routeId === id"
              class="grid grid-cols-4 gap-6 w-full"
            >
              <div
                v-for="(festival, index) in cultureData"
                :key="index"
                class="p-4 rounded-lg shadow border border-mono-300 cursor-pointer w-[380px]"
                @click="router.push(festival.post_url)"
              >
                <div class="flex justify-between items-center mb-4">
                  <!-- 카테고리 태그 -->
                  <p class="text-sm text-mono-600 flex items-center">
                    <span class="w-2 h-2 bg-main-400 rounded-full mr-2"></span>일반축제
                  </p>
                  <!-- ✅ BookmarkButton 크기 제한 적용 -->
                  <!-- <BookmarkButton
                    :isBookmarked="isBookmarked(festival.content_id)"
                    @toggle="handleScrapToggle(festival)"
                    :small="true"
                  /> -->
                </div>

                <img :src="festival.image_src" class="h-[340px] w-full object-cover rounded-lg" />
                <div class="mt-4">
                  <p class="font-bold text-mono-900">{{ festival.title }}</p>
                </div>
                <div class="mt-4 text-[12px] text-mono-600">
                  {{ festival[0].eventStartDate }} ~
                  {{ festival[0].eventEndDate }}
                  <br />
                  {{ festival[0].location }}
                </div>
              </div>
            </div>
          </div>
          <!-- 페이지네이션 추가 -->
          <!-- <PaginationComponent
            :totalPages="totalPages"
            @pageChange="handlePageChange"
            class="my-[100px]"
          /> -->
          <Modal :isOpen="showModal" @close="closeModal">
            <FollowComponent
              v-if="followCategory === 'follower'"
              :items="userFollowerInfo"
              :isOpen="showModal"
              @close="closeModal"
              title="팔로워"
            />
            <FollowComponent
              v-if="followCategory === 'following'"
              :items="userFollowingInfo"
              :isOpen="showModal"
              @close="closeModal"
              title="팔로잉"
            />
          </Modal>
        </div>
      </div>
    </div>
  </div>
</template>
