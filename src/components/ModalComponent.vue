<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 flex items-center justify-center bg-[#000]/20 z-20"
      @click.self="closeModal"
    >


        <slot></slot>

    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  isOpen: Boolean,
});
const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>
