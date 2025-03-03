<script setup lang="ts">
import { ref } from 'vue';

const categories = ['공연', '전시', '행사', '축제'];
const subCategories = ['전통공연', '연극', '뮤지컬', '오페라', '무용', '클래식 음악회', '대중콘서트'];
const periods = ['1개월', '3개월', '6개월', '1년'];
const locations = ['강서구', '양천구', '구로구', '영등포구', '금천구', '동작구', '관악구', '서초구', '강남구', '송파구', '강동구', '마포구', '은평구', '서대문구', '종로구', '중구', '용산구', '성동구', '동대문구', '광진구', '중랑구', '노원구', '도봉구', '강북구','성북구'];

const selectedCategory = ref('');
const selectedSubCategory = ref('');
const selectedPeriod = ref('');
const selectedLocation = ref('전체');
const searchKeyword = ref('');

const resetFilters = () => {
  selectedCategory.value = '';
  selectedSubCategory.value = '';
  selectedPeriod.value = '';
  selectedLocation.value = '전체';
  searchKeyword.value = '';
};
</script>

<template>
  <div class="w-[400px] h-fit border border-mono-300 shadow p-4 rounded-lg">
    <!-- 초기화 버튼 -->
    <div class="flex justify-end mb-2">
      <button @click="resetFilters" class="text-mono-600 text-sm">초기화</button>
    </div>

    <!-- 검색 입력 -->
    <div class="mb-4">
      <input type="text" v-model="searchKeyword" placeholder="키워드를 입력하세요" class="w-full p-2 border border-mono-200 rounded-md bg-white text-mono-900" />
    </div>

    <!-- 행사 분류 -->
    <div class="mb-4">
      <p class="font-bold text-mono-800 mb-2">행사 분류</p>
      <div class="grid grid-cols-2 gap-2">
        <button v-for="category in categories" :key="category" 
          class="p-2 border border-mono-200 rounded-md cursor-pointer text-mono-900"
          :class="selectedCategory === category ? 'bg-main-400 text-white' : 'bg-mono-100'"
          @click="selectedCategory = selectedCategory === category ? '' : category">
          {{ category }}
        </button>
      </div>
    </div>

    <!-- 상세 분류 -->
    <div class="mb-4">
      <p class="font-bold text-mono-800 mb-2">상세 분류</p>
      <div class="grid grid-cols-3 gap-2">
        <button v-for="subCategory in subCategories" :key="subCategory" 
          class="p-2 border border-mono-200 rounded-md text-sm cursor-pointer text-mono-900"
          :class="selectedSubCategory === subCategory ? 'bg-main-400 text-white' : 'bg-mono-100'"
          @click="selectedSubCategory = selectedSubCategory === subCategory ? '' : subCategory">
          {{ subCategory }}
        </button>
      </div>
    </div>

    <!-- 기간 선택 -->
    <div class="mb-4">
      <p class="font-bold text-mono-800 mb-2">기간</p>
      <div class="grid grid-cols-4 gap-2">
        <button v-for="period in periods" :key="period" 
          class="p-2 border border-mono-200 rounded-md text-sm cursor-pointer text-mono-900"
          :class="selectedPeriod === period ? 'bg-main-400 text-white' : 'bg-mono-100'"
          @click="selectedPeriod = selectedPeriod === period ? '' : period">
          {{ period }}
        </button>
      </div>
      <div class="mt-2 flex gap-2">
        <input type="text" placeholder="NNNN.NN.NN" class="w-1/2 p-2 border border-mono-200 rounded-md text-sm text-center text-mono-900" />
        <span class="text-mono-600">-</span>
        <input type="text" placeholder="NNNN.NN.NN" class="w-1/2 p-2 border border-mono-200 rounded-md text-sm text-center text-mono-900" />
      </div>
    </div>

    <!-- 지역 선택 -->
    <div>
      <p class="font-bold text-mono-800 mb-2">지역</p>
      <select v-model="selectedLocation" class="w-full p-2 border border-mono-200 rounded-md text-sm bg-white text-mono-900">
        <option v-for="location in locations" :key="location" :value="location">
          {{ location }}
        </option>
      </select>
    </div>
  </div>
</template>

