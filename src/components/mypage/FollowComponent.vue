<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const defaultImage = "/images/mypage/mypage_default_img.png";
const router = useRouter()

const props = defineProps<{
  items: { email: string; fullName: { name: string,nickname:string }; image?: string,id:string }[];
  title: string;
  isOpen: boolean,
}>();

const emit = defineEmits(['close']);
const pushRouter =(id:string)=>{
  router.push(`/mypage/${id}`);
  closeModal()
}
const closeModal = () => {
  emit('close');
};
const { items, title } = props;

onMounted(()=>{

})
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
          :title="item.fullName.nickname"
          @click.stop="pushRouter(item.id)"

        >
          <template v-slot:prepend>
          <div class="w-8 h-8 rounded-full flex items-center overflow-hidden object-cover justify-center mr-3 bg-main-400">
            <img class="w-full h-full object-cover" :src="item.image ?? defaultImage" alt="">
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
