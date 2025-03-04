<script setup lang="ts">
  import BannerComponent from '@/components/BannerComponent.vue';
  import CommunityLinkBanner from '@/components/Subscription/CommunityLinkBanner.vue';
  import {useRoute} from 'vue-router';

  const currentRoute = useRoute();
</script>

<template>
  <BannerComponent
    background="/images/subscription/newsBanner.png"
    title="자수성가와 함께하는 나의 첫 집"
    subtitle="당신의 새 집 정보, 여기서 확인하세요"
    :breadcrumbs="[
      {title: '홈', href: '/'},
      {title: '청약', href: '/subscription'},
      {title: '상세 정보'},
    ]"
  />

  <CommunityLinkBanner />
</template>

<style scoped></style>
