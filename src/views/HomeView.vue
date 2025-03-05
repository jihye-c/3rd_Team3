<template>
  <div class="text-mono-900">
    <HeroSlide />
    <div class="container">
      <HomeSection>
        <HomeAddressSection />
      </HomeSection>
      <HomeSection>
        <HomeMedicalSection />
      </HomeSection>
      <HomeSection>
        <HomeCultureSection />
      </HomeSection>
      <HomeSection>
        <HomeRecipeSection />
      </HomeSection>
      <HomeSection>
        <HomeSubscriptionSection />
      </HomeSection>
      <HomeSection>
        <HomeCommunitySection />
      </HomeSection>
    </div>
  </div>
</template>

<script setup lang="ts">
  import HeroSlide from '@/components/Home/HeroSlide.vue';
  import HomeAddressSection from '@/components/Home/HomeAddressSection.vue';
  import HomeCommunitySection from '@/components/Home/HomeCommunitySection.vue';
  import HomeCultureSection from '@/components/Home/HomeCultureSection.vue';
  import HomeMedicalSection from '@/components/Home/HomeMedicalSection.vue';
  import HomeRecipeSection from '@/components/Home/HomeRecipeSection.vue';
  import HomeSubscriptionSection from '@/components/Home/HomeSubscriptionSection.vue';
  import HomeSection from '@/components/Home/common/HomeSection.vue';
import { useSubscriptionStore } from '@/stores/subscriptionStore.ts';
  import {useUserStore} from '@/stores/userStore';
import { askForLocation } from '@/utils/location';
  import {onBeforeMount} from 'vue';

  const userStore = useUserStore();
  const subscriptionStore = useSubscriptionStore()
  onBeforeMount(async () => {
    const address = localStorage.getItem('userAddress');
    if (!address) {
      const location = await askForLocation();
      console.log(location);
      await userStore.getUserAddress(location);
    }
      await subscriptionStore.getSubscription()
  });
</script>

<style scoped></style>
