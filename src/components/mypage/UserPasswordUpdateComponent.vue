<template>
  <div>
    <v-form @submit.prevent="handlePasswordChange" v-slot="{ isValid }">
      <v-responsive class="mx-auto" max-width="420">
        <v-text-field
          v-model="newPassword"
          :rules="[requiredRule]"
          bg-color="var(--color-main-50)"
          base-color="var(--color-main-400)"
          color="var(--color-main-400)"
          label="새 비밀번호"
          type="password"
        ></v-text-field>
        <v-text-field
          v-model="confirmPassword"
          :rules="[requiredRule, confirmPasswordMatchRule]"
          bg-color="var(--color-main-50)"
          base-color="var(--color-main-400)"
          color="var(--color-main-400)"
          label="새 비밀번호 확인"
          type="password"
        ></v-text-field>
        <div class="flex gap-4 justify-center w-full">
          <v-btn
            width="40%"
            class="mt-8 text-mono-050"
            text="비밀번호 변경"
            bg-color="var(--color-main-50)"
            base-color="var(--color-green-main)"
            rounded="lg"
            color="#03d8b1"
            type="submit"
            :disabled="!isValid"
          >
            비밀번호 변경
          </v-btn>
          <v-btn
            width="40%"
            class="mt-8 text-mono-050"
            text="회원탈퇴"
            bg-color="var(--color-main-50)"
            base-color="var(--color-main-300)"
            rounded="lg"
            color="#f25267"
            type="button"
            @click="handleAccountDeletion"
          >
            회원탈퇴
          </v-btn>
        </div>
      </v-responsive>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

const newPassword = ref('');
const confirmPassword = ref('');

const requiredRule = (value: string) => !!value || '필수 입력 항목입니다.';

const confirmPasswordMatchRule = (value: string) =>
  value === newPassword.value || '비밀번호가 일치하지 않습니다.';

const handlePasswordChange = async () => {
  if (!newPassword.value || !confirmPassword.value) {
    console.error('모든 필드가 필수입니다.');
    return;
  }

  if (newPassword.value !== confirmPassword.value) {
    console.error('비밀번호가 일치하지 않습니다.');
    return;
  }

  try {
    await userStore.changePassword({ password: newPassword.value });
    alert('비밀번호 변경 완료');
  } catch (e) {
    console.error('비밀번호 변경 실패:', e);
  }
};

const handleAccountDeletion = async () => {
  try {
    await userStore.deleteAccount();
    console.log('회원탈퇴 성공');
  } catch (e) {
    console.error('회원탈퇴 실패:', e);
  }
};
</script>

<style scoped></style>
