<script lang="ts" setup>
  import {ref} from 'vue';
  import {RouterLink} from 'vue-router';

  interface Subscription {
    id: number;
    name: string;
    location: string;
    details: string[];
    scale: string;
    imgURL: string;
    specialStartDates: string;
    specialEndDates: string;
    applicationStartDates: string;
    applicationEndDates: string;
  }

  const subscriptions = ref<Subscription[]>([
    {
      id: 2025950010,
      name: '잠실역 웰리지더테라스',
      location: '서울특별시 송파구 올림픽로34길 5-14',
      details: ['민영', '오피스텔', '송파구'],
      scale: '5 세대',
      imgURL:
        'https://i.namu.wiki/i/pPzWnZ9kD_0GpUF8rhzAY7f3jSAy0d3Aj0kN4k2ac7umK-kF_-OQF3Qx-ASaaYW7g7MNd2qXr3oUiVVmZ6jz1w.webp',
      specialStartDates: '03월 12일',
      specialEndDates: '03월 13일',
      applicationStartDates: '03월 12일',
      applicationEndDates: '03월 13일',
    },
    {
      id: 2025950009,
      name: '더샵 강동센트럴시티',
      location: '서울특별시 강동구 천호동 400-100번지',
      details: ['민영', '오피스텔', '강동구'],
      scale: '6 세대',
      imgURL: 'https://cdn.hankyung.com/photo/202412/AA.38878917.1.jpg',
      specialStartDates: '03월 17일',
      specialEndDates: '03월 17일',
      applicationStartDates: '03월 17일',
      applicationEndDates: '03월 17일',
    },
    {
      id: 2025950008,
      name: '상월곡역 장위아트포레',
      location: '서울특별시 성북구 석관동 338-18',
      details: ['민영', '도시형생활주택', '성북구'],
      scale: '6 세대',
      imgURL: 'https://cdn.hankyung.com/photo/202411/AA.38716430.1.jpg',
      specialStartDates: '03월 4일',
      specialEndDates: '03월 6일',
      applicationStartDates: '03월 4일',
      applicationEndDates: '03월 6일',
    },
  ]);

  const selectedSubscription = ref<Subscription>(subscriptions.value[0]);

  const selectSubscription = (subscription: Subscription) => {
    selectedSubscription.value = subscription;
  };
</script>

<template>
  <section class="bg-main-50 h-84 mt-20">
    <div class="container relative">
      <div class="ft-point text-7xl pt-10 pb-6">오늘의 청약</div>
      <div class="text-3xl mt-5">
        <div
          v-for="subscription in subscriptions"
          :key="subscription.id"
          class="flex items-center mb-3"
          :class="{
            'font-bold text-4xl': selectedSubscription.id === subscription.id,
            'text-3xl': selectedSubscription.id !== subscription.id,
          }"
          @click="selectSubscription(subscription)"
        >
          <template v-if="selectedSubscription.id === subscription.id">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
              <rect y="0.500488" width="24" height="24" rx="12" fill="#FFBE46" fill-opacity="0.5" />
              <rect x="6" y="7.00049" width="12" height="12" rx="6" fill="#FFFBEF" />
              <rect
                x="6"
                y="7.00049"
                width="12"
                height="12"
                rx="6"
                stroke="#F89A00"
                stroke-width="4"
              />
            </svg>
          </template>
          <template v-else>
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
          </template>
          <button
            :class="{
              'text-main-400 cursor-pointer ml-3': selectedSubscription.id === subscription.id,
              'cursor-pointer ml-3': selectedSubscription.id !== subscription.id,
            }"
          >
            {{ subscription.name }}
          </button>
        </div>
      </div>
      <RouterLink
        :to="'/subscription/' + selectedSubscription.id"
        class="absolute w-284 h-88 bg-mono-050 drop-shadow-lg rounded-2xl top-24 right-0"
      >
        <div class="px-8 py-7 flex">
          <div class="size-74 rounded-2xl overflow-hidden">
            <img :src="selectedSubscription.imgURL" alt="" class="size-74 object-cover" />
          </div>
          <div class="ml-8 h-74 w-186">
            <div class="font-semibold text-4xl">{{ selectedSubscription.name }}</div>
            <div class="text-mono-500 mt-1">{{ selectedSubscription.location }}</div>
            <div class="flex mt-3">
              <div
                v-for="detail in selectedSubscription.details"
                :key="detail"
                class="bg-mono-200 px-2 py-1 mr-2 rounded-sm"
              >
                {{ detail }}
              </div>
            </div>
            <div class="flex justify-between mt-21">
              <div>분양규모</div>
              <div class="text-xl">{{ selectedSubscription.scale }}</div>
            </div>
            <hr class="border-mono-200" />
            <div class="flex justify-between mt-2">
              <div>특별청약일</div>
              <div class="text-xl">
                {{ selectedSubscription.specialStartDates }} ~
                {{ selectedSubscription.specialEndDates }}
              </div>
            </div>
            <div class="flex justify-between mt-2">
              <div>청약 접수일</div>
              <div class="text-xl">
                {{ selectedSubscription.applicationStartDates }} ~
                {{ selectedSubscription.applicationEndDates }}
              </div>
            </div>
          </div>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped></style>
