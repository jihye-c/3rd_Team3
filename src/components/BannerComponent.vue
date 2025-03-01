<script setup lang="ts">
  import {computed} from 'vue';

  interface BreadcrumbItem {
    title: string; // breadcrumb 텍스트
    href?: string; // 선택적으로 링크 추가 (현재 페이지는 링크 추가 X)
  }

  interface Props {
    background: string; // image 경로 || 색상
    title: string;
    subtitle: string;
    breadcrumbs: BreadcrumbItem[];
    darkText?: boolean; // default: mono-050, darkText 속성 추가: mono-700
  }

  const props = defineProps<Props>();

  // 배경이 이미지인지 색상인지 판별
  const isImage = computed(
    () => props.background.startsWith('http') || props.background.startsWith('/'),
  );

  // textColor 계산
  const textColor = computed(() =>
    props.darkText ? 'var(--color-mono-700)' : 'var(--color-mono-050)',
  );
</script>

<template>
  <div class="w-full h-[340px] overflow-hidden">
    <div
      :style="
        isImage
          ? {
              background: `url(${background})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : {background: background}
      "
      class="w-full h-full"
    >
      <div
        :class="isImage ? ' bg-mono-900/30' : ''"
        class="w-full h-full flex place-content-center pb-[20px] pt-[120px]"
      >
        <div class="container flex justify-between items-end">
          <div class="flex flex-col gap-10 justify-end self-start">
            <div>
              <div
                :class="darkText ? 'text-mono-900text-mono-050' : 'text-mono-050'"
                class="text-[24px] leading-10"
              >
                {{ subtitle }}
              </div>
              <div
                :class="darkText ? 'text-mono-900text-mono-050' : 'text-mono-050'"
                class="text-[52px] font-bold leading-16"
              >
                {{ title }}
              </div>
              <v-breadcrumbs :items="breadcrumbs" :style="{color: textColor}">
                <template v-slot:item="{item, index}">
                  <v-breadcrumbs-item
                    :key="index"
                    :href="item.href"
                    :style="
                      index === breadcrumbs.length - 1
                        ? {
                            color: textColor,
                            fontWeight: 'bold',
                            opacity: 1,
                          }
                        : {}
                    "
                  >
                    {{ item.title }}
                  </v-breadcrumbs-item>
                </template>
              </v-breadcrumbs>
            </div>
          </div>
          <div class="w-[400px] h-[220px] flex justify-end">
            <slot><!-- 일러스트 있으면 들어갈 자리! --></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  :deep(.v-breadcrumbs) {
    color: var(--local-text-color);
    font-size: 16px;
    font-weight: 200;
    padding-left: 0;
  }
</style>
