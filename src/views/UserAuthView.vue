<template>
  <div class="w-full h-screen flex pt-12 items-center justify-center" id="authPage">
    <div class="absolute bottom-0 w-full h-full -z-40">
      <img src="/images/Login/login_background.svg" alt="" />
    </div>
    <div class="h-4/5 w-4/5 !bg-[#fff] shadow-lg relative overflow-hidden rounded-lg">
      <div class="absolute bottom-0 right-1/3 z-[50]">
        <img class="h-62" src="/images/Login/login_side.svg" alt="" />
      </div>
      <div
        id="signin"
        :class="[
          ' absolute top-0 right-0 h-full w-1/2 flex  justify-center items-center transition-all duration-700 ease-in-out z-20',
          isAnimated ? '-translate-x-full opacity-0' : '',
        ]"
      >
        <SigninForm />
      </div>

      <div
        id="signup"
        :class="[
          'absolute  top-0 right-0 h-full w-1/2 flex justify-center items-center transition-all duration-700 ease-in-out',
          isAnimated
            ? '-translate-x-full opacity-100 z-20 animate-show'
            : 'opacity-0 z-10',
        ]"
      >
        <div class="h-full w-full flex justify-center items-center">
          <SignupForm :setIsAnimated="toggleAnimation" />
        </div>
      </div>

      <div
        id="overlay-container"
        :class="[
          'absolute top-0 right-1/2 w-1/2 h-full overflow-hidden  transition-transform duration-700 ease-in-out z-30',
          isAnimated ? 'translate-x-full' : '',
        ]"
      >
        <div
          id="overlay"
          :class="[
            'relative -left-full h-full w-[200%] bg-main-400 transform  transition-transform duration-700 ease-in-out',
            isAnimated ? 'translate-x-1/2' : 'translate-x-0',
          ]"
        >
          <div
            id="overlay-left"
            :class="[
              'w-1/2 h-full absolute  flex justify-center items-center top-0 transform -translate-x-[20%]  transition-transform duration-700 ease-in-out',
              isAnimated ? 'translate-x-0' : 'translate-x-[20%]',
            ]"
          >
            <OverlayContent
              :isAnimated="isAnimated"
              :setIsAnimated="toggleAnimation"
              :title="`로그인`"
            />
          </div>

          <div
            id="overlay-right"
            :class="[
              'w-1/2 h-full absolute flex  justify-center items-center top-0 right-0 transform  transition-transform duration-700 ease-in-out',
              isAnimated ? '-translate-x-[20%]' : 'translate-x-0',
            ]"
          >
            <OverlayContent
              :isAnimated="isAnimated"
              :setIsAnimated="toggleAnimation"
              :title="`회원가입`"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SigninForm from "../components/Login/SigninForm.vue";
import SignupForm from "../components/Login/SignupForm.vue";
import OverlayContent from "../components/Login/OverlayContent.vue";

const isAnimated = ref(false);
// const overlayBg = 'bg-gradient-to-r from-blue-800 via-purple-800 to-indigo-800';

const toggleAnimation = () => {
  isAnimated.value = !isAnimated.value;
};
</script>

<style scoped>
  #authPage :deep(.v-input__details) {
    min-height: none;
    padding-inline: 0px;
    min-height: 8px;
  }
  #authPage :deep(.v-text-field .v-messages) {
    min-height: 0;
  }
  #authPage :deep(.v-text-field .v-messages__message) {
    padding: 2px 8px 8px 8px;
  }
</style>
