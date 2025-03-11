<script setup lang="ts">
  import {ref} from 'vue';
  import Supabase from '@/apis/supabase';
  import district from '@/assets/data/district.json';
  console.log(district['강남구']);

  const selectItems = ref([
    {value: 'hospital', label: '전체 병원 리스트'},
    {value: 'hospital_detail', label: '병원 상세정보'},
    {value: 'hospital_traffic', label: '병원 교통 정보'},
    {value: 'hospital_treatment', label: '병원 진료 과목 정보'},
  ]);

  const file = ref<File | null>(null);
  const csvType = ref<string | null>(null);
  const handleFileUpload = () => {
    if (file.value && csvType.value) {
      Supabase.addCSVData(file.value, csvType.value);
    }
  };
  const handleListLoad = async () => {
    const data = await Supabase.getFullHospitalData(1);
    console.log(data);
  };
  const handleDetailLoad = async (id: string) => {
    const data = await Supabase.getDetailHospitalData(id);
    console.log(data);
  };
  const handleScrapGet = async () => {
    const res = await Supabase.getScrapData('test','comm_qna');
    console.log(res);
  };

  const handleScrapAdd = async () => {
    const defaultData = {
      user_id: 'test',
      image_src: 'test',
      post_url: 'url test',
      title: 'title test',
      content: 'content test',
    };
    const additionalData = {
      dong: '동 이름',
      tags: ['태그1', '태그2'],
    };
    await Supabase.addScrapData({type:'comm_qna', defaultData, additionalData});
  };
</script>

<template>
  <main class="container p-12">
    <h1 class="text-6xl font-bold">ADMIN PAGE</h1>
    <hr class="my-12" />
    <div>
      <h2 class="text-4xl font-bold mb-6">병원 DB 업데이트</h2>
      <div class="flex gap-6">
        <v-file-input v-model="file" label="File input" />
        <v-select
          v-model="csvType"
          label="정보 타입"
          :items="selectItems"
          item-value="value"
          item-title="label"
          :menu="true"
        ></v-select>
      </div>
      <div class="text-right">
        <v-btn variant="tonal" color="primary" @click="handleFileUpload">
          <v-icon class="mr-2">mdi-file-arrow-up-down-outline</v-icon>
          파일 업로드
        </v-btn>
      </div>
    </div>
    <hr class="my-12" />

    <div>
      <v-btn @click="handleListLoad" color="success">전체 병원 데이터 로드</v-btn>
      <v-btn
        @click="
          handleDetailLoad(
            'JDQ4MTg4MSM1MSMkMSMkMCMkODkkMzgxMzUxIzExIyQxIyQzIyQ3OSQzNjE4MzIjODEjJDEjJDYjJDgz',
          )
        "
        color="success"
        >병원 디테일 데이터 로드</v-btn
      >
    </div>
    <v-divider></v-divider>
    <div>
    <v-btn @click="handleScrapAdd" color="success">스크랩 추가 확인</v-btn>
    <v-btn @click="handleScrapGet" color="success">스크랩 로드 확인</v-btn>
    </div>
  </main>
</template>

<style>
  .v-list-item:hover {
    background: orange;
  }
</style>
