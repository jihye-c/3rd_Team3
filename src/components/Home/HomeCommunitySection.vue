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
        <img src="/public/home/main_community_back.png" alt="" />
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
        <div class="flex py-10 flex-col justify-around h-full">
          <CommunityCard/>
          <CommunityCard/>
          <CommunityCard/>

        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref} from 'vue';
  import {Motion} from 'motion-v';
  import HomeTitle from './common/HomeTitle.vue';
  import HomeCommunityIcons from './common/HomeCommunityIcons.vue';
import CommunityCard from './common/CommunityCard.vue';
  const tabs = [
    {name: '동네정보', icon: 'icon1'},
    {name: 'Q&A', icon: 'icon2'},
    {name: '나만의 레시피', icon: 'icon3'},
    {name: '중고거래', icon: 'icon4'},
  ];

  const duration = 0.3;
  const selected = ref(0);

  const selectTab = (i: number) => {
    selected.value = i;
  };
</script>
