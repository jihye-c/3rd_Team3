<template>
  <div class="w-full cursor-pointer">
    <div class="flex gap-6">
      <div class="line-clamp-3">
        <strong class="text-xl font-semibold">{{props.item?.title.title}}</strong>
        <div class="flex items-center gap-3">
          <p>{{ props.item?.author.nickname }}</p>
          <span class="text-sm text-mono-400">ETC</span>
        </div>
        <p class="text-mono-500  py-1">{{ props.item?.title.content }}</p>
      </div>
      <div>
      <div v-if="props.item?.image" class="w-[100px] h-[100px] object-cover overflow-hidden rounded-xl bg-mono-100"><img  class="w-full h-full object-cover" :src="props.item?.image" alt=""></div>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
  import {onMounted} from 'vue';

  const props = defineProps({
    item:Object
  })
  onMounted(()=>{
    console.log(props.item)
  })
</script>

<style scoped>

</style>
