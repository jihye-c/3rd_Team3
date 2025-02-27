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
    :class="
      large
        ? 'tw:h-[460px] tw:w-[460px]'
        : medium
          ? 'tw:h-[380px] tw:w-[380px]'
          : 'tw:h-[300px] tw:w-[300px]'
    "
    class="tw:overflow-hidden tw:rounded-[20px]"
  >
    <div
      :style="{backgroundImage: `url(${props.image})`}"
      class="tw:w-full tw:h-full tw:bg-cover tw:bg-center"
    >
      <div
        :class="
          large
            ? 'tw:bg-linear-to-t tw:from-mono-900/50 tw:to-mono-900/0 tw:to-[50%] tw:!px-[40px] tw:!py-[32px]'
            : 'tw:bg-linear-to-t tw:from-mono-900/40 tw:to-mono-900/0 tw:to-[42%] tw:!px-[24px] tw:!py-[16px]'
        "
        class="tw:w-full tw:h-full tw:text-mono-050 tw:flex tw:items-end"
      >
        <div class="tw:flex tw:flex-col tw:gap-1">
          <div v-if="props.subtitle" class="tw:text-[20px] tw:leading-[24px] tw:font-medium">
            {{ props.subtitle }}
          </div>
          <div
            :class="large ? 'tw:text-[32px] tw:leading-[38px]' : 'tw:text-[36px] tw:leading-[42px]'"
            class="tw:font-bold"
          >
            {{ props.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
