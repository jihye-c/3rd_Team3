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

<script setup lang="ts">
  const defaultImage = "/public/images/mypage/mypage_default_img.png"


const {items, title} = defineProps({
  items: {
    type: Array,
    required: true,
  },
  title:{
    type: String,
    required: true,
  }
})
</script>

<style scoped>

</style>
