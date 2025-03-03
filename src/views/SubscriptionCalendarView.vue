<script setup lang="ts">
  import BannerComponent from '@/components/BannerComponent.vue';
  import CommunityLinkBanner from '@/components/Subscription/CommunityLinkBanner.vue';
</script>

<template>
  <BannerComponent
    background="/images/subscription/newsBanner.png"
    title="자수성가 청약 캘린더"
    subtitle="청약 일정, 놓치지 마세요!"
    :breadcrumbs="[
      {title: '홈', href: '/'},
      {title: '청약', href: '/subscription'},
      {title: '청약 캘린더'},
    ]"
  />

  <CommunityLinkBanner />
</template>

<style scoped></style>
