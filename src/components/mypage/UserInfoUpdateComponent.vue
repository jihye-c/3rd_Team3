<template>
  <div>
    <v-form @submit.prevent="handleSubmit" v-slot="{ isValid }">
      <v-responsive class="mx-auto" max-width="420">
        <v-text-field
          v-model="username"
          :rules="[requiredRule]"
          bg-color="var(--color-main-50)"
          base-color="var(--color-main-400)"
          color="var(--color-main-400)"
          label="이름변경"
          type="text"
        ></v-text-field>
        <v-text-field
          v-model="nickname"
          :rules="[requiredRule]"
          bg-color="var(--color-main-50)"
          base-color="var(--color-main-400)"
          color="var(--color-main-400)"
          label="닉네임 변경"
          type="text"
        ></v-text-field>
        <v-textarea
          v-model="introduction"
          :rules="[requiredRule]"
          bg-color="var(--color-main-50)"
          base-color="var(--color-main-400)"
          color="var(--color-main-400)"
          label="소개"
        ></v-textarea>
        <div class="flex gap-4 justify-center w-full">
          <v-btn
            width="40%"
            class="mt-8 text-mono-050"
            text="정보수정"
            bg-color="var(--color-main-50)"
            base-color="var(--color-green-main)"
            rounded="lg"
            color="#03d8b1"
            type="submit"
            :disabled="!isValid"
          >정보수정</v-btn>
        </div>
      </v-responsive>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';

const userStore = useUserStore();
const username = ref('');
const nickname = ref('');
const introduction = ref('');

const requiredRule = (value: string) => !!value || '필수 입력 항목입니다.';

const handleSubmit = async () => {
  if (!username.value || !nickname.value || !introduction.value) {
    console.error('모든 필드가 필수입니다.');
    return;
  }

  const fullName = JSON.stringify({
    nickname: nickname.value,
    introduction: introduction.value,
    username: username.value,
  });

  const data = {
    fullName,
  };

  try {
    await userStore.updateUserInfo(data);
    alert('프로필 정보가 성공적으로 수정되었습니다.');
  } catch (e) {
    console.error('프로필 정보 수정 실패:', e);
  }
};
</script>

<style scoped></style>
