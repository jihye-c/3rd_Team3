<script setup lang="ts">
  interface Props {
    value: string;
    label: string;
    modelValue: string;
  }

  defineProps<Props>();
</script>

<template>
  <div>
    <input
      type="radio"
      :id="value"
      :value="value"
      :checked="modelValue === value"
      name="order"
      class="hidden peer"
      required
      @change="$emit('update:modelValue', value)"
    />
    <label
      :for="value"
      class="text-[20px] text-mono-400 peer-checked:text-mono-700 peer-checked:font-bold cursor-pointer"
    >
      {{ label }}
    </label>
  </div>
</template>
