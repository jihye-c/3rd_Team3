<script setup lang="ts">
  import {reactive} from 'vue';
  import {RouterLink} from 'vue-router'
  import { Motion, useScroll, useTransform } from 'motion-v'
  const select = reactive({state: '강남구 신사동', abbr: 'FL'});
  const items = reactive([
    {state: '강남구 신사동', abbr: 'FL'},
    {state: '강남구 신사동', abbr: 'GA'},
    {state: '강남구 신사동', abbr: 'NE'},
    {state: '강남구 신사동', abbr: 'CA'},
    {state: '강남구 신사동', abbr: 'NY'},
  ]);
  const { scrollY } = useScroll();
  const background = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0,0,0,0.2)", "rgba(255,255,255,1)"]
  );
  const height = useTransform(scrollY, [0, 100], [0, "100%"]);
  const border = useTransform(scrollY, [0, 100], ['none', '1px solid #eee']);
  const color = useTransform(scrollY, [0,100],['#fff',"#000"])


</script>

<template>
    <Motion
    as="div"
    class=" w-full fixed  "
    :style="{
      background,
        height,
        border,
        color
    }"
  >
  <header  class="w-full !p-5 ">

    <div ref="headerStyle" class="container">
      <nav class="flex items-center justify-between gap-7">
        <div class="flex gap-16">
          <h1 class="flex items-center flex-col justify-center">
            <RouterLink to="/" :style="{color}" class="ft-point pb-2 text-2xl box-border">자수성가</RouterLink>
          </h1>
          <div class="text-xl font-semibold bg flex items-center">
            <RouterLink class="px-4" to="/subscription">청약</RouterLink>
            <RouterLink class="px-4" to="/recipe">자취 레시피</RouterLink>
            <RouterLink class="px-4" to="/hospital">인근 병원</RouterLink>
            <RouterLink class="px-4" to="/culture">문화 생활</RouterLink>
            <RouterLink class="group/item relative px-6   " to="/community">커뮤니티
            <div class="absolute  w-full pt-6  left-0 top-7 ">
              <ul class="group/edit hidden bg-[#fff] text-mono-700 w-full group-hover/item:flex flex-col items-center  justify-center gap-3 text-sm bg-white shadow-sm  hover:flex  ">
              <li class="w-full px-3 py-3 text-center hover:bg-main-400 transition-all duration-300  hover:text-main-50">질문 게시판</li>
              <li class="w-full px-3 py-3 text-center hover:bg-main-400 transition-all duration-300  hover:text-main-50">동네리뷰</li>
              <li class="w-full px-3 py-3 text-center hover:bg-main-400 transition-all duration-300  hover:text-main-50">중고거래</li>
              <li class="w-full px-3 py-3 text-center hover:bg-main-400 transition-all duration-300  hover:text-main-50">나만의 레시피</li>
              </ul>
            </div>
            </RouterLink>
          </div>
        </div>
        <div class="flex items-center">
          <div class="flex gap-1 items-center">
            <h4>우리동네</h4>
            <v-select
            active
            autofocus
              v-model="select"
              :items="items"
              item-title="state"
              item-value="abbr"
              return-object
              hide-details
              closable-chips
              eager
              focused
              hide-selected
              color="#00d"
              item-color="bg-main-50"
            base-color="#0f0"
            >
            </v-select>
          </div>

          <!-- <RouterLink class="tw:flex tw:items-center" to="/mypage"> </RouterLink> -->
          <v-badge content="5" color="var(--color-main-400)">
            <v-speed-dial
              scrim="true"
              location="bottom center"
              theme=""
              transition="fade-transition"
            >
              <template v-slot:activator="{props: activatorProps}">
                <v-avatar
                  v-bind="activatorProps"
                  image="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201608/04/htm_2016080484837486184.jpg"
                ></v-avatar>
              </template>

              <v-btn key="1" class="!shadow-none" icon="$success"></v-btn>
              <v-btn key="2" class="!shadow-none" icon="$info"></v-btn>
              <v-btn key="3" class="!shadow-none" icon="$warning"></v-btn>
              <v-btn key="4" class="!shadow-none" icon="$error"></v-btn>
            </v-speed-dial>
          </v-badge>
        </div>
      </nav>
    </div>
  </header>
</Motion>
</template>

<style scoped >

::v-deep .v-field--variant-filled .v-field__overlay {
    background-color: transparent;
    border: none;
  }
  ::v-deep .v-field--variant-filled .v-field__outline::before,
  .v-field--variant-underlined .v-field__outline::before {
    display: none;
  }
  ::v-deep .v-field--variant-filled .v-field__outline::after,
  .v-field--variant-underlined .v-field__outline::after {
    display: none;
  }
  ::v-deep .v-select .v-select__selection-text {
    font-weight: bold;
  }
  ::v-deep .v-field__input {
    padding-left: 0;
  }

</style>

