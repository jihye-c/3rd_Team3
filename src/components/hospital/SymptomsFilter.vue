<script setup lang="ts">
  import {ref, watch} from 'vue';
  import type {Symptoms} from '@/types/hospitalType.ts';
  import symptomsData from '@/assets/data/symptoms.json';
  import {useRoute, useRouter} from 'vue-router';

  const props = defineProps({
    isSymptomButtonShow: Boolean,
  });

  const router = useRouter();
  const route = useRoute();

  const symptoms: Symptoms[] = symptomsData as Symptoms[];
  const checkedSymptoms = ref([]);
  const handleChange = () => {
    if(checkedSymptoms.value.length){
      const query = {...route.query, sym: checkedSymptoms.value};
      router.push({path: route.path, query});
    }else{
      router.push({
          query: (() => {
            const newQuery = {...route.query};
            delete newQuery.sym;
            return newQuery;
          })(),
        });
    }
  };
  watch(
    () => props.isSymptomButtonShow,
    (newVal) => {
      if (!newVal) {
        checkedSymptoms.value = [];
        router.push({
          query: (() => {
            const newQuery = {...route.query};
            delete newQuery.sym;
            return newQuery;
          })(),
        });
      }
    },
  );
</script>

<template>
  <form class="flex flex-wrap gap-2 justify-center items-center">
    <template v-for="(item, index) in symptoms" :key="item.id">
      <input
        type="checkbox"
        class="hidden"
        :id="'checkbox-' + item.id"
        :value="item.id"
        v-model="checkedSymptoms"
        @change="handleChange"
      />
      <label
        :for="'checkbox-' + item.id"
        class="flex flex-col gap-1.5 justify-center items-center py-3 w-20 h-20 aspect-square bg-main-50 rounded-[12px] border-1 border-main-400 cursor-pointer transition-all"
        :class="index === symptoms.length - 1 ? 'col-start-2' : ''"
      >
        <img :src="item.image" alt="symptom_icon" class="w-8 h-8 select-none" />
        <div class="text-[16px] text-main-500 font-medium select-none">
          {{ item.name }}
        </div>
      </label>
    </template>
  </form>
</template>

<style scoped>
  input[type='checkbox']:checked + label {
    background-color: var(--color-main-400);
  }
  input[type='checkbox']:checked + label div {
    color: white;
  }
  input[type='checkbox']:checked + label img {
    filter: invert(1);
  }
</style>
