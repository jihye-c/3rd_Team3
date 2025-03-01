<template>
  <div>
    <HomeTitle title="문화생활" content="오늘은 집 밖에 나가는 날! 지금 핫한 전시 축제 공연을 만나보세요!"/>
    <div class="pt-10">
      <ul class="flex gap-6">
        <li v-for="i in 5" :key="i"><CultureCard src="https://cdn.danimgil.com/news/photo/202502/11337_11697_5757.jpg" title="강원관광두레 팝업스토어" category="전시" content="서울특별시 성동구 뚝섬로13길 36" /></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">

import HomeTitle from './common/HomeTitle.vue';
import CultureCard from '../CultureCard.vue';
</script>

<style scoped>

</style>
