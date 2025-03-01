<template>
         <div class="flex gap-1 items-center">
            <h4>우리동네</h4>
            <v-select
            active
            autofocus
              v-model="select"
              :items="items"
              item-title="state"
              item-value="abbr"
              return-object
              hide-details
              closable-chips
              eager
              focused
              hide-selected
              color="#00d"
              item-color="bg-main-50"
            base-color="#0f0"
            >
            </v-select>
          </div>
</template>

<script setup lang="ts">
  import {reactive} from 'vue';

  const select = reactive({state: '강남구 신사동', abbr: 'FL'});
  const items = reactive([
    {state: '강남구 신사동', abbr: 'FL'},
    {state: '강남구 신사동', abbr: 'GA'},
    {state: '강남구 신사동', abbr: 'NE'},
    {state: '강남구 신사동', abbr: 'CA'},
    {state: '강남구 신사동', abbr: 'NY'},
  ]);
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
