<script setup lang="ts">
  import BannerComponent from '@/components/BannerComponent.vue';
  import CommunityLinkBanner from '@/components/Subscription/CommunityLinkBanner.vue';
  import {reactive} from 'vue';
  import FullCalendar from '@fullcalendar/vue3';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import interactionPlugin from '@fullcalendar/interaction';

  const eventsData = [
    {title: 'Event 1', date: '2025-02-21'},
    {title: 'Event 1-1', date: '2025-02-21'},
    {title: 'Event 2', date: '2025-02-22'},
    {title: 'Event 3', date: '2025-02-23'},
    {title: 'Event 4', date: '2025-02-24'},
  ];

  const calendarOptions = reactive({
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',

    locale: 'ko', // 한국어버전

    headerToolbar: {
      // 상단 배치
      left: 'prev',
      center: 'title',
      right: 'next',
    },

    weekends: false,

    events: eventsData,

    eventClick: function (info: {event: {title: string}}) {
      alert('Event: ' + info.event.title);
    },
  });
</script>

<template>
  <BannerComponent
    background="/images/subscription/subscriptionDetailBanner.png"
    title="자수성가 청약 캘린더"
    subtitle="청약 일정, 놓치지 마세요!"
    :breadcrumbs="[
      {title: '홈', href: '/'},
      {title: '청약', href: '/subscription'},
      {title: '청약 캘린더'},
    ]"
  />
  <div class="container">
    <div class="flex justify-between">
      <section class="mt-42 w-80 text-xl">
        <div class="font-bold text-3xl border-b-1 border-mono-300 pb-4">공급유형</div>
        <div class="flex items-center mb-5 mt-7">
          <input type="checkbox" id="apt" class="custom-checkbox apt mr-2" />
          <label for="apt">APT</label>
        </div>
        <div class="flex items-center mb-5">
          <input type="checkbox" id="urban" class="custom-checkbox urban mr-2" />
          <label for="urban">도시형 생활주택</label>
        </div>
        <div class="flex items-center mb-5">
          <input type="checkbox" id="office" class="custom-checkbox office mr-2" />
          <label for="office">오피스텔</label>
        </div>
        <div class="flex items-center mb-5">
          <input type="checkbox" id="residential" class="custom-checkbox residential mr-2" />
          <label for="residential">생활형 숙박시설</label>
        </div>
        <div class="flex items-center mb-5">
          <input type="checkbox" id="private-rental" class="custom-checkbox private-rental mr-2" />
          <label for="private-rental">민간임대</label>
        </div>
        <div class="flex items-center mb-5">
          <input type="checkbox" id="public-support" class="custom-checkbox public-support mr-2" />
          <label for="public-support">공공지원 민간임대</label>
        </div>
      </section>

      <section class="w-298 m-19">
        <FullCalendar :options="calendarOptions" />
      </section>
    </div>
  </div>

  <CommunityLinkBanner />
</template>

<style>
  .custom-checkbox {
    appearance: none;
    width: 24px;
    height: 24px;
    border: 4px solid #ccc;
    border-radius: 50%;
    transition: background-color 0.3s;
  }

  .custom-checkbox.apt:checked {
    background-color: #f89a00; /* APT 색상 */
    border-color: #f89a00;
  }

  .custom-checkbox.urban:checked {
    background-color: #f25267; /* 도시형 생활주택 색상 */
    border-color: #f25267;
  }

  .custom-checkbox.office:checked {
    background-color: #b05bff; /* 오피스텔 색상 */
    border-color: #b05bff;
  }

  .custom-checkbox.residential:checked {
    background-color: #00bdec; /* 생활형 숙박시설 색상 */
    border-color: #00bdec;
  }

  .custom-checkbox.private-rental:checked {
    background-color: #03d8b1; /* 민간임대 색상 */
    border-color: #03d8b1;
  }

  .custom-checkbox.public-support:checked {
    background-color: #00a083; /* 공공지원 민간임대 색상 */
    border-color: #00a083;
  }

  .fc .fc-toolbar {
    align-items: center;
    display: flex;
    justify-content: left !important;
    gap: 32px;
    font-weight: bold;
  }

  .fc .fc-button-primary {
    background-color: #f89a00 !important;
    border: none !important;
  }
</style>
