<script setup lang="ts">
  import Supabase from '@/apis/supabase';

  const handleFileUpload = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      // Supabase.addCSVData(input.files[0]);
    }
  };
</script>

<template>
  <main class="container p-12">
    <h1 class="text-6xl font-bold">ADMIN PAGE</h1>
    <hr class="my-12" />
    <div>
      <h2 class="text-4xl font-bold mb-6">병원 DB 업데이트</h2>
      <div class="flex gap-6">
        <v-file-input v-model="file" label="File input"></v-file-input>
        <v-select label="정보 타입" :items="['전체 병원 리스트', '병원 상세정보', '병원 교통 정보']"
          >abcd</v-select
        >
      </div>
      <div class="text-right">
        <v-btn variant="tonal" color="primary" @change="handleFileUpload">
          <v-icon class="mr-2">mdi-file-arrow-up-down-outline</v-icon>
          파일 업로드
        </v-btn>
      </div>
    </div>
    <hr class="my-12" />
  </main>
</template>
