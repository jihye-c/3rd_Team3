<template>
  <div class="w-full">
    <div class="flex !px-16 justify-center items-center">
      <div class="!p-8 flex-1">
        <div class="mx-auto">
          <div class="flex flex-col items-center justify-center">
            <h1 class="!text-3xl !font-semibold text-mono-700">로그인</h1>
            <form class="mt-12 w-full" action="" method="POST">
              <v-form v-model="isValid" @submit.prevent>
                <v-responsive class="mx-auto" max-width="420">
                  <v-text-field
                    autofocus
                    bg-color="var(--color-main-50)"
                    color="var(--color-main-400)"
                    base-color="var(--color-main-400)"
                    label="아이디"
                    type="input"
                    v-model="idInput"
                    placeholder="이메일을 입력해주세요."
                    :rules="[rules.required, rules.id]"
                  ></v-text-field>
                  <v-text-field
                    bg-color="var(--color-main-50)"
                    base-color="var(--color-main-400)"
                    color="var(--color-main-400)"
                    class="my-btn"
                    label="패스워드"
                    v-model="pwInput"
                    type="password"
                    autocomplete="off"
                    :rules="[rules.required]"
                  ></v-text-field>
                  <v-btn
                    class="mt-8 text-mono-050"
                    size="x-large"
                    text="로그인"
                    bg-color="var(--color-main-50)"
                    base-color="var(--color-main-300)"
                    rounded="lg"
                    color="var(--color-main-400)"
                    type="submit"
                    block
                    :disabled="!isValid"
                    @click="formsubmit"
                  ></v-btn>
                </v-responsive>
              </v-form>
            </form>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import {ref} from 'vue';
  import {useAuthStore} from '@/stores/auth';
import { useRouter } from 'vue-router';

  const router = useRouter();
  const idRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const idInput = ref('');
  const pwInput = ref('');
  const isValid = ref(false);

  //필수 입력 정의
  const rules = {
    required: (value: string) => !!value || '필수 입력 사항입니다.',
    id: (value: string) => idRegEx.test(value) || '올바른 이메일을 입력해주세요.',
  };

  const formsubmit = async () => {
    const authStore = useAuthStore();
    try{
      await authStore.login(idInput.value, pwInput.value);
      router.push('/')
    }catch(e){
      console.error(e);
      alert('로그인 실패');
    }
    console.log('user', authStore.user); // 로그인한 유저 정보
    console.log('authen', authStore.isAuthenticated); // 로그인 상태 (true/false)
  };
</script>
<style scoped>
  form :v-deep(.text-field-affix-color) {
    background-color: none;
  }
  form :deep(.v-btn__content) {
    color: var(--color-main-50);
  }
  form :deep(.v-field--variant-filled.v-field--focused .v-field__overlay) {
    opacity: 0 !important;
  }
  form :deep(.v-field--variant-filled .v-field__overlay) {
    background-color: var(--color-main-50) !important;
  }
  form :deep(.v-btn__content) {
    color: var(--color-main-50);
  }
  form :deep(.v-btn:hover > .v-btn__overlay) {
    background-color: var(--color-main-500) !important;
    opacity: 0.2;
  }
  form :deep(.v-ripple__container) {
    background-color: var(--color-main-500) !important;
    opacity: 0.2;
  }
</style>
