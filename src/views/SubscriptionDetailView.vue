<script setup lang="ts">
  import BannerComponent from '@/components/BannerComponent.vue';
  import BookmarkButton from '@/components/BookmarkButton.vue';
  import ShareButton from '@/components/ShareButton.vue';
  import {ref} from 'vue';
  import {useRoute} from 'vue-router';

  const currentRoute = useRoute();

  // 북마크 상태 관리
  const isBookmarked = ref(false);

  const toggleBookmark = () => {
    isBookmarked.value = !isBookmarked.value;
  };
</script>

<template>
  <BannerComponent
    background="/images/subscription/subscriptionDetailBanner.png"
    title="자수성가와 함께하는 나의 첫 집"
    subtitle="당신의 새 집 정보, 여기서 확인하세요"
    :breadcrumbs="[
      {title: '홈', href: '/'},
      {title: '청약', href: '/subscription'},
      {title: '상세 정보'},
    ]"
  />
  <div class="my-20">
    <div class="container flex gap-55">
      <div class="border-mono-200 w-[52px] h-[104px] flex flex-col gap-[12px]">
        <!-- 스크랩, 공유 버튼 -->
        <BookmarkButton :is-bookmarked="isBookmarked" @toggle="toggleBookmark" />
        <ShareButton />
      </div>

      <section class="w-full">
        <div class="bg-main-500 h-85 rounded-2xl"></div>

        <div class="my-10">
          <div class="bg-mono-200 text-[32px] font-semibold px-[10px] rounded-lg inline-block">
            APT
          </div>
          <div class="text-5xl font-semibold pt-3">디에이치 대치 에델루이</div>
          <div class="text-2xl text-mono-400 pt-2">서울특별시 강남구 대치동 964번치 일대</div>

          <div class="grid grid-cols-2 gap-6 my-15 font-medium">
            <div class="flex w-163 text-[28px] justify-between">
              <div class="text-mono-400">분양구분</div>
              <div class="w-98">분양주택</div>
            </div>
            <div class="flex w-163 text-[28px] justify-between">
              <div class="text-mono-400">입주 예정월</div>
              <div class="w-98">2025-08</div>
            </div>
            <div class="flex w-163 text-[28px] justify-between">
              <div class="text-mono-400">건설 업체명</div>
              <div class="w-98">현대건설(주)</div>
            </div>
            <div class="flex w-163 text-[28px] justify-between">
              <div class="text-mono-400">문의처</div>
              <div class="w-98">02-577-4301</div>
            </div>
            <div class="flex w-163 text-[28px] justify-between">
              <div class="text-mono-400">공급규모</div>
              <div class="w-98">72</div>
            </div>
            <div class="flex w-163 text-[28px] justify-between">
              <div class="text-mono-400">홈페이지</div>
              <div class="w-98">바로가기</div>
            </div>
            <div class="flex w-163 text-[28px] justify-between">
              <div class="text-mono-400">청약 접수</div>
              <div class="w-98">2025-02-01 ~ 2025-02-25</div>
            </div>
            <div class="flex w-163 text-[28px] justify-between">
              <div class="text-mono-400">특별 공급 접수</div>
              <div class="w-98">2025-02-01 ~ 2025-02-25</div>
            </div>
          </div>
        </div>

        <div class="flex gap-6 h-125 mb-15">
          <div class="bg-mono-300 h-full w-197 rounded-2xl">지도</div>
          <div class="w-129">
            <div class="bg-main-400 h-60 rounded-[12px] text-[#ffffff] mb-5">
              <div class="font-semibold text-[32px] pt-5 pl-7">당첨자 발표일</div>
              <div class="flex items-center justify-between pl-7">
                <div class="font-semibold text-[80px] pt-12">D-21</div>
                <v-icon size="140px" class="opacity-30 pt-12"
                  >mdi-calendar-multiselect-outline</v-icon
                >
              </div>
            </div>
            <div class="bg-main-400 h-60 rounded-[12px] text-[#ffffff]">
              <div class="font-semibold text-[32px] pt-5 pl-7">경쟁률</div>
              <div class="flex items-center justify-between pl-7">
                <div class="font-semibold text-[80px] pt-12">1230:1</div>
                <v-icon color="#ffffff" size="140px" class="opacity-30 pt-12"
                  >mdi-clover-outline</v-icon
                >
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="text-5xl font-semibold mb-6">모집공고</div>
          <iframe
            src="https://www.applyhome.co.kr/ai/aia/selectAPTLttotPblancDetail.do?houseManageNo=2024000718&pblancNo=2024000718"
            frameborder="0"
            width="100%"
            class="min-h-750"
          ></iframe>
        </div>

        <RouterLink
          to="/subscription/calendar"
          class="inline-flex items-center border-1 border-mono-900 px-7 py-[10px]"
        >
          <v-icon size="24px">mdi-chevron-left</v-icon>
          <div class="text-xl">캘린더로</div>
        </RouterLink>
      </section>
    </div>
  </div>
</template>

<style scoped></style>
