<script setup lang="ts">
  import {RouterLink} from 'vue-router';
  import {Motion, useScroll, useTransform} from 'motion-v';
  import AddressSelectBar from './Home/common/AddressSelectBar.vue';
  import {useAuthStore} from '@/stores/auth';

  const authStore = useAuthStore();
  const {scrollY} = useScroll();
  const background = useTransform(scrollY, [0, 100], ['rgba(0,0,0,0.0)', 'rgba(255,255,255,1)']);
  const height = useTransform(scrollY, [0, 100], [0, '100%']);
  const border = useTransform(scrollY, [0, 100], ['none', '1px solid #eee']);
  const color = useTransform(scrollY, [0, 100], ['#fff', '#000']);
  const props = defineProps({
    backgroundOpacity: {
      type: Boolean,
      default: false,
    },
  });
  const links = [
    {to: '/subscription', label: '청약'},
    {to: '/recipe', label: '자취 레시피'},
    {to: '/hospital', label: '인근 병원'},
    {to: '/culture', label: '문화 생활'},
  ];
  const logoutHandler = () => {
    authStore.logout();
  };
</script>

<template>
  <Motion
    as="div"
    class="w-full fixed z-20"
    :style="{
      background: props.backgroundOpacity ? background : '#fff',
      height,
      border,
      color: props.backgroundOpacity ? color : 'var(--color-mono-900)',
    }"
  >
    <header class="w-full !p-5">
      <div ref="headerStyle" class="container">
        <nav class="flex items-center justify-between gap-7">
          <div class="flex gap-16">
            <h1 class="flex items-center flex-col justify-center">
              <RouterLink to="/" :style="{color}" class="ft-point pb-2 text-2xl box-border"
                >자수성가</RouterLink
              >
            </h1>
            <div class="text-xl font-semibold cursor-pointer bg flex items-center">
              <RouterLink
                v-for="(link, index) in links"
                :key="index"
                :to="link.to"
                class="px-4 relative before:content-[''] before:w-24 before:scale-x-0 before:origin-center before:absolute before:-bottom-4 before:left-1/2 before:-translate-x-1/2 before:h-1 before:bg-mono-200 before:transition-transform before:duration-300 hover:before:scale-x-100"
              >
                {{ link.label }}
              </RouterLink>
              <div class="group/item relative px-6" to="/community/resale">
                커뮤니티
                <div class="absolute w-full pt-6 left-0 top-7">
                  <ul
                    class="group/edit hidden bg-[#fff] text-mono-700 w-full group-hover/item:flex flex-col items-center justify-center gap-3 text-sm bg-white shadow-sm hover:flex"
                  >
                    <RouterLink
                      to="/community/question"
                      class="w-full px-3 py-3 text-center hover:bg-main-400 transition-all duration-300 hover:text-main-50"
                    >
                      질문 게시판
                    </RouterLink>
                    <RouterLink
                      to="/community/review"
                      class="w-full px-3 py-3 text-center hover:bg-main-400 transition-all duration-300 hover:text-main-50"
                    >
                      동네리뷰
                    </RouterLink>
                    <RouterLink
                      to="/community/resale"
                      class="w-full px-3 py-3 text-center hover:bg-main-400 transition-all duration-300 hover:text-main-50"
                    >
                      중고거래
                    </RouterLink>
                    <RouterLink
                      to="/community/recipe"
                      class="w-full px-3 py-3 text-center hover:bg-main-400 transition-all duration-300 hover:text-main-50"
                    >
                      나만의 레시피
                    </RouterLink>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="flex items-center">
            <AddressSelectBar />

            <!-- <RouterLink class="tw:flex tw:items-center" to="/mypage"> </RouterLink> -->
            <v-badge v-if="authStore.isAuthenticated" content="5" color="var(--color-main-400)">
              <v-speed-dial scrim="true" location="bottom center" transition="fade-transition">
                <template v-slot:activator="{props: activatorProps}">
                  <v-avatar
                    v-bind="activatorProps"
                    image="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201608/04/htm_2016080484837486184.jpg"
                  ></v-avatar>
                </template>

                <v-tooltip location="end">
                  <template v-slot:activator="{props}">
                    <RouterLink to="/mypage">
                      <v-btn icon v-bind="props">
                        <v-icon color="grey-lighten-1"> mdi-account </v-icon>
                      </v-btn>
                    </RouterLink>
                  </template>
                  <span>마이페이지</span>
                </v-tooltip>
                <v-tooltip location="end">
                  <template v-slot:activator="{props}">
                    <v-btn icon v-bind="props">
                      <v-icon color="grey-lighten-1"> mdi-bell </v-icon>
                    </v-btn>
                  </template>
                  <span>알림</span>
                </v-tooltip>
                <v-tooltip location="end">
                  <template v-slot:activator="{props}">
                    <v-btn @click="logoutHandler()" icon v-bind="props">
                      <v-icon color="grey-lighten-1"> mdi-logout </v-icon>
                    </v-btn>
                  </template>
                  <span>로그아웃</span>
                </v-tooltip>
                <v-tooltip location="end">
                  <template v-slot:activator="{props}">
                    <v-btn v-bind="props" key="4" class="!shadow-none" icon="$error"></v-btn>
                  </template>
                  <span>닫기</span>
                </v-tooltip>
              </v-speed-dial>
            </v-badge>
            <div v-else>
              <RouterLink to="/auth">로그인</RouterLink>
            </div>
          </div>
        </nav>
      </div>
    </header>
  </Motion>
</template>

<style scoped>
  #app:has(#hospitalContent) header {
    background: white !important;
    color: var(--color-mono-900);
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08);
  }
  header :deep(.v-field__outline) {
    display: none;
  }
  header :deep(.v-field--variant-filled .v-field__overlay) {
    background-color: transparent;
    border: none;
  }
  header :deep(.v-select .v-select__selection-text) {
    font-weight: bold;
  }
  header :deep(.v-field__input) {
    padding-left: 4px;
  }
</style>
