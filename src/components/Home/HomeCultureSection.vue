<template>
  <div>
    <HomeTitle title="문화생활" link="/culture" content="오늘은 집 밖에 나가는 날! 지금 핫한 전시 축제 공연을 만나보세요!"/>
    <div class="pt-10">
      <ul class="flex  gap-6">
        <li v-for="(item,index) in festivalData" :key="index"><CultureCard src="https://cdn.danimgil.com/news/photo/202502/11337_11697_5757.jpg" :content="item.address" :link="item.homepage" :title="item.name" :category="getCategoryName(item.category3)" /></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">

import HomeTitle from './common/HomeTitle.vue';
import CultureCard from '../CultureCard.vue';
import CultureAPI from '@/apis/cultureApi';
import { onMounted, ref } from 'vue';
import { getCategoryName } from '@/utils/format';

const festivalData = ref<any[]>([]);

// ✅ API에서 데이터 가져오기
const fetchFestivals = async () => {
  try {
    const data = await CultureAPI.getSeoulFestivalsAndEvents();
    const sliceArray = data.slice(0, 5)
    festivalData.value = sliceArray;
  }catch (e) {
    console.error(e);
  }
};
onMounted(async()=>{
  await fetchFestivals()
  console.log(festivalData.value)
})
</script>

<style scoped>

</style>
