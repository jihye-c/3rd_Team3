<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import CultureAPI from "@/apis/cultureApi"; // ✅ API 가져오기
import { useCultureStore } from "../stores/cultureStore";
 // ✅ Pinia 상태 관리

import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Pagination, EffectFade, Autoplay } from "swiper/modules";
import CalendarComponent from "@/components/CalendarComponent.vue";
import FestivalSearchComponent from "@/components/FestivalSearchComponent.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";
const currentSlide = ref(0);

const onSlideChange = (swiper: any) => {
  currentSlide.value = swiper.activeIndex;
};

// ✅ 배너 데이터 따로 저장
const bannerFestivals = ref<any[]>([]);

// ✅ 배너용 상세 정보 불러오기 (overview 포함)
const fetchBannerFestivals = async () => {
  try {
    // ✅ 기본적으로 필터링된 리스트에서 7개만 선택
    const selectedFestivals = filteredFestivals.value.slice(0, 7);
    
    // ✅ 각 행사에 대해 상세 조회 수행
    const detailedFestivals = await Promise.all(
      selectedFestivals.map(async (festival) => {
        const details = await CultureAPI.getEventDetail(festival.content_id, 15);
        return {
          ...festival,
          overview: details?.overview || "행사 정보 확인 가능",
        };
      })
    );

    bannerFestivals.value = detailedFestivals;
  } catch (error) {
    console.error("❌ 배너 상세 데이터 조회 오류:", error);
  }
};


const router = useRouter();
const cultureStore = useCultureStore(); // ✅ 상태 저장소 사용

// ✅ API 데이터 저장할 곳
const festivalData = ref<any[]>([]);
const filteredFestivals = ref<any[]>([]); // 필터링된 데이터
const selectedDate = ref<string>(""); // ✅ 선택된 날짜 저장
const upcomingEvents = ref<any[]>([]);
const showPopup = ref(false);

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
  { name: "기타행사", code: "A02081300" }
];

// ✅ 서브카테고리 코드 → 한글 이름 변환 함수
const getCategoryName = (code) => {
  const category = subCategories.find((sub) => sub.code === code);
  return category ? category.name : "기타"; // 코드 매칭 안되면 '기타'로 표시
};

// ✅ 필터링 조건 저장
const selectedFilters = ref({
  category: "",
  subCategory: "",
  keyword: "",
  location: "",
  period: null as number | null,
});

const filterFestivals = () => {
  console.log("✅ 필터링 전 데이터 개수:", festivalData.value.length);

  if (
    !selectedFilters.value.category &&
    !selectedFilters.value.subCategory &&
    !selectedFilters.value.keyword &&
    selectedFilters.value.location === "전체" &&
    !selectedFilters.value.period
  ) {
    if (festivalData.value.length > 0) {
      filteredFestivals.value = festivalData.value;
      cultureStore.setFilteredFestivals(festivalData.value);
    }
    return;
  }



  const today = dayjs();
  let filterEndDate = null;

  // ✅ 기간 필터링 적용 (1개월, 3개월, 6개월, 1년)
  if (selectedFilters.value.period) {
    filterEndDate = today.add(selectedFilters.value.period, 'month').format('YYYYMMDD');
  }

  // ✅ 새롭게 필터링된 데이터를 임시 변수에 저장
  const newFilteredFestivals = festivalData.value.filter((festival) => {

    console.log("🎯 [필터링 대상]", festival.name, "|", festival.category2, festival.category3, festival.gu_name);

    const matchesCategory =
      !selectedFilters.value.category || festival.category2 === selectedFilters.value.category;

    const matchesSubCategory =
      !selectedFilters.value.subCategory || festival.category3 === selectedFilters.value.subCategory;

    const matchesKeyword =
      !selectedFilters.value.keyword ||
      festival.name.includes(selectedFilters.value.keyword);

    const matchesLocation =
      !selectedFilters.value.location || selectedFilters.value.location === "전체" ||
      festival.gu_name.trim() === selectedFilters.value.location.trim();

    // ✅ 기간 필터링 적용
    const matchesPeriod = !filterEndDate || (festival.event_start_date <= filterEndDate);



    console.log(`🔎 필터 조건 검사:
      - 카테고리: ${matchesCategory ? "✅" : "❌"} (${festival.category2} vs ${selectedFilters.value.category})
      - 상세 분류: ${matchesSubCategory ? "✅" : "❌"} (${festival.category3} vs ${selectedFilters.value.subCategory})
      - 키워드: ${matchesKeyword ? "✅" : "❌"} (${selectedFilters.value.keyword})
      - 지역: ${matchesLocation ? "✅" : "❌"} (${festival.gu_name} vs ${selectedFilters.value.location})`);

    return matchesCategory && matchesSubCategory && matchesKeyword && matchesLocation && matchesPeriod;
  });

  console.log("✅ 필터링 후 데이터:", newFilteredFestivals);

  // ✅ 필터링 결과가 있을 경우 업데이트, 없으면 기존 리스트 유지 & 팝업 표시
  if (newFilteredFestivals.length > 0) {
    filteredFestivals.value = newFilteredFestivals;
    cultureStore.setFilteredFestivals(newFilteredFestivals);
  }

  // ✅ 사용자가 필터를 변경한 경우에만 팝업을 띄움
  if (newFilteredFestivals.length === 0 && festivalData.value.length > 0) {
    showPopup.value = true;
  } else {
    showPopup.value = false;
  }
};


// ✅ 팝업 닫기 함수
const closePopup = () => {
  showPopup.value = false;
};

// ✅ 필터 변경 핸들러
const handleFilterChange = (filters: { category: string; subCategory: string; location: string; keyword: string; period: number | null}) => {
  selectedFilters.value.category = filters.category;
  selectedFilters.value.subCategory = filters.subCategory;
  selectedFilters.value.keyword = filters.keyword;
  selectedFilters.value.location = filters.location;
  selectedFilters.value.period = filters.period;

  currentPage.value = 1;

  filterFestivals(); // 즉각 필터 적용
};

// ✅ API에서 데이터 가져오기
const fetchFestivals = async () => {
  try {
    // ✅ 기존 데이터가 있으면 API 호출 생략
    if (cultureStore.festivals.length > 0) {
      console.log("✅ 기존 데이터가 존재하여 API 요청 생략");
      festivalData.value = [...cultureStore.festivals];
      filteredFestivals.value = cultureStore.filteredFestivals.length > 0
        ? [...cultureStore.filteredFestivals]
        : [...cultureStore.festivals];
      currentPage.value = cultureStore.currentPage;
      selectedFilters.value = { ...cultureStore.selectedFilters };
      return;
    }

    console.log("🎯 API 요청 시작: 빠른 목록 로딩");
    const data = await CultureAPI.getSeoulFestivalsAndEvents(); // ✅ 한 번만 요청
    console.log("📌 받아온 데이터:", data);

    if (data.length > 0) {
      // ✅ `searchFestival1` 응답 데이터만 사용하여 최적화
      const optimizedData = data.map(event => ({
        ...event,
        images: event.homepage || "/images/default-image.jpg", // ✅ 대표 이미지
        overview: "행사 정보 확인 가능", // ✅ 상세 소개는 상세 페이지에서 요청
      }));

      console.log("✅ 최적화된 데이터:", optimizedData);

      cultureStore.setFestivals(optimizedData);
      cultureStore.setFilteredFestivals(optimizedData);


      festivalData.value = optimizedData;
      filteredFestivals.value = optimizedData;

    } else {
      console.warn("⚠️ 받아온 데이터가 없음");
      filteredFestivals.value = [];
    }
  } catch (error) {
    console.error("❌ API 요청 오류:", error);
  }
};

// 🔹 페이지네이션 설정
const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(filteredFestivals.value.length / 9));

// 🔹 페이지 변경 핸들러
const handlePageChange = (page: number) => {
  currentPage.value = page;
  cultureStore.setCurrentPage(page);
};

// 🔹 현재 페이지 데이터만 필터링
const paginatedFestivals = computed(() => {
  const start = (currentPage.value - 1) * 9;
  return filteredFestivals.value.slice(start, start + 9);
});

// 날짜 형식 변환 함수
const formatDate = (dateString: string) => {
  if (!dateString || dateString.length !== 8) return "날짜 미정"; // 예외 처리
  return `${dateString.substring(0, 4)}.${dateString.substring(4, 6)}.${dateString.substring(6, 8)}`;
};

// ✅ 선택한 날짜 이후 다가오는 일정 업데이트
const updateUpcomingEvents = (events: any[]) => {
  upcomingEvents.value = events;
};

const goToDetail = (contentId) => {
  console.log("✅ 현재 상태 저장", {
    filters: selectedFilters.value,
    page: currentPage.value,
    filteredData: filteredFestivals.value.length,
  });

  // ✅ 현재 필터 & 페이지 상태를 Pinia에 저장
  cultureStore.setCurrentPage(currentPage.value);
  cultureStore.setFilters(selectedFilters.value);
  cultureStore.setFilteredFestivals(filteredFestivals.value);

  // ✅ 상세 페이지로 이동
  router.push(`/culture/${contentId}`);
};

// ✅ 상태 변수 추가
const showFullText = ref(false);

// ✅ 토글 함수 추가
const toggleText = () => {
  showFullText.value = !showFullText.value;
};

// ✅ `filteredFestivals`가 변경될 때 배너 업데이트
watch(filteredFestivals, async (newFestivals) => {
  if (newFestivals.length > 0) {
    await fetchBannerFestivals();
  }
}, { immediate: true });

onMounted(() => {
  console.log("📌 기존 저장된 상태 확인", {
    festivals: cultureStore.festivals,
    filteredFestivals: cultureStore.filteredFestivals,
    selectedFilters: cultureStore.selectedFilters,
    currentPage: cultureStore.currentPage,
  });
  showPopup.value = false;
  fetchFestivals();
  filterFestivals();
  currentPage.value = cultureStore.currentPage || 1;
  fetchBannerFestivals();
});

</script>

<template>
  <div class="w-full">
    
    <!-- 배너 섹션 -->
    <div class="w-screen relative">
      <Swiper
        :modules="[Pagination, EffectFade, Autoplay]"
        :effect="'fade'"
        :pagination="{ el: '.swiper-pagination', type: 'progressbar' }"
        @slideChange="onSlideChange"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        class="swiper h-[580px] pb-3"
      >
      <SwiperSlide v-for="(festival, index) in bannerFestivals" :key="index" @click="goToDetail(festival.content_id)" class="cursor-pointer">
        <div class="relative w-screen h-[580px] flex items-center justify-center overflow-hidden">
          
          <!-- ✅ 블러 처리된 배경 이미지 -->
          <div class="absolute inset-0 overflow-hidden">
            <img
              :src="festival.homepage || '/images/default-image.jpg'"
              class="w-full h-full object-cover brightness-90 blur-lg scale-150"
              alt="Festival Background"
            />
          </div>

          <!-- ✅ 메인 컨텐츠 박스 -->
          <div class="container max-w-[1600px] mx-auto flex items-center justify-between px-10 relative z-10">
            
            <!-- ✅ 배너 텍스트 -->
            <div class="max-w-[700px] text-mono-050 transition-opacity duration-700"
                :class="{ 'opacity-100': index === currentSlide, 'opacity-0': index !== currentSlide }">
              <h3 class="text-5xl font-bold drop-shadow-md">{{ festival.name }}</h3>
              <p class="text-xl mt-4 drop-shadow-md max-w-[600px]" @click.stop>
                {{ showFullText ? festival.overview : festival.overview.slice(0, 80) + '...' }}
                <button v-if="festival.overview.length > 80" @click="toggleText" class="text-main-400 ml-2 cursor-pointer" >
                  {{ showFullText ? "간략히" : "자세히" }}
                </button>
              </p>

            </div>

            <!-- ✅ 메인 이미지 -->
            <div class="relative flex justify-end">
              <img
                :src="festival.homepage || '/images/default-image.jpg'"
                class="max-w-[1000px] h-[400px] object-cover object-right"
                alt="Festival Main"
              />
            </div>

          </div>
        </div>
      </SwiperSlide>


        <!-- ✅ 프로그레스 바 (배너와 정렬) -->
        <!-- ✅ 프로그레스 바 (배너와 정렬) -->
        <div class="relative max-w-[1600px] mx-auto px-10">
          <div class="absolute left-0 !bottom-[90px] z-10 w-full">
            <div class="swiper-pagination progressbar"></div>
          </div>
        </div>
      </Swiper>
    </div>




    <div class="max-w-[1600px] mx-auto">
      <div class="flex justify-center flex-wrap gap-8 mt-10 md:flex-col lg:flex-row">
        <div class="flex-1 max-w-[1600px] min-w-[300px] w-full">
          <CalendarComponent @dateSelected="updateUpcomingEvents" />
        </div>
      </div>

      <div class="flex justify-center gap-8 mt-10 items-start">
        <FestivalSearchComponent @filterChanged="handleFilterChange" />
        <div class="flex flex-col items-center w-[1200px]">
          <!-- ✅ 카테고리 없음 팝업 -->
          <div v-if="showPopup" class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-mono-050 shadow-lg p-6 border border-mono-300 rounded-lg text-center w-[320px]">
            <p class="text-mono-900 font-semibold text-lg">선택된 카테고리에<br />축제/공연/행사가 없습니다</p>
            <button @click="closePopup" class="mt-4 bg-main-300 text-white px-4 py-2 rounded-md w-full">확인</button>
          </div>

          <!-- 카드 리스트 -->
          <div class="grid grid-cols-3 gap-4 w-full">
            <div
              v-for="(festival, index) in paginatedFestivals"
              :key="index"
              class="p-4 rounded-lg shadow border border-mono-300 cursor-pointer"
              @click="goToDetail(festival.content_id)"
            >
              <!-- 카테고리 -->
              <p class="text-sm text-mono-600 flex items-center mb-4">
                <span class="w-2 h-2 bg-main-400 rounded-full mr-2"></span>{{ getCategoryName(festival.category3) }}
              </p>

              <!-- 대표 이미지 -->
              <img :src="festival.homepage || '/images/default-image.jpg'" class="h-[340px] w-full object-cover rounded-lg" />

              <!-- 행사 제목 -->
              <div class="mt-4">
                <p class="font-bold text-xl text-mono-900 text-ellipsis w-full truncate h-[28px]">{{ festival.name  }}</p>
              </div>

              <!-- 일정 & 지역 -->
              <div class="mt-2 text-[12px] text-mono-600">
                {{ formatDate(festival.event_start_date) }} ~ {{ formatDate(festival.event_end_date) }}
                <br />
                {{ festival.gu_name }}
              </div>
            </div>
          </div>


          <PaginationComponent
            :totalPages="totalPages"
            :currentPage="currentPage"
            @pageChange="handlePageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* ✅ 프로그레스 바 중앙 정렬 */
:deep(.progressbar) {
  width: 700px;
  margin: 0 auto;
  height: 4px;
  background: rgba(0, 0, 0, 0.2);
}

/* ✅ 프로그레스 바 색상 */
:deep(.swiper-pagination-progressbar-fill) {
  background: rgba(255, 255, 255, 0.9);
}

/* ✅ 텍스트 가독성 개선 */
.drop-shadow-md {
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.6);
}
</style>