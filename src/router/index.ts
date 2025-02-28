import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CommunityView from '@/views/CommunityView.vue';
import SubscriptionView from '@/views/SubscriptionView.vue';
import CultureView from '@/views/CultureView.vue';
import HospitalView from '@/views/HospitalView.vue';
import RecipeView from '@/views/RecipeView.vue';
import UserpageView from '@/views/UserpageView.vue';
import MypageView from '@/views/MypageView.vue';
import AdminView from '@/views/AdminView.vue';

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
      path: '/recipe',
      name: 'recipe',
      component: RecipeView,
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
    {
      path: '/community',
      name: 'community',
      component: CommunityView,
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MypageView,
    },
    {
      path: '/userpage',
      name: 'userpage',
      component: UserpageView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
    },
  ],
});

export default router;
