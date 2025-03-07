<template>
  <HomeTitle title="커뮤니티" link="/community/question" content="자취의 다양한 소식을 들을 수 있는 꿀팁 커뮤니티" />
  <div class="flex py-10 gap-10">
    <div>
      <div
        class="w-[350px] py-3 h-[350px] grid grid-cols-2 gap-2 relative rounded-[21px] bg-white/20 p-1.5"
      >
        <Motion
          as="div"
          v-for="(tab, i) in tabs"
          :key="i"
          class="rounded-[15px] relative px-4 py-2 text-lg font-bold cursor-pointer flex flex-col items-center justify-center"
          :initial="{
            color: i === selected ? 'var(--color-main-400)' : '#222',
            border: i === selected ? 'none' : '1px solid #eee',
          }"
          :animate="{
            color: i === selected ? 'var(--color-main-400)' : '#222',
            border: i === selected ? 'none' : '1px solid #eee',
          }"
          :transition="{duration}"
          @click="selectTab(i)"
        >
          <div><HomeCommunityIcons :icon-type="tab.icon" :size="80" /></div>
          <p class="relative z-10">
            {{ tab.name }}
          </p>
          <Motion
            v-if="i === selected"
            class="absolute top-0 left-0 w-full h-full border-4 rounded-[15px]"
            layout-id="selected"
            :initial="{borderColor: 'var(--color-main-400)'}"
            :animate="{borderColor: 'var(--color-main-400)'}"
            :transition="{duration}"
          />
        </Motion>
      </div>
      <div>
        <img src="/home/main_community_back.png" alt="" />
      </div>
    </div>
    <div class="w-full mb-20 rounded-xl p-15  bg-mono-050">
         <div class="pb-5 flex justify-between">
          <h4 class="text-2xl  font-semibold">최근 게시물</h4>
          <div class="flex text-mono-400 items-center">
            <span>더보기</span>
            <v-icon>mdi-chevron-right</v-icon>
          </div>
        </div>
        <div v-if="selectedData.length" class="flex py-10 flex-col justify-around h-full">
  <CommunityCard v-for="(item, index) in selectedData" :key="index" :item="item" />
</div>
<div v-else class="text-center text-gray-500 py-5">
  데이터가 없습니다.
</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, computed, onUpdated } from 'vue';
import { Motion } from 'motion-v';
import HomeTitle from './common/HomeTitle.vue';
import HomeCommunityIcons from './common/HomeCommunityIcons.vue';
import CommunityCard from './common/CommunityCard.vue';
import { programmersApiInstance } from "@/utils/axiosInstance";
import type { Post } from "@/types/PostResponse";

const duration = 0.3;
const selected = ref(0);

const CHANNEL_IDS = {
  REVIEW: "67bfdc45ff075444a9c22eb9",
  QUESTION: "67bfdc27ff075444a9c22eb5",
  RECIPE: "67bfd6f8ff075444a9c22ea8",
  RESALE: "67bfd728ff075444a9c22eac",
};

const tabs = [
  { name: '동네정보', icon: 'icon1', channelId: CHANNEL_IDS.REVIEW },
  { name: 'Q&A', icon: 'icon2', channelId: CHANNEL_IDS.QUESTION },
  { name: '나만의 레시피', icon: 'icon3', channelId: CHANNEL_IDS.RECIPE },
  { name: '중고거래', icon: 'icon4', channelId: CHANNEL_IDS.RESALE },
];

const recipeCommunityData = ref<Post[]>([]);
const questionData = ref<Post[]>([]);
const reviewData = ref<Post[]>([]);
const resaleData = ref<Post[]>([]);

const channelDataRefs = {
  [CHANNEL_IDS.RECIPE]: recipeCommunityData,
  [CHANNEL_IDS.QUESTION]: questionData,
  [CHANNEL_IDS.REVIEW]: reviewData,
  [CHANNEL_IDS.RESALE]: resaleData,
};

// 선택된 탭의 데이터 가져오기
const selectedData = computed(() => {
  const selectedChannelId = tabs[selected.value].channelId;
  return channelDataRefs[selectedChannelId]?.value || [];
});

async function fetchChannelData(channelId: string) {
  try {
    const response = await programmersApiInstance.get(`/posts/channel/${channelId}`);
    return response.data.slice(0, 3).map((item: Post) => ({
      ...item,
      title: JSON.parse(item.title),
      author: JSON.parse(item.author.fullName),
    }));
  } catch (error) {
    console.error(`채널(${channelId}) 데이터를 불러오는 중 오류 발생:`, error);
    return [];
  }
}
onUpdated(()=>{
  console.log(selectedData.value)
})
onBeforeMount(async () => {
  try {
    const channelIds = Object.keys(channelDataRefs);
    const responses = await Promise.all(channelIds.map(fetchChannelData));

    channelIds.forEach((channelId, index) => {
      channelDataRefs[channelId].value = responses[index];
    });
  } catch (error) {
    console.error("채널 데이터 로딩 중 오류 발생:", error);
  }
});

const selectTab = (i: number) => {
  selected.value = i;
};
</script>
