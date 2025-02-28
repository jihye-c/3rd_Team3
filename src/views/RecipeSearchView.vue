<script setup lang="ts"></script>

<template>
  <!-- 배너 -->
  <div class="w-full h-[340px] overflow-hidden">
    <div class="bg-[url(/recipe/recipe_search_banner.webp)] w-full h-full bg-cover bg-center">
      <div class="w-full h-full bg-mono-900/30 flex place-content-center pb-[70px]">
        <div class="container flex flex-col gap-10 justify-end">
          <!-- 타이틀 -->
          <div>
            <div class="text-[24px] text-mono-050 leading-10">간편하게 따라하는 오늘의 한 끼</div>
            <div class="text-[52px] font-bold text-mono-050 leading-16">레시피 검색</div>
            <!-- 🔥 브래드크럼 속성 적용하기 -->
            <v-breadcrumbs
              :items="['홈', '레시피', '레시피 검색']"
              color="#fafaf9"
              active-color="#fafaf9"
              class="px-0"
            ></v-breadcrumbs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
