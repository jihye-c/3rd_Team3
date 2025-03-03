<template>
  <div class="signup w-full">
    <div class="flex !px-16 justify-center items-center">
      <div class="!p-8 flex-1">
        <div class="mx-auto">
          <div class="flex flex-col items-center justify-center">
            <h1 class="!text-3xl !font-semibold text-mono-700">회원가입</h1>
            <form class="mt-12 w-full" action="" method="POST">
              <v-form @submit.prevent>
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
                    :hint="idHint"
                    persistent-hint
                    :rules="[rules.required]"
                  ></v-text-field>
                  <v-text-field
                    bg-color="var(--color-main-50)"
                    base-color="var(--color-main-400)"
                    color="var(--color-main-400)"
                    class="my-btn"
                    label="비밀번호"
                    type="password"
                    v-model="pwInput"
                    :hint="pwHint"
                    persistent-hint
                    :rules="[rules.required]"
                  ></v-text-field>
                  <v-text-field
                    bg-color="var(--color-main-50)"
                    base-color="var(--color-main-400)"
                    color="var(--color-main-400)"
                    class="my-btn"
                    label="비밀번호 확인"
                    type="password"
                    v-model="pwReInput"
                    :hint="pwReHint"
                    persistent-hint
                    :rules="[rules.required]"
                  ></v-text-field>
                  <v-text-field
                    bg-color="var(--color-main-50)"
                    base-color="var(--color-main-400)"
                    color="var(--color-main-400)"
                    class="my-btn"
                    label="이름"
                    type="input"
                    v-model="nameInput"
                    :hint="nameHint"
                    persistent-hint
                    :rules="[rules.required]"
                  ></v-text-field>
                  <v-text-field
                    bg-color="var(--color-main-50)"
                    base-color="var(--color-main-400)"
                    color="var(--color-main-400)"
                    class="my-btn"
                    label="닉네임"
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
  import {computed, ref} from 'vue';
  
  //필수 입력 정의 
  const rules = {
    required: (value: string) => !!value || '필수 입력 사항입니다.',
  };

  //아이디 (이메일) 검증
  const idInput = ref('');
  const idRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const idHint = computed(() => {
    return idRegEx.test(idInput.value) || idInput.value === ''
      ? ''
      : '올바른 이메일을 입력해주세요.';
  });

  //비밀번호 영문+숫자 6자리 이상 검증
  const pwInput = ref('');
  const pwRegEx = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
  const pwHint = computed(() => {
    return pwRegEx.test(pwInput.value) || pwInput.value === ''
      ? ''
      : '영문,숫자를 포함한 6자리 이상의 비밀번호를 입력해주세요.';
  });

  //비밀번호 재확인
  const pwReInput = ref('');
  const pwReHint = computed(() => {
    return pwReInput.value === pwInput.value || pwReInput.value === ''
      ? ''
      : '비밀번호가 동일하지 않습니다.';
  });

  //이름 영문 or 한글만 (숫자 및 특문 입력 X)
  const nameInput = ref('');
  const nameRegEx = /^[a-zA-Z가-힣]+$/;

  const nameHint = computed(() => {
    return nameRegEx.test(nameInput.value) || nameInput.value === ''
      ? ''
      : '이름은 영문 및 국문만 입력 가능합니다.';
  });

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
