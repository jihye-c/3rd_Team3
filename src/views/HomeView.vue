<template>
  <div id="homeMain" class="text-mono-900">
    <HeroSlide />
    <CustomCursor/>
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
import CustomCursor from '@/components/Home/common/CustomCursor.vue';
  import HomeSection from '@/components/Home/common/HomeSection.vue';
import { useSubscriptionStore } from '@/stores/subscriptionStore.ts';
  import {useUserStore} from '@/stores/userStore';
import { askForLocation } from '@/utils/location';
  import {onBeforeMount,onMounted} from 'vue';

  const userStore = useUserStore();
  const subscriptionStore = useSubscriptionStore()
  onMounted(async () => {
    const id = localStorage.getItem('userId');
    await userStore.getUserInfomation(id);
    const address = localStorage.getItem('userAddress');
    await subscriptionStore.getSubscription()
    console.log('실행')
    if (!address) {
      const location = await askForLocation();
      console.log(location);
      await userStore.getUserAddress(location);
    }
  });

</script>

<style scoped>

</style>
