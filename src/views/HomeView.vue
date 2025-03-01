<template>

<HeroSlide/>
<div class="container">
<HomeSection>
  <HomeAddressSection/>
</HomeSection>
<HomeSection>
  <HomeMedicalSection/>
</HomeSection>
<HomeSection>
  <HomeCultureSection/>
</HomeSection>
<HomeSection>
  <HomeSubscriptionSection/>
</HomeSection>
</div>
</template>

<script setup lang="ts">
import HeroSlide from '@/components/Home/HeroSlide.vue';
import HomeAddressSection from '@/components/Home/HomeAddressSection.vue';
import HomeCultureSection from '@/components/Home/HomeCultureSection.vue';
import HomeMedicalSection from '@/components/Home/HomeMedicalSection.vue';
import HomeSubscriptionSection from '@/components/Home/HomeSubscriptionSection.vue';
import HomeSection from '@/components/Home/common/HomeSection.vue';

</script>

<style scoped>
/* Vuetify 스타일을 덮어씌우고 싶다면 여기에 작성 */
</style>
