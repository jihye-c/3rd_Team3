<template>
      <div class="flex w-full px-12 flex-col gap-3">
      <div>
        <span class="grow-0 text-sm px-2 py-1 rounded-sm text-center text-main-50 bg-main-400"
            >{{data?.HOUSE_DTL_SECD_NM}}</span
          >
      </div>
          <div class="">
            <strong>{{data?.HOUSE_NM}}</strong>
            <p class="text-mono-400">접수기간:{{data?.SUBSCRPT_RCEPT_BGNDE}} ~ {{data?.SUBSCRPT_RCEPT_ENDDE}} </p>
            <p class="text-xs">공급위치: {{ data?.HSSPLY_ADRES }}</p>
          </div>
        </div>
</template>

<script setup lang="ts">
const {data} = defineProps({
  data: Object,
  activeData:Boolean,
})

</script>

<style scoped>

</style>
