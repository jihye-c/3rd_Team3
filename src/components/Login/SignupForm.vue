<template>
  <div class="signup w-full">
    <div class="flex !px-16 justify-center items-center">
      <div class="!p-8 flex-1">
        <div class="mx-auto">
          <div class="flex flex-col items-center justify-center">
            <h1 class="!text-3xl !font-semibold text-mono-700">회원가입</h1>
            <form class="mt-12 w-full" action="" method="POST">
              <v-form v-model="isValid" @submit.prevent="formsubmit">
                <v-responsive class="mx-auto" max-width="420">
                  <v-text-field
                    bg-color="var(--color-main-50)"
                    base-color="var(--color-main-400)"
                    color="var(--color-main-400)"
                    class="my-btn"
                    label="아이디"
                    type="input"
                    placeholder="이메일을 입력해주세요."
                    v-model="idInput"
                    :rules="[rules.required, rules.id]"
                  ></v-text-field>
                  <v-text-field
                    bg-color="var(--color-main-50)"
                    base-color="var(--color-main-400)"
                    color="var(--color-main-400)"
                    class="my-btn"
                    label="비밀번호"
                    type="password"
                    v-model="pwInput"
                    autocomplete="off"
                    :rules="[rules.required, rules.password]"
                  ></v-text-field>
                  <v-text-field
                    bg-color="var(--color-main-50)"
                    base-color="var(--color-main-400)"
                    color="var(--color-main-400)"
                    class="my-btn"
                    label="비밀번호 확인"
                    type="password"
                    autocomplete="off"
                    :rules="[rules.required, rules.passwordCheck]"
                  ></v-text-field>
                  <v-text-field
                    bg-color="var(--color-main-50)"
                    base-color="var(--color-main-400)"
                    color="var(--color-main-400)"
                    class="my-btn"
                    label="이름"
                    type="input"
                    v-model="nameInput"
                    :rules="[rules.required, rules.name]"
                  ></v-text-field>
                  <v-text-field
                    bg-color="var(--color-main-50)"
                    base-color="var(--color-main-400)"
                    color="var(--color-main-400)"
                    class="my-btn"
                    label="닉네임"
                    v-model="nicknameInput"
                    type="input"
                  ></v-text-field>
                  <v-btn
                    class="mt-2 text-mono-050"
                    size="x-large"
                    text="회원가입"
                    bg-color="var(--color-main-50)"
                    base-color="var(--color-main-300)"
                    rounded="lg"
                    color="var(--color-main-400)"
                    type="submit"
                    block
                    :disabled="!isValid"
                  ></v-btn>
                </v-responsive>
              </v-form>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref} from 'vue';
  import {useAuthStore} from '@/stores/auth';
  import {checkUserEmail} from '@/apis/userService';

  const idRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
  const nameRegEx = /^[a-zA-Z가-힣]+$/;

  const idInput = ref('');
  const pwInput = ref('');
  const nameInput = ref('');
  const nicknameInput = ref('');
  const isValid = ref(false);

  //필수 입력 정의
  const rules = {
    required: (value: string) => !!value || '필수 입력 사항입니다.',
    id: (value: string) => idRegEx.test(value) || '올바른 이메일을 입력해주세요.',
    password: (value: string) => passwordRegEx.test(value) || '영문,숫자를 포함한 6자리 이상의 비밀번호를 입력해주세요.',
    passwordCheck: (value: string) => pwInput.value === value || '비밀번호가 동일하지 않습니다.',
    name: (value: string) => nameRegEx.test(value) || '이름은 영문 및 국문만 입력 가능합니다.',
  };
  const formsubmit = async () => {
    const idDuplicate = await checkUserEmail(idInput.value);
    if (!idDuplicate) {
      alert('중복된 이메일입니다. 로그인하시거나 다른 이메일을 사용해주세요.');
      //나중에 이곳에서 모달로 띄우든 하면 될 듯
      return;
    }
    const authStore = useAuthStore();
    const formData = {
      email: idInput.value,
      password: pwInput.value,
      name: nameInput.value,
      nickname: nicknameInput.value === '' ? nameInput.value : nicknameInput.value,
    };
    await authStore.register(formData);
  };
</script>

<style scoped>
  form :deep(.text-field-affix-color) {
    background-color: none !important;
  }
  form :deep(.v-btn__content) {
    color: var(--color-main-50) !important;
  }
  form :deep(.v-field--variant-filled.v-field--focused .v-field__overlay) {
    opacity: 0 !important;
  }
  form :deep(.v-field--variant-filled .v-field__overlay) {
    background-color: var(--color-main-50) !important;
  }
  form :deep(.v-btn__content) {
    color: var(--color-main-50) !important;
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
