<script setup lang="ts"></script>

<template>
  <div class="w-full">
    <div class="flex !px-16 justify-center items-center">
      <div class="!p-8 flex-1">
        <div class="mx-auto">
          <div class="flex flex-col items-center justify-center">
            <h1 class="!text-3xl !font-semibold text-mono-700">로그인</h1>
            <form class="mt-12 w-full" action="" method="POST">
              <v-form @submit.prevent>
                <v-responsive class="mx-auto" max-width="420">
                  <v-text-field
                    autofocus
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
                    class="my-btn"
                    label="패스워드"
                    type="input"
                  ></v-text-field>
                  <v-btn
                    class="mt-2 text-mono-050"
                    size="x-large"
                    text="로그인"
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
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
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
