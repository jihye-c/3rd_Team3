<template>
  <div class="container flex justify-center py-25 items-center">
    <div class="w-[600px] h-full flex flex-col items-center">
      <div>
        <div class="w-[280px] relative h-[280px]">
          <div class="w-full rounded-full overflow-hidden h-full">
            <img
              class="object-cover w-full h-full"
              src="https://img1.newsis.com/2023/07/09/NISI20230709_0001310467_web.jpg?rnd=20230709150605"
              alt=""
            />
          </div>
          <div class="absolute right-10 bottom-0">
            <v-tooltip location="top">
              <template v-slot:activator="{props}">
                <v-btn icon color="var(--color-main-400)" v-bind="props">
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
        <v-form @submit.prevent>
          <v-responsive class="mx-auto" max-width="420">
            <v-text-field
              autofocus
              bg-color="var(--color-main-50)"
              color="var(--color-main-400)"
              base-color="var(--color-main-400)"
              label="이름"
              type="input"
              placeholder="이메일을 입력해주세요."
              persistent-hint
            ></v-text-field>
            <v-text-field
              bg-color="var(--color-main-50)"
              base-color="var(--color-main-400)"
              color="var(--color-main-400)"
              class="my-btn"
              label="닉네임"
              type="password"
            ></v-text-field>
            <v-text-field
              bg-color="var(--color-main-50)"
              base-color="var(--color-main-400)"
              color="var(--color-main-400)"
              class="my-btn"
              label="새 비밀번호"
              type="password"
            ></v-text-field>
            <v-text-field
              bg-color="var(--color-main-50)"
              base-color="var(--color-main-400)"
              color="var(--color-main-400)"
              class="my-btn"
              label="새 비밀번호 확인"
              type="password"
            ></v-text-field>
            <v-textarea
            bg-color="var(--color-main-50)"
              base-color="var(--color-main-400)"
              color="var(--color-main-400)"
              label="소개"
            ></v-textarea>
            <div class="flex gap-4 justify-center w-full">
              <v-btn
              width="40%"
              class="mt-8 text-mono-050"
              text="로그인"
              bg-color="var(--color-main-50)"
              base-color="var(--color-green-main)"
              rounded="lg"
              color="#03d8b1"
              type="submit"

            ></v-btn>
            <v-btn
            width="40%"
              class="mt-8 text-mono-050"
              text="로그인"
              bg-color="var(--color-main-50)"
              base-color="var(--color-main-300)"
              rounded="lg"
              color="#f25267"
              type="submit"

            ></v-btn>
            </div>

          </v-responsive>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
  :deep(.v-btn--variant-elevated) {
    box-shadow: none;
  }
</style>
