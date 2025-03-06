<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import CultureAPI from "@/apis/cultureApi"; // ✅ API 가져오기
import { useCultureStore } from "../stores/cultureStore";
 // ✅ Pinia 상태 관리

import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import CalendarComponent from "@/components/CalendarComponent.vue";
import FestivalSearchComponent from "@/components/FestivalSearchComponent.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";

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

      // ✅ 기존 데이터가 있으면 API 호출을 생략
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
    console.log("🎯 API 요청 시작...");
    const data = await CultureAPI.getSeoulFestivalsAndEvents();
    console.log("📌 받아온 데이터:", data);

    if (data.length > 0) {
      // ✅ 개별 이벤트 상세 정보 가져오기 (overview, 상세 내용, 이미지 포함)
      const detailedData = await Promise.all(
        data.map(async (event) => {
          try {
            const [details, info, images] = await Promise.all([
              CultureAPI.getEventDetail(event.content_id, event.content_type_id),
              CultureAPI.getEventInfo(event.content_id, event.content_type_id),
              CultureAPI.getEventImages(event.content_id),
            ]);

            return {
              ...event,
              category2: event.category2 || "", // 행사 분류
              category3: event.category3 || "기타", // 상세 분류
              overview: details?.overview || "설명 없음",
              event_info: info || [],
              images: images || [],
            };
          } catch (err) {
            console.error(`❌ 상세 정보 가져오기 실패 (ID: ${event.content_id})`, err);
            return {
              ...event,
              category2: event.category2 || "",
              category3: event.category3 || "기타",
              overview: "설명 없음",
              event_info: [],
              images: [],
            };
          }
        })
      );
      console.log("📌 상세 정보 포함된 데이터:", detailedData);

      cultureStore.setFestivals(detailedData);
      cultureStore.setFilteredFestivals(detailedData);

      festivalData.value = detailedData;
      filteredFestivals.value = detailedData; 
      
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
});

</script>

<template>
  <div class="w-full">
    <!-- 배너 -->
    <div class="w-full h-[582px] relative">
      <Swiper :modules="[Pagination, Autoplay]" :pagination="{ clickable: true }" :autoplay="{ delay: 3000, disableOnInteraction: false }" :loop="true" :speed="2000">
        <SwiperSlide v-for="(festival, index) in filteredFestivals.slice(0, 10)" :key="index" class="relative">
          <div
            class="absolute top-1/2 right-[5%] sm:right-[10%] md:right-[15%] lg:right-[160px]
            transform -translate-y-1/2 text-mono-100 text-right p-4 md:p-8 z-20 max-w-[900px] flex flex-col items-end"
          >
            <p class="text-[16px] sm:text-[18px] md:text-[20px] whitespace-nowrap">
              {{ festival.gu_name }}
            </p>

            <p class="text-[32px] sm:text-[40px] md:text-[48px] font-bold whitespace-nowrap">
              {{ festival.name }}
            </p>

            <p class="text-[16px] sm:text-[18px] md:text-[20px] whitespace-nowrap overflow-hidden text-ellipsis max-w-[90%]">
              {{ festival.overview.split('.')[0] }}.
            </p>
          </div>

          <div class="absolute inset-0 bg-gradient-to-r from-transparent to-pink-main opacity-95 pointer-events-none z-10"></div>
          <img :src="festival.homepage || '/images/default-image.jpg'" class="w-full h-[582px] object-cover" />
        </SwiperSlide>
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
              <p class="text-sm text-mono-600 flex items-center mb-4">
                <span class="w-2 h-2 bg-main-400 rounded-full mr-2"></span>{{ getCategoryName(festival.category3) }}
              </p>
              <img :src="festival.homepage || '/images/default-image.jpg'" class="h-[340px] w-full object-cover rounded-lg" />
              <div class="mt-4">
                <p class="font-bold text-mono-900">{{ festival.name }}</p>
                <p class="text-mono-600 whitespace-nowrap overflow-hidden text-ellipsis max-w-[90%]">
                  {{ festival.overview.split('.')[0] }}.
                </p>
              </div>
              <div class="mt-4 text-[12px] text-mono-600">
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
