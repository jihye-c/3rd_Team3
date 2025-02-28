<script setup lang="ts"></script>

<template>
  <div class="w-full">
    <div class="flex !px-16 justify-center items-center">
      <div class="!p-8 flex-1">
        <div class="mx-auto ">
          <div class="flex flex-col items-center justify-center">
            <h1 class="!text-3xl !font-semibold text-mono-700">로그인</h1>
            <form class="mt-12 w-full" action="" method="POST">
              <v-form @submit.prevent>
              <v-responsive class="mx-auto" max-width="420">
                <v-text-field
                bg-color="var(--color-main-50)"
                color="var(--color-main-400)"
                base-color="var(--color-main-400)"
                  label="아이디"
                  type="input"
                ></v-text-field>
                <v-text-field

                bg-color="var(--color-main-50)"
                base-color="var(--color-main-400)"
                color="var(--color-main-400)"
                autofocus
                  class="my-btn"
                  label="패스워드"
                  type="input"
                ></v-text-field>
                <v-btn class="mt-2" size="x-large" variant="tonal" rounded="lg" color="var(--color-main-400)" type="submit" block>로그인</v-btn>
              </v-responsive>
            </v-form>
            </form>
            <div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.my-btn::v-deep {
  background-color: none;
}
</style>
