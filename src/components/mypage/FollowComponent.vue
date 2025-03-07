<script setup lang="ts">
import { useRouter } from 'vue-router';
const defaultImage = "/images/mypage/mypage_default_img.png";
const router = useRouter()

const props = defineProps<{
  items: { email: string; fullName: { name: string }; image?: string,id:string }[];
  title: string;
}>();

const { items, title } = props; // 이렇게 구조 분해하면 정상 작동함

</script>

<template>
  <v-card
    class="mx-auto w-[500px]"
    max-width="700"
  >
    <v-card-title class="py-4">
      {{title}}
    </v-card-title>

    <v-divider></v-divider>

    <v-virtual-scroll
      v-if="items.length !== 0"
      :items="items"
      height="320"
      item-height="48"
    >
      <template v-slot:default="{ item }">
        <v-list-item
          :subtitle="item.email"
          :title="item.fullName.name"
          @click.stop="router.push(`/mypage/${item.id}`)"

        >
          <template v-slot:prepend>
          <div class="w-8 h-8 rounded-full flex items-center overflow-hidden object-cover justify-center mr-3 bg-main-400">
            <img :src="item.image ?? defaultImage" alt="">
          </div>
          </template>

          <template v-slot:append>
            <v-btn
              icon="mdi-account-minus"
              size="x-small"
              variant="tonal"
            ></v-btn>
          </template>
        </v-list-item>
      </template>
    </v-virtual-scroll>
    <div v-else class="w-full h-[200px] flex items-center justify-center "> <p>정보가 없습니다.</p>  </div>
  </v-card>
</template>
<style scoped>

</style>
