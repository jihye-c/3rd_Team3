<script setup lang="ts">
  import {reactive} from 'vue';
  import {RouterLink} from 'vue-router';
  import 'vuetify/styles';
  const select = reactive({state: '강남구 신사동', abbr: 'FL'});
  const items = reactive([
    {state: '강남구 신사동', abbr: 'FL'},
    {state: '강남구 신사동', abbr: 'GA'},
    {state: '강남구 신사동', abbr: 'NE'},
    {state: '강남구 신사동', abbr: 'CA'},
    {state: '강남구 신사동', abbr: 'NY'},
  ]);
</script>

<template>
  <header class="w-full !p-5">
    <div class="container">
      <nav class="flex items-center justify-between gap-7">
        <div class="flex gap-16">
          <h1 class="flex items-center flex-col justify-center">
            <RouterLink to="/" class="ft-point pb-2 text-2xl box-border">자수성가</RouterLink>
          </h1>
          <div class="text-xl font-semibold bg flex items-center gap-7">
            <RouterLink to="/subscription">청약</RouterLink>
            <RouterLink class="" to="/recipe">자취 레시피</RouterLink>
            <RouterLink to="/hospital">인근 병원</RouterLink>
            <RouterLink to="/culture">문화 생활</RouterLink>
            <RouterLink to="/community">커뮤니티</RouterLink>
          </div>
        </div>
        <div class="flex items-center">
          <div class="flex gap-1 items-center">
            <h4>우리동네</h4>
            <v-select
              v-model="select"
              :items="items"
              item-title="state"
              item-value="abbr"
              color="white"
              return-object
              hide-details
              density="compact"
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
</template>

<style >

  .v-field--variant-filled .v-field__overlay {
    background-color: transparent;
    border: none;
  }
  .v-field--variant-filled .v-field__outline::before,
  .v-field--variant-underlined .v-field__outline::before {
    display: none;
  }
  .v-field--variant-filled .v-field__outline::after,
  .v-field--variant-underlined .v-field__outline::after {
    display: none;
  }
  .v-select .v-select__selection-text {
    font-weight: bold;
  }
  .v-field__input {
    padding-left: 0;
  }
</style>
