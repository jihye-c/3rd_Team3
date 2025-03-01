<template>
  <div class="flex w-full gap-4">
    <div class="flex flex-col gap-15">
      <HomeTitle title="이 달의 청약정보" content="놓치지 말아야 할 이 달의 청약정보" />
      <DatePicker
        expanded
        locale="en"
        first-day-of-week="2"
        :masks="{ title: 'YYYY.MM', weekdays: 'WWW' }"
        v-model="date"
      ></DatePicker> <!-- ✅ Self-closing 문제 해결 -->
    </div>
    <div class="w-full mt-6 rounded-lg bg-mono-100">dd</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

import HomeTitle from './common/HomeTitle.vue';

const date = ref(new Date());
</script>

<style scoped>
:deep(.vc-title) {
  font-weight: 800;
}
:deep(.vc-bordered) {
  padding: 5px 80px;
  width: 653px;
  height: 400px;
}
:deep(.vc-weekday){
  font-weight: 400;
}
:deep(.vc-header){
  padding: 0 100px;
  margin: 20px 0px;
}
:deep(.vc-arrow){
  width: 25px;
  height: 25px;
  color:#fff;
  background-color: var(--color-main-400);
}
:deep(.vc-day){
  min-height: 45px;
}
</style>
