<template>
  <div class="flex  gap-1 items-center">
    <h4>우리동네</h4>
    <v-select
      v-model="select"
      :items="items"
      @update:modelValue="onChangeAddress()"
      item-title="address"
      item-value="abbr"
      return-object
      hide-details
      closable-chips
      color="#00d"
      base-color="#0f0"
    />
  </div>
</template>

<script setup lang="ts">
import { address_select_items } from '@/config/config';
import { useUserStore } from '@/stores/userStore';
import type { UserAddress } from '@/types/User';
import { reactive, ref, watchEffect } from 'vue';

const userStore = useUserStore();
const select = ref<UserAddress | null>({address:"로드중",longitude:0,latitude:0});
const items = reactive<UserAddress[]>(address_select_items);

const onChangeAddress = () =>{
    userStore.updateUserAddress(select.value)
}

watchEffect(() => {
  if (userStore.userLocation) {
    select.value = userStore.userLocation;
  }
});

</script>


<style scoped>
  div :deep(.v-field__outline) {display:none;}
  div :deep(.v-field--variant-filled .v-field__overlay) {
    background-color: transparent;
    border: none;
  }
  div :deep(.v-select .v-select__selection-text) {
    font-weight: bold;
  }
  div :deep(.v-field__input) {
    padding-left: 4px;
  }
</style>
