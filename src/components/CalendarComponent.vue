<script setup>
import { ref, computed, defineEmits, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import CultureAPI from '@/apis/cultureApi';

const emit = defineEmits(['dateSelected']);
const router = useRouter(); // ✅ 라우터 사용

const selectedDate = ref(new Date());
const currentDate = ref(new Date());
const events = ref([]);
const hoveredEvents = ref([]); // 마우스 호버된 날짜에 포함된 축제 목록
const hoverPosition = ref({ x: 0, y: 0 }); // 팝업 위치

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

const categoryMap = Object.fromEntries(subCategories.map(item => [item.code, item.name]));

// ✅ 일정 제목을 일정 길이로 자르는 함수 (예: 15자 이상이면 "..." 추가)
const truncateTitle = (title, maxLength = 15) => {
  return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
};

// ✅ API에서 축제 데이터 가져오기
const fetchEvents = async () => {
  try {
    console.log("🎯 API 요청 시작: 행사 목록 조회");
    const data = await CultureAPI.getSeoulFestivalsAndEvents();
    console.log("📌 받아온 데이터:", data);
    
    events.value = data.map(event => ({
      contentId: event.content_id,
      start: event.event_start_date,
      end: event.event_end_date,
      title: event.name,
      category: categoryMap[event.category3] || "기타",
      gu_name: event.gu_name || "알 수 없음"
    }));
  } catch (error) {
    console.error("❌ API 요청 오류:", error);
  }
};

onMounted(fetchEvents);

// ✅ 이전 달로 이동
const prevMonth = () => {
  currentDate.value.setMonth(currentDate.value.getMonth() - 1);
  currentDate.value = new Date(currentDate.value);
};

// ✅ 다음 달로 이동
const nextMonth = () => {
  currentDate.value.setMonth(currentDate.value.getMonth() + 1);
  currentDate.value = new Date(currentDate.value);
};

// ✅ 선택된 날짜와 가까운 일정 4개 반환
const upcomingEvents = computed(() => {
  const selectedDateString = selectedDate.value.toISOString().split('T')[0].replace(/-/g, '');
  return events.value
    .filter(event => event.start >= selectedDateString)
    .sort((a, b) => new Date(a.start) - new Date(b.start))
    .slice(0, 4);
});

// ✅ 날짜 클릭 시 선택된 날짜 업데이트 후 이벤트 전달
const selectDate = (event) => {
  selectedDate.value = event;
  const selectedDateString = selectedDate.value.toISOString().split('T')[0].replace(/-/g, '');
  emit('dateSelected', selectedDateString);
};

// ✅ 특정 날짜에 포함된 축제 찾기 (마우스 호버 시)
const findEventsForDate = (event, date) => {
  const formattedDate = date.toISOString().split('T')[0].replace(/-/g, '');
  hoveredEvents.value = events.value.filter(event => formattedDate >= event.start && formattedDate <= event.end);

  // 마우스 위치 저장 (팝업 위치 조정)
  hoverPosition.value = {
    x: event.clientX,
    y: event.clientY
  };
};

// ✅ 날짜 포맷 변경 함수 (20240102 → 2024.01.02)
const formatDate = (dateString) => {
  if (!dateString || dateString.length !== 8) return "날짜 미정";
  return `${dateString.substring(0, 4)}.${dateString.substring(4, 6)}.${dateString.substring(6, 8)}`;
};

// ✅ 로컬 시간 기준으로 날짜 변환하는 함수
const getFormattedDate = (date) => {
  if (!date) return "날짜 미정";
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().split('T')[0].replace(/-/g, '');
};

const goToDetail = (contentId) => {
  router.push(`/culture/${contentId}`); // ✅ 해당 축제 상세 페이지로 이동
};

</script>

<template>
  <div class="flex justify-center flex-wrap gap-8 mt-10 md:flex-col lg:flex-row">
    <!-- 달력 -->
    <div class="flex-1 max-w-[700px] min-w-[300px] w-full">
      <div class="calendar-container border border-mono-300 shadow-md flex flex-col justify-between">
        <!-- 달력 상단 헤더 -->
        <div class="calendar-header">
          <button class="nav-btn" @click="prevMonth">&lt;</button>
          <span class="calendar-title">{{ currentDate.getFullYear() }}.{{ (currentDate.getMonth() + 1).toString().padStart(2, '0') }}</span>
          <button class="nav-btn" @click="nextMonth">&gt;</button>
        </div>

        <!-- 달력 UI -->
        <VueCal
          active-view="month"
          locale="en"
          :disable-past="true"
          hide-view-navigation
          :disable-views="['years', 'year', 'week', 'day']"
          class="custom-calendar flex-grow"
          :selected-date="currentDate"
          @cell-click="selectDate"
          @cell-mouseover="(event, date) => findEventsForDate(event, date)"
          @cell-mouseleave="hoveredEvents = []"
        />
      </div>
    </div>

    <!-- ✅ 다가오는 일정 (CultureView.vue와 동일한 디자인 적용) -->
    <div class="p-6 border-t border-mono-300">
      <h2 class="text-[32px] font-semibold text-mono-900 text-left">
        {{ formatDate(getFormattedDate(selectedDate)) }}
      </h2>

      <div class="grid grid-cols-2 gap-4 mt-4">
        <div 
        v-for="(event, index) in upcomingEvents" 
        :key="index" 
        class="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-100 transition"
        @click="goToDetail(event.contentId)" 
        >
          <span class="bg-main-400 text-white text-sm px-2 py-1 rounded w-fit inline-block">
            {{ event.category }}
          </span>
          <!-- ✅ 다가오는 일정에서 일정 제목 적용 -->
          <p class="text-[24px] font-semibold mt-2 text-mono-900" :title="event.title">
            {{ truncateTitle(event.title, 15) }} 
          </p>

          <p class="text-[16px] text-mono-600">
            행사기간 : {{ formatDate(event.start) }} ~ {{ formatDate(event.end) }} | 장소 : {{ event.gu_name }}
          </p>
        </div>
      </div>
    </div>

    <!-- 🔹 마우스 호버 시 해당 날짜에 포함된 축제 표시 -->
    <div 
      v-if="hoveredEvents.length"
      class="hovered-events bg-white shadow-lg p-3 border border-mono-300 rounded absolute"
      :style="{ top: hoverPosition.y + 'px', left: hoverPosition.x + 'px' }"
    >
      <h2 class="text-md font-semibold mb-2">이날 진행 중인 행사</h2>
      <ul>
        <li v-for="(event, index) in hoveredEvents" :key="index" class="text-sm py-1">
          {{ event.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
/* 전체 캘린더 컨테이너 */
.calendar-container {
  width: 100%;
  height: 380px;
  border-radius: 10px;
  padding: 10px;
  background: white;
  box-sizing: border-box;
}

/* 캘린더 UI 크기 조정 */
.custom-calendar {
  width: 100%;
  height: 100%;
  padding: 5px;
  box-sizing: border-box;
}

/* 캘린더 상단 네비게이션 */
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  font-size: 24px;
  font-weight: bold;
}

/* 네비게이션 버튼 */
.nav-btn {
  background: var(--color-main-400);
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  color: black;
  font-size: 18px;
}

/* 타이틀 (연월 표시) */
.calendar-title {
  flex: 1;
  text-align: center;
}

/* Month 글자 제거 */
.custom-calendar .vuecal__title-bar,
.custom-calendar .vuecal__menu {
  display: none !important;
  visibility: hidden;
  height: 0;
  overflow: hidden;
}

/* 마우스 호버 시 나타나는 축제 목록 */
.hovered-events {
  position: absolute;
  background: #f9f9f9;
  border-radius: 5px;
  padding: 10px;
  z-index: 50;
  font-size: 14px;
  width: 200px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
/* 요일 스타일 */
.custom-calendar .vuecal__weekdays {
  font-size: 14px;
  font-weight: bold;
  color: black;
}

/* 날짜 스타일 */
.custom-calendar .vuecal__cell-content {
  font-size: 16px;
  color: black;
}
.custom-calendar .vuecal__cell:hover {
  background: var(--color-main-300); /* 연한 오렌지색 */
  transition: background-color 0.2s ease-in-out;
}
/* 선택된 날짜 스타일 */
.custom-calendar .vuecal__cell--selected {
  background: var(--color-main-400);
  color: black !important;
}
/* 다가오는 일정 스타일 */
.upcoming-events {
  background: #f9f9f9;
  border-radius: 5px;
}

</style>