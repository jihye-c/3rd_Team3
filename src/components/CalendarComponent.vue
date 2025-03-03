<script setup>
import { ref } from 'vue';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

const selectedDate = ref(new Date());

const events = ref([
  { start: '2025-02-10', end: '2025-02-20', title: '강원관광두레 팝업스토어', class: 'event-exhibition' },
  { start: '2025-02-28', end: '2025-03-03', title: '서울스프링페스타', class: 'event-festival' },
]);

const currentDate = ref(new Date());

const prevMonth = () => {
  currentDate.value.setMonth(currentDate.value.getMonth() - 1);
  currentDate.value = new Date(currentDate.value);
};

const nextMonth = () => {
  currentDate.value.setMonth(currentDate.value.getMonth() + 1);
  currentDate.value = new Date(currentDate.value);
};
</script>

<template>
  <div class="calendar-container">
    <!-- 달력 상단 헤더 -->
    <div class="calendar-header">
      <button class="nav-btn" @click="prevMonth">&lt;</button>
      <span class="calendar-title">{{ currentDate.getFullYear() }}.{{ (currentDate.getMonth() + 1).toString().padStart(2, '0') }}</span>
      <button class="nav-btn" @click="nextMonth">&gt;</button>
    </div>

    <!-- 달력 UI -->
    <VueCal
      :events="events"
      active-view="month"
      locale="en"
      :disable-past="true"
      hide-view-navigation
      :disable-views="['years', 'year', 'week', 'day']"
      class="custom-calendar"
      :selected-date="currentDate"
      @cell-click="(event) => selectedDate = event"
    />
  </div>
</template>

<style>
/* 전체 캘린더 컨테이너 */
.calendar-container {
  width: 652px;
  height: 380px;
  border-radius: 10px;
  padding: 10px;
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
  background: #FFA500; /* color/main/400 */
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

/* 달력 스타일 */
.custom-calendar {
  width: 100%;
  height: 320px;
}

/* Month 글자 제거 */
.custom-calendar .vuecal__title-bar,
.custom-calendar .vuecal__menu {
  display: none !important;
  visibility: hidden;
  height: 0;
  overflow: hidden;
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

/* 이벤트 색상 */
.event-exhibition {
  background-color: #ffcc00;
}
.event-festival {
  background-color: #ff6699;
}
</style>




