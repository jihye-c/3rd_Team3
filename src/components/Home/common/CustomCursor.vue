<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Motion } from 'motion-v';

const x = ref(0);
const y = ref(0);
const scrollY = ref(0);
const cursorWidthSize = ref(20);
const cursorHeightSize = ref(20);
const cursorTop = ref(0);
const cursorRadios = ref('50%');
const cursorBorder = ref(1)
const isInsideTarget = ref(false);
const targetRect = ref<{ left: number; top: number }>({ left: 0, top: 0 });

let animationFrameId: number | null = null;
  window.addEventListener('scroll', function() {
  scrollY.value = window.scrollY
  })

const updateCursor = (event: MouseEvent) => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  animationFrameId = requestAnimationFrame(() => {
    if (isInsideTarget.value) {
      x.value =  targetRect.value.left;
      y.value =  targetRect.value.top
    } else {
      x.value = event.clientX;
      y.value = event.clientY +scrollY.value;
    }
  });
};

const onMouseEnter = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  const style =window.getComputedStyle(target)
  targetRect.value = { left: rect.left, top: rect.top+scrollY.value };
  console.log(targetRect)
  isInsideTarget.value = true;
  cursorWidthSize.value = rect.width;
  cursorHeightSize.value = rect.height;
  cursorRadios.value = style.borderStartStartRadius;
  cursorBorder.value = 4
};

const onMouseLeave = () => {
  isInsideTarget.value = false;
  cursorWidthSize.value = 20;
  cursorHeightSize.value = 20;
  cursorRadios.value = '50%';
  cursorBorder.value = 1

};

onMounted(() => {
  window.addEventListener('mousemove', updateCursor);

  document.querySelectorAll('.hover-target').forEach((el) => {
    el.addEventListener('mouseenter', onMouseEnter);
    el.addEventListener('mouseleave', onMouseLeave);
  });
});

onUnmounted(() => {
  window.removeEventListener('mousemove', updateCursor);
  if (animationFrameId) cancelAnimationFrame(animationFrameId);

  document.querySelectorAll('.hover-target').forEach((el) => {
    el.removeEventListener('mouseenter', onMouseEnter);
    el.removeEventListener('mouseleave', onMouseLeave);
  });
});
</script>

<template>
  <Motion
    as="div"
    class="cursor"
    :style="{position: 'absolute' }"
    :animate="{ x, y, width: cursorWidthSize,borderRadius:cursorRadios,top:cursorTop, height: cursorHeightSize,borderWidth:cursorBorder }"
    :transition="{ type: 'spring', stiffness: 600, damping: 50, duration:0.15 }"
  />
</template>

<style >
.cursor {
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 10;
  border: 1px solid var(--color-main-400);
}

</style>
