<script setup lang="ts">
  import NoDataLottie from '@/components/NoDataLottie.vue';
  import {onMounted} from 'vue';
  import {useRouter} from 'vue-router';

  const router = useRouter();

  onMounted(() => {
    setTimeout(() => {
      router.push('/');
    }, 3000);
  });
</script>

<template>
  <div class="h-screen w-screen flex flex-col justify-center">
    <div>
      <NoDataLottie class="w-[800px] mx-auto" />
      <p class="absolute text-xl bg-[#fff] -mt-8 w-full z-100 text-center">
        잘못된 경로로 접속하셨습니다. 3초 뒤 메인 페이지로 이동합니다.
      </p>
    </div>
  </div>
</template>

<style scoped></style>
