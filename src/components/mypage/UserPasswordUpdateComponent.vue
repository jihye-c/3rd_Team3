<template>
  <div>
    <v-form @submit.prevent>
          <v-responsive class="mx-auto" max-width="420">
            <v-text-field
              bg-color="var(--color-main-50)"
              base-color="var(--color-main-400)"
              color="var(--color-main-400)"
              class=""
              label="새 비밀번호"
              type="password"
            ></v-text-field>
            <v-text-field
              bg-color="var(--color-main-50)"
              base-color="var(--color-main-400)"
              color="var(--color-main-400)"
              class=""
              label="새 비밀번호 확인"
              type="password"
            ></v-text-field>
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
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
