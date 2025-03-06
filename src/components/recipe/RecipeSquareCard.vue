<script setup lang="ts">
  import {useAttrs} from 'vue';
  interface Props {
    image: string;
    title: string;
    subtitle?: string;
    size: number; // 한 변의 길이 (px)
  }

  defineProps<Props>();

  defineOptions({inheritAttrs: false}); // 루트 요소에 attrs 자동 상속 비활성화
  const attrs = useAttrs();
</script>

<template>
  <div
    :style="{width: size + 'px', height: size + 'px'}"
    class="overflow-hidden rounded-[20px] hover-target cursor-pointer"
  >
    <div :style="{backgroundImage: `url(${image})`}" class="w-full h-full bg-cover bg-center">
      <div
        :class="
          size > 460
            ? 'bg-linear-to-t from-mono-900/50 to-mono-900/0 to-[50%] px-[40px] py-[32px]'
            : size > 300
              ? 'bg-linear-to-t from-mono-900/40 to-mono-900/0 to-[42%] px-[24px] py-[16px]'
              : 'bg-linear-to-t from-mono-900/40 to-mono-900/0 to-[42%] px-[16px] py-[12px]'
        "
        class="w-full h-full text-mono-050 flex items-end"
        v-bind="attrs"
      >
        <div class="flex flex-col gap-1">
          <div v-if="subtitle" class="text-[20px] leading-[24px] font-regular">
            {{ subtitle }}
          </div>
          <div
            :class="
              size > 460
                ? 'text-[32px] leading-[38px]'
                : size >= 300
                  ? 'text-[36px] leading-[42px]'
                  : 'text-[24px] leading-[28px]'
            "
            class="font-bold"
          >
            {{ title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
