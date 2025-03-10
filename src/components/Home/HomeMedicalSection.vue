<script lang="ts" setup>
import MedicalItem from '../ui/MedicalItem.vue';
 const items = [{
   src:"/home/main_medical1.webp",
   alt:"복통 아이콘",
   caption:"복통"
 },{
   src:"/home/main_medical2.webp",
   alt:"열나는 사진",
   caption:"열/오한"
 },{
   src:"/home/main_medical3.webp",
   alt:"화상 사진",
   caption:"화상"
 },{
   src:"/home/main_medical4.webp",
   alt:"이명 사진",
   caption:"이명"
 },{
   src:"/home/main_medical5.webp",
   alt:"구토 사진",
   caption:"구토"
 },{
   src:"/home/main_medical6.webp",
   alt:"기침 사진",
   caption:"기침"
 },{
   src:"/home/main_medical7.webp",
   alt:"골절 사진",
   caption:"골절"
 },]

</script>

<template>
  <div class="">
    <div class="w-full flex h-[376px] rounded-tr-[100px] rounded-bl-[100px] overflow-hidden">
      <div class="bg-main-400 w-[517px] px-2 grow-0 flex items-center justify-center h-full p-4">
        <div class="flex flex-col justify-start items-start">
          <div>
            <v-icon class="text-main-50" size="34px">mdi-hospital-box</v-icon>
            <div class="text-4xl py-3 font-semibold text-mono-050">
              혼자서 아프면 <br />
              서러우니까
            </div>
          </div>
          <div class="py-3 text-lg font-semibold text-mono-900">
            가까운 병원 정보를 손쉽게 찾아보세요.
          </div>
          <div class="w-full py-3">
            <v-btn block density="compact" size="large" append-icon="mdi-chevron-right"
              >전체 병원 목록</v-btn
            >
          </div>
        </div>
      </div>
      <div class="bg-main-50 relative h-full p-4 px-10 w-full">
        <div class="py-4">
          <p class="py-2 pb-6 text-2xl font-semibold">어디가 아프신가요?</p>
          <ul class="flex gap-4">
            <li v-for="(item,index) in items" :key="index">
              <MedicalItem :src="item.src" :alt="item.alt" :caption="item.caption" />
            </li>
          </ul>
        </div>
        <div class="py-4">
          <p class="py-2 pb-6 text-2xl font-semibold">어느 병원이 궁금하세요?</p>
          <div>
            <ul class="flex gap-2">
            <li class=" bg-[#fff] flex items-center leading-10px px-3 py-1 rounded-lg border-1 border-main-400"> 대학병원 </li>
            <li class=" bg-[#fff] flex items-center leading-10px px-3 py-1 rounded-lg border-1 border-main-400"> 동네병원 </li>

            </ul>
          </div>
        </div>
        <div class="absolute right-0 bottom-0"><img src="/home/main_medical_hero.webp" alt=""></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  /* Vuetify 스타일을 덮어씌우고 싶다면 여기에 작성 */
  :deep(.v-btn--variant-elevated) {
    box-shadow: none;
  }
</style>
