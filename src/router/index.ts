import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SubscriptionView from '@/views/SubscriptionView.vue';
import CultureView from '@/views/CultureView.vue';
import HospitalView from '@/views/HospitalView.vue';
import RecipeView from '@/views/RecipeView.vue';
import UserpageView from '@/views/UserpageView.vue';
import MypageView from '@/views/MypageView.vue';
import UserAuthView from '@/views/UserAuthView.vue';
import AdminView from '@/views/AdminView.vue';
import CultureViewDetail from '@/views/CultureView_detail.vue';
import UserEditInformationView from '@/views/UserEditInformationView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/subscription',
      name: 'subscription',
      component: SubscriptionView,
    },
    {
      path: '/subscription/calendar',
      name: 'subscription-calendar',
      component: () => import('@/views/SubscriptionCalendarView.vue'),
    },
    {
      path: '/subscription/:id',
      name: 'subscription-detail',
      component: () => import('@/views/SubscriptionDetailView.vue'),
    },
    {
      path: '/subscription/news',
      name: 'subscription-news',
      component: () => import('@/views/SubscriptionNewsView.vue'),
    },
    {
      path: '/subscription/news/:id',
      name: 'subscription-news-detail',
      component: () => import('@/views/SubscriptionNewsDetailView.vue'),
    },
    {
      path: '/recipe',
      name: 'recipe',
      component: RecipeView,
    },
    {
      path: '/recipe/search',
      name: 'recipe-search',
      component: () => import('@/views/RecipeSearchView.vue'),
    },
    {
      path: '/recipe/detail/:id',
      name: 'recipe-detail',
      component: () => import('@/views/RecipeDetailView.vue'),
    },
    {
      path: '/hospital',
      name: 'hospital',
      component: HospitalView,
    },
    {
      path: '/culture',
      name: 'culture',
      component: CultureView,
    },
    {path: '/culture/:id', name: 'culture-detail', component: CultureViewDetail},
    {
      path: '/community/resale',
      name: 'community-resale',
      component: () => import('@/views/CommunityResaleView.vue'),
    },
    {
      path: '/community/recipe',
      name: 'community-recipe',
      component: () => import('@/views/CommunityRecipeView.vue'),
    }, 
    { path: '/community/review',
      name: 'community-review',
      component: () => import('@/views/CommunityReviewView.vue'),
    },
    {
      path: '/community/question',
      name: 'community-question',
      component: () => import('@/views/CommunityQuestionView.vue'),
    },
    {
      path: '/community/post/:id',
      name: 'community-post-detail',
      component: () => import('@/views/CommunityPostDetailView.vue'),
    },
    {
      path: '/community/resale/:id',
      name: 'used-post-detail',
      component: () => import('@/views/UsedPostDetailView.vue'),
    },
    {
      path: '/community/post',
      name: 'posting',
      component: () => import('@/views/PostView.vue'),
    },
    {
      path: '/community/post',
      name: 'posting',
      component: () => import('@/views/PostView.vue'),
    }, 
    {
      path: '/mypage',
      name: 'mypage',
      component: MypageView,
    },
    {
      path: '/mypage/user-update',
      name: 'user-update',
      component: UserEditInformationView,
    },
    {
      path: '/userpage',
      name: 'userpage',
      component: UserpageView,
    },
    {
      path: '/auth',
      name: 'auth',
      component: UserAuthView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
    },
  ],
});

export default router;
