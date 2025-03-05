<script setup lang="ts">
  interface Props {
    image: string;
    label: string;
    id: string;
    modelValue: string;
  }
  const props = defineProps<Props>();
  const emit = defineEmits(['update:modelValue']);
  const handleClick = () => {
    emit('update:modelValue', props.label);
  };
</script>

<template>
  <div class="flex flex-col gap-1.5 items-center" @click="handleClick">
    <div
      :class="modelValue === label ? 'bg-main-50' : 'bg-mono-100'"
      class="w-[80px] h-[80px] rounded-[999px] p-2.5 flex justify-center"
    >
      <img :src="image" alt="icon" />
    </div>
    <div
      :class="modelValue === label ? 'text-main-400' : 'text-mono-500'"
      class="text-[16px] font-semibold"
    >
      {{ label }}
    </div>
  </div>
</template>
