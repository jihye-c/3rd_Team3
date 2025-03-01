<script setup lang="ts">
  interface Props {
    image: string;
    title: string;
    subtitle?: string;
    large?: boolean;
    medium?: boolean;
  }

  const props = defineProps<Props>();
</script>

<template>
  <div
    :class="large ? 'h-[460px] w-[460px]' : medium ? 'h-[380px] w-[380px]' : 'h-[300px] w-[300px]'"
    class="overflow-hidden rounded-[20px]"
  >
    <div :style="{backgroundImage: `url(${props.image})`}" class="w-full h-full bg-cover bg-center">
      <div
        :class="
          large
            ? 'bg-linear-to-t from-mono-900/50 to-mono-900/0 to-[50%] px-[40px] py-[32px]'
            : 'bg-linear-to-t from-mono-900/40 to-mono-900/0 to-[42%] px-[24px] py-[16px]'
        "
        class="w-full h-full text-mono-050 flex items-end"
      >
        <div class="flex flex-col gap-1">
          <div v-if="props.subtitle" class="text-[20px] leading-[24px] font-medium">
            {{ props.subtitle }}
          </div>
          <div
            :class="large ? 'text-[32px] leading-[38px]' : 'text-[36px] leading-[42px]'"
            class="font-bold"
          >
            {{ props.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
