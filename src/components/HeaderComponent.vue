<script setup lang="ts">
  import {RouterLink} from 'vue-router';
</script>

<template>
  <header class="tw:w-full tw:bg-main-400">
    <div class="container">
      <nav class="tw:flex tw:gap-5">
        <RouterLink to="/" class="ft-point">자수성가</RouterLink>
        <RouterLink to="/subscription">청약</RouterLink>
        <RouterLink to="/recipe">자취 레시피</RouterLink>
        <RouterLink to="/hospital">인근 병원</RouterLink>
        <RouterLink to="/culture">문화 생활</RouterLink>
        <RouterLink to="/community">커뮤니티</RouterLink>
        <RouterLink to="/mypage">
          <v-icon>mdi-account</v-icon>
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped></style>
