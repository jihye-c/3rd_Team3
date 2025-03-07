<template>
  <div class="container flex justify-center py-25 items-center">
    <div class="w-[600px] h-full flex flex-col items-center">
      <div>
        <div class="w-[280px] relative h-[280px]">
          <div class="w-full rounded-full overflow-hidden h-full">
            <img class="object-cover w-full h-full" :src="previewUrl" alt="" />
          </div>
          <div class="absolute right-10 bottom-0">
            <v-tooltip location="top">
              <template v-slot:activator="{props}">
                <v-btn class="relative" icon color="var(--color-main-400)" v-bind="props">
                  <label for="file" class="absolute left-0 top-0 w-full h-full">
                    <input id="file" type="file" class="hidden" @change="handleFileChange" />
                  </label>
                  <v-icon color="var(--color-main-50)"> mdi-pencil </v-icon>
                </v-btn>
              </template>
              <span>프로필 변경</span>
            </v-tooltip>
          </div>
        </div>
        <div class="py-4 text-center text-2xl">leeheesu@naver.com</div>
      </div>
      <div class="w-full py-10">
        <v-card>
          <v-tabs v-model="tab" align-tabs="center" color="deep-purple-accent-4">
            <v-tab :value="1">비밀번호 변경</v-tab>
            <v-tab :value="2">정보 변경</v-tab>
          </v-tabs>
          <v-tabs-window v-model="tab">
            <v-tabs-window-item :value="1">
              <v-container >
                  <UserPasswordUpdateComponent/>
              </v-container>
            </v-tabs-window-item>
          </v-tabs-window>
          <v-tabs-window v-model="tab">
            <v-tabs-window-item :value="2">
              <v-container >
                  <UserInfoUpdateComponent/>
              </v-container>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import UserInfoUpdateComponent from '@/components/mypage/UserInfoUpdateComponent.vue';
import UserPasswordUpdateComponent from '@/components/mypage/UserPasswordUpdateComponent.vue';
import {useUserStore} from '@/stores/userStore';
  import {onMounted, ref} from 'vue';
  const userStore = useUserStore();
  const selectedFile = ref<File | null>(null);
  const previewUrl = ref<string | null>('');
  const tab = ref(null)
  const handleFileChange = async (event: Event) => {
    const input = event.target as HTMLInputElement;

    // ✅ input이 존재하는지 확인
    if (!input || !input.files || input.files.length === 0) {
      console.warn('⚠️ 파일이 선택되지 않았거나, 이벤트가 input에서 발생하지 않았습니다.');
      return;
    }

    const file = input.files[0];

    // ✅ 기존 URL 제거 (메모리 누수 방지)
    if (previewUrl.value) {
      URL.revokeObjectURL(previewUrl.value);
    }

    selectedFile.value = file;
    previewUrl.value = URL.createObjectURL(file);
    await uploadHandler();
    // ✅ 같은 파일을 다시 선택할 수 있도록 input 값 초기화
    input.value = '';
  };
  const uploadHandler = async () => {
    const formData = new FormData();
    formData.append('isCover', 'false');
    formData.append('image', selectedFile.value!);
    await userStore.postUserProfile(formData);
  };
  onMounted(async () => {
    previewUrl.value = localStorage.getItem('userImage');
  });
</script>

<style scoped>
  :deep(.v-btn--variant-elevated) {
    box-shadow: none;
  }
</style>
