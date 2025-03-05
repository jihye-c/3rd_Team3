<script setup lang="ts">
  import BannerComponent from '@/components/BannerComponent.vue';
  import CommunityLinkBanner from '@/components/Subscription/CommunityLinkBanner.vue';
  import FullCalendar from '@fullcalendar/vue3';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import interactionPlugin from '@fullcalendar/interaction';
  import {getAptData, getHouseData} from '@/apis/SubscriptionApi';
  import {AptInfo, HouseInfo} from '@/types/SubscriptionTypes';
  import {useRoute, useRouter} from 'vue-router';
  import {reactive, ref, onMounted, watch} from 'vue';

  // 아파트, 기타 주택 유형 API
  const aptData = ref<AptInfo[] | null>(null);
  const houseData = ref<HouseInfo[] | null>(null);

  // 체크박스 관리
  const aptChecked = ref(false);
  const urbanChecked = ref(false);
  const officeChecked = ref(false);
  const residentialChecked = ref(false);
  const privateRentalChecked = ref(false);
  const publicSupportChecked = ref(false);

  const route = useRoute();
  const router = useRouter();

  const fetchData = async () => {
    try {
      const [aptResponse, houseResponse] = await Promise.all([getAptData(), getHouseData()]);
      aptData.value = aptResponse.data;
      houseData.value = houseResponse.data;
      console.log('API Data:', aptResponse);
      console.log('House Data:', houseResponse);
      updateCalendarEvents();
    } catch (e) {
      console.error(e);
    }
  };

  const getEventData = (data, filterCondition, color) => {
    return (
      data?.filter(filterCondition).map((item) => ({
        id: item.HOUSE_MANAGE_NO,
        title: item.HOUSE_NM,
        start: item.RCEPT_BGNDE || item.SUBSCRPT_RCEPT_BGNDE,
        end: item.RCEPT_ENDDE || item.SUBSCRPT_RCEPT_ENDDE,
        color: color,
      })) || []
    );
  };

  // 주택 유형별 목록 렌더링 관리
  const updateCalendarEvents = () => {
    let events = [];

    if (aptChecked.value) {
      events = events.concat(
        getEventData(aptData.value, (item) => item.HOUSE_SECD === '01', '#f89a00'),
      );
    }

    if (urbanChecked.value) {
      events = events.concat(
        getEventData(houseData.value, (item) => item.SEARCH_HOUSE_SECD === '0201', '#f25267'),
      );
    }

    if (officeChecked.value) {
      events = events.concat(
        getEventData(houseData.value, (item) => item.SEARCH_HOUSE_SECD === '0202', '#b05bff'),
      );
    }

    if (residentialChecked.value) {
      events = events.concat(
        getEventData(houseData.value, (item) => item.SEARCH_HOUSE_SECD === '0204', '#00bdec'),
      );
    }

    if (privateRentalChecked.value) {
      events = events.concat(
        getEventData(houseData.value, (item) => item.SEARCH_HOUSE_SECD === '0203', '#03d8b1'),
      );
    }

    if (publicSupportChecked.value) {
      events = events.concat(
        getEventData(houseData.value, (item) => item.SEARCH_HOUSE_SECD === '0303', '#00a083'),
      );
    }

    calendarOptions.events = events;
  };

  // URL 반영
  const updateURLQuery = () => {
    const query: {sort?: string[]} = {};

    const sort = [];
    if (aptChecked.value) sort.push('01');
    if (urbanChecked.value) sort.push('0201');
    if (officeChecked.value) sort.push('0202');
    if (residentialChecked.value) sort.push('0204');
    if (privateRentalChecked.value) sort.push('0203');
    if (publicSupportChecked.value) sort.push('0303');

    if (sort.length > 0) query.sort = sort;

    router.push({query});
  };

  watch(
    [
      aptChecked,
      urbanChecked,
      officeChecked,
      residentialChecked,
      privateRentalChecked,
      publicSupportChecked,
    ],
    () => {
      updateCalendarEvents();
      updateURLQuery();
    },
    {deep: true},
  );

  // 풀캘린더 함수
  const calendarOptions = reactive({
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    locale: 'ko',
    headerToolbar: {
      left: 'prev',
      center: 'title',
      right: 'next',
    },
    weekends: false,
    events: [],
    eventClick: function (info: {event: {id: string}}) {
      router.push(`/subscription/${info.event.id}`);
    },
  });

  const initializeCheckBoxes = (sort) => {
    if (Array.isArray(sort)) {
      sort.forEach((s) => {
        toggleCheckBox(s);
      });
    } else if (sort) {
      toggleCheckBox(sort);
    }
  };

  const toggleCheckBox = (sort) => {
    switch (sort) {
      case '01':
        aptChecked.value = true;
        break;
      case '0201':
        urbanChecked.value = true;
        break;
      case '0202':
        officeChecked.value = true;
        break;
      case '0204':
        residentialChecked.value = true;
        break;
      case '0203':
        privateRentalChecked.value = true;
        break;
      case '0303':
        publicSupportChecked.value = true;
        break;
    }
  };

  onMounted(() => {
    const sort = route.query.sort as string | string[] | undefined;
    console.log('sort:', sort);
    initializeCheckBoxes(sort);
    fetchData();
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
          <input
            type="checkbox"
            id="apt"
            class="custom-checkbox apt mr-2"
            v-model="aptChecked"
            @change="updateCalendarEvents"
          />
          <label for="apt">APT</label>
        </div>
        <div class="flex items-center mb-5 mt-7">
          <input
            type="checkbox"
            id="urban"
            class="custom-checkbox urban mr-2"
            v-model="urbanChecked"
            @change="updateCalendarEvents"
          />
          <label for="urban">도시형 생활주택</label>
        </div>
        <div class="flex items-center mb-5">
          <input
            type="checkbox"
            id="office"
            class="custom-checkbox office mr-2"
            v-model="officeChecked"
            @change="updateCalendarEvents"
          />
          <label for="office">오피스텔</label>
        </div>
        <div class="flex items-center mb-5">
          <input
            type="checkbox"
            id="residential"
            class="custom-checkbox residential mr-2"
            v-model="residentialChecked"
            @change="updateCalendarEvents"
          />
          <label for="residential">생활형 숙박시설</label>
        </div>
        <div class="flex items-center mb-5">
          <input
            type="checkbox"
            id="private-rental"
            class="custom-checkbox private-rental mr-2"
            v-model="privateRentalChecked"
            @change="updateCalendarEvents"
          />
          <label for="private-rental">민간임대</label>
        </div>
        <div class="flex items-center mb-5">
          <input
            type="checkbox"
            id="public-support"
            class="custom-checkbox public-support mr-2"
            v-model="publicSupportChecked"
            @change="updateCalendarEvents"
          />
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

  .fc-event {
    margin-top: 2px !important; /* 이벤트 간의 간격 조정 */
    margin-bottom: 2px !important; /* 이벤트 간의 간격 조정 */
    margin-left: 10px !important;
    margin-right: 10px !important;
  }
</style>
