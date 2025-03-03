<script lang="ts" setup>
  // Import Swiper Vue.js components
  import {Swiper, SwiperSlide} from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/scrollbar';

  // import required modules
  import {Scrollbar} from 'swiper/modules';

  const modules = [Scrollbar];
</script>

<template>
  <section class="mt-48">
    <div class="container">
      <div class="flex ft-point text-7xl pt-10 pb-2 items-center">
        <div>이달의 청약정보</div>
        <RouterLink to="/" class="ml-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
          >
            <path
              d="M21.4 26.6L26.6 21.4C26.9667 21.0333 27.15 20.5667 27.15 20C27.15 19.4333 26.9667 18.9667 26.6 18.6L21.35 13.35C20.9833 12.9833 20.5253 12.808 19.976 12.824C19.4253 12.8413 18.9667 13.0333 18.6 13.4C18.2333 13.7667 18.05 14.2333 18.05 14.8C18.05 15.3667 18.2333 15.8333 18.6 16.2L20.4 18H13.95C13.3833 18 12.9167 18.1913 12.55 18.574C12.1833 18.958 12 19.4333 12 20C12 20.5667 12.192 21.0413 12.576 21.424C12.9587 21.808 13.4333 22 14 22H20.4L18.55 23.85C18.1833 24.2167 18.008 24.6753 18.024 25.226C18.0413 25.7753 18.2333 26.2333 18.6 26.6C18.9667 26.9667 19.4333 27.15 20 27.15C20.5667 27.15 21.0333 26.9667 21.4 26.6ZM20 40C17.2333 40 14.6333 39.4747 12.2 38.424C9.76667 37.3747 7.65 35.95 5.85 34.15C4.05 32.35 2.62533 30.2333 1.576 27.8C0.525334 25.3667 0 22.7667 0 20C0 17.2333 0.525334 14.6333 1.576 12.2C2.62533 9.76667 4.05 7.65 5.85 5.85C7.65 4.05 9.76667 2.62467 12.2 1.574C14.6333 0.524667 17.2333 0 20 0C22.7667 0 25.3667 0.524667 27.8 1.574C30.2333 2.62467 32.35 4.05 34.15 5.85C35.95 7.65 37.3747 9.76667 38.424 12.2C39.4747 14.6333 40 17.2333 40 20C40 22.7667 39.4747 25.3667 38.424 27.8C37.3747 30.2333 35.95 32.35 34.15 34.15C32.35 35.95 30.2333 37.3747 27.8 38.424C25.3667 39.4747 22.7667 40 20 40Z"
              fill="#0C0A09"
            />
          </svg>
        </RouterLink>
      </div>
      <div class="text-2xl mb-4">청약정보 서브 타이틀 문구</div>

      <div class="flex gap-6 mb-8">
        <div class="border border-mono-300 rounded-2xl w-163 h-100">캘린더</div>
        <div class="bg-mono-050 rounded-2xl w-231 h-100 px-13">
          <Swiper
            :scrollbar="{hide: false}"
            :direction="'vertical'"
            :pagination="{
              clickable: true,
            }"
            :spaceBetween="57"
            :freeMode="true"
            :slidesPerView="2"
            :modules="modules"
          >
            <SwiperSlide>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect x="8" y="8.50049" width="8" height="8" rx="4" fill="#F89A00" />
                <rect x="8" y="8.50049" width="8" height="8" rx="4" stroke="#F89A00" />
              </svg>
              <div class="font-semibold text-3xl">2025.02.21 (금)</div>
              <div class="grid grid-cols-2 mt-6">
                <div class="mb-6">
                  <div
                    class="bg-main-400 rounded-sm font-semibold text-sm inline-block py-[2px] px-[10px]"
                  >
                    APT
                  </div>
                  <div class="font-semibold text-2xl mt-2">래미안 원페를라</div>
                  <div class="flex gap-5 mt-1">
                    <div>접수기간: 02.01 ~ 02.20</div>
                    <div>|</div>
                    <div>공급 위치 : 중랑구</div>
                  </div>
                </div>
                <div class="mb-6">
                  <div
                    class="bg-main-400 rounded-sm font-semibold text-sm inline-block py-[2px] px-[10px]"
                  >
                    APT
                  </div>
                  <div class="font-semibold text-2xl mt-2">래미안 원페를라</div>
                  <div class="flex gap-5 mt-1">
                    <div>접수기간: 02.01 ~ 02.20</div>
                    <div>|</div>
                    <div>공급 위치 : 중랑구</div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect x="8" y="8.50049" width="8" height="8" rx="4" fill="#F89A00" />
                <rect x="8" y="8.50049" width="8" height="8" rx="4" stroke="#F89A00" />
              </svg>
              <div class="font-semibold text-3xl">2025.02.24 (월)</div>
              <div class="grid grid-cols-2 mt-6">
                <div class="mb-6">
                  <div
                    class="bg-main-400 rounded-sm font-semibold text-sm inline-block py-[2px] px-[10px]"
                  >
                    APT
                  </div>
                  <div class="font-semibold text-2xl mt-2">래미안 원페를라</div>
                  <div class="flex gap-5 mt-1">
                    <div>접수기간: 02.01 ~ 02.20</div>
                    <div>|</div>
                    <div>공급 위치 : 중랑구</div>
                  </div>
                </div>
                <div class="mb-6">
                  <div
                    class="bg-main-400 rounded-sm font-semibold text-sm inline-block py-[2px] px-[10px]"
                  >
                    APT
                  </div>
                  <div class="font-semibold text-2xl mt-2">래미안 원페를라</div>
                  <div class="flex gap-5 mt-1">
                    <div>접수기간: 02.01 ~ 02.20</div>
                    <div>|</div>
                    <div>공급 위치 : 중랑구</div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect x="8" y="8.50049" width="8" height="8" rx="4" fill="#F89A00" />
                <rect x="8" y="8.50049" width="8" height="8" rx="4" stroke="#F89A00" />
              </svg>
              <div class="font-semibold text-3xl">2025.02.25 (화)</div>
              <div class="grid grid-cols-2 mt-6">
                <div class="mb-6">
                  <div
                    class="bg-main-400 rounded-sm font-semibold text-sm inline-block py-[2px] px-[10px]"
                  >
                    APT
                  </div>
                  <div class="font-semibold text-2xl mt-2">래미안 원페를라</div>
                  <div class="flex gap-5 mt-1">
                    <div>접수기간: 02.01 ~ 02.20</div>
                    <div>|</div>
                    <div>공급 위치 : 중랑구</div>
                  </div>
                </div>
                <div class="mb-6">
                  <div
                    class="bg-main-400 rounded-sm font-semibold text-sm inline-block py-[2px] px-[10px]"
                  >
                    APT
                  </div>
                  <div class="font-semibold text-2xl mt-2">래미안 원페를라</div>
                  <div class="flex gap-5 mt-1">
                    <div>접수기간: 02.01 ~ 02.20</div>
                    <div>|</div>
                    <div>공급 위치 : 중랑구</div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .swiper {
    width: 100%;
    height: 100%;
  }
</style>
