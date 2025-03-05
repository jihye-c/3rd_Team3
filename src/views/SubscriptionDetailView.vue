<script setup lang="ts">
  import BannerComponent from '@/components/BannerComponent.vue';
  import BookmarkButton from '@/components/BookmarkButton.vue';
  import ShareButton from '@/components/ShareButton.vue';
  import {AptInfo, HouseInfo} from '@/types/SubscriptionTypes';
  import {getAptData, getHouseData} from '@/apis/SubscriptionApi';
  import {ref, onMounted} from 'vue';
  import {useRoute} from 'vue-router';

  // 북마크 상태 관리
  const isBookmarked = ref(false);

  const toggleBookmark = () => {
    isBookmarked.value = !isBookmarked.value;
  };

  const currentRoute = useRoute();
  const id = currentRoute.params.id as string;

  const loading = ref(true);
  const error = ref<string | null>(null);
  const detailData = ref<AptInfo | HouseInfo | null>(null);

  const fetchData = async () => {
    try {
      loading.value = true;

      let data;
      if (await isAptData(id)) {
        const response = await getAptData(id);
        data = response.data[0];
      } else {
        const response = await getHouseData(id);
        data = response.data[0];
      }
      detailData.value = data || null;
    } catch (e) {
      error.value = '데이터를 가져오는 중 에러가 발생했습니다';
    } finally {
      loading.value = false;
    }
  };

  const isAptData = async (id: string): Promise<boolean> => {
    try {
      const response = await getAptData(id);
      return response.data.length > 0;
    } catch (e) {
      return false;
    }
  };

  // 이미지 매핑 함수
  const getImage = (houseType: string | undefined): string => {
    switch (houseType) {
      case '도시형생활주택':
        return '/images/subscription/urban.webp';
      case '오피스텔':
        return '/images/subscription/office.webp';
      case '생활형숙박시설':
        return '/images/subscription/residential.webp';
      case '민간임대':
        return '/images/subscription/public.webp';
      case '공공지원민간임대':
        return '/images/subscription/public.webp';
      default:
        return '/images/subscription/apt.webp';
    }
  };

  onMounted(() => {
    fetchData();
  });
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
        <div class="rounded-2xl overflow-hidden h-85">
          <img
            :src="getImage(detailData?.HOUSE_DTL_SECD_NM)"
            alt=""
            class="h-full w-full object-cover"
          />
        </div>

        <div v-if="loading">로딩 중..</div>
        <div v-else-if="error">에러 발생: {{ error }}</div>

        <div v-else>
          <div v-if="detailData">
            <div class="my-10">
              <div class="bg-mono-200 text-[32px] font-semibold px-[10px] rounded-lg inline-block">
                {{ detailData.HOUSE_DTL_SECD_NM }}
              </div>
              <div class="text-5xl font-semibold pt-3">{{ detailData.HOUSE_NM }}</div>
              <div class="text-2xl text-mono-400 pt-2">{{ detailData.HSSPLY_ADRES }}</div>

              <div class="grid grid-cols-2 gap-6 my-15 font-medium">
                <div class="flex w-163 text-[28px] justify-between">
                  <div class="text-mono-400">분양구분</div>
                  <div class="w-98">
                    {{ detailData.RENT_SECD_NM || detailData.HOUSE_DTL_SECD_NM }}
                  </div>
                </div>
                <div class="flex w-163 text-[28px] justify-between">
                  <div class="text-mono-400">입주 예정월</div>
                  <div class="w-98">{{ detailData.MVN_PREARNGE_YM }}</div>
                </div>
                <div class="flex w-163 text-[28px] justify-between">
                  <div class="text-mono-400">건설 업체명</div>
                  <div class="w-98">
                    {{ detailData.CNSTRCT_ENTRPS_NM || detailData.BSNS_MBY_NM }}
                  </div>
                </div>
                <div class="flex w-163 text-[28px] justify-between">
                  <div class="text-mono-400">문의처</div>
                  <div class="w-98">{{ detailData.MDHS_TELNO }}</div>
                </div>
                <div class="flex w-163 text-[28px] justify-between">
                  <div class="text-mono-400">공급규모</div>
                  <div class="w-98">{{ detailData.TOT_SUPLY_HSHLDCO }}</div>
                </div>
                <div class="flex w-163 text-[28px] justify-between">
                  <div class="text-mono-400">홈페이지</div>
                  <a :href="detailData.HMPG_ADRES" target="_blank" class="w-98">바로가기</a>
                </div>
                <div class="flex w-163 text-[28px] justify-between">
                  <div class="text-mono-400">청약 접수</div>
                  <div class="w-98">
                    {{ detailData.RCEPT_BGNDE || detailData.SUBSCRPT_RCEPT_BGNDE }} ~
                    {{ detailData.RCEPT_ENDDE || detailData.SUBSCRPT_RCEPT_ENDDE }}
                  </div>
                </div>
                <div class="flex w-163 text-[28px] justify-between">
                  <div class="text-mono-400">특별 공급 접수</div>
                  <div class="w-98">
                    {{ detailData.SPSPLY_RCEPT_BGNDE }} ~ {{ detailData.SPSPLY_RCEPT_ENDDE }}
                  </div>
                </div>
              </div>
            </div>

            <div class="flex gap-6 h-125 mb-15">
              <div class="bg-mono-300 h-full w-197 rounded-2xl">지도</div>
              <div class="w-129">
                <div class="bg-main-400 h-60 rounded-[12px] text-[#ffffff] mb-5">
                  <div class="font-semibold text-[32px] pt-5 pl-7">당첨자 발표일</div>
                  <div class="flex items-center justify-between pl-7">
                    <div class="font-semibold text-5xl pt-12">
                      {{ detailData.PRZWNER_PRESNATN_DE }}
                    </div>
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
                :src="detailData.PBLANC_URL"
                frameborder="0"
                width="100%"
                class="min-h-350"
              ></iframe>
            </div>

            <RouterLink
              to="/subscription/calendar"
              class="inline-flex items-center border-1 border-mono-900 px-7 py-[10px]"
            >
              <v-icon size="24px">mdi-chevron-left</v-icon>
              <div class="text-xl">캘린더로</div>
            </RouterLink>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped></style>
