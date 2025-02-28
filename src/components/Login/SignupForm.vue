<template>
    <div class="w-full">
    <div class="flex !px-16 justify-center items-center">
      <div class="!p-8 flex-1">
        <div class="mx-auto ">
          <div class="flex flex-col items-center justify-center">
            <h1 class="!text-3xl !font-semibold text-mono-700">회원가입</h1>
            <form class="mt-12 w-full" action="" method="POST">
              <v-form @submit.prevent>
              <v-responsive class="mx-auto" max-width="420">
                <v-text-field

                  label="아이디"
                  type="input"
                ></v-text-field>
                <v-text-field
                  label="비밀번호"
                  type="input"
                ></v-text-field>
                <v-text-field
                  label="비밀번호 확인"
                  type="input"
                ></v-text-field>
                <v-text-field
                  label="이름"
                  type="input"
                ></v-text-field>
                <v-text-field
                  label="닉네임"
                  type="input"
                ></v-text-field>
                <v-btn class="mt-2" size="x-large" variant="tonal" rounded="lg" color="var(--color-main-400)" type="submit" block>회원가입</v-btn>
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

</script>
