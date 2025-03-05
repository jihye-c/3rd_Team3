<script setup lang="ts">
import { ref, defineEmits} from 'vue';

const emit = defineEmits(["filterChanged"]);

// 행사 분류 (축제 / 공연·행사)
const categories = [
  { name: "축제", code: "A0207" },
  { name: "공연·행사", code: "A0208" }
];
const selectedCategory = ref("");

// 상세 분류
const subCategories = [
  { name: "문화관광축제", code: "A02070100" },
  { name: "일반축제", code: "A02070200" },
  { name: "전통공연", code: "A02080100" },
  { name: "연극", code: "A02080200" },
  { name: "뮤지컬", code: "A02080300" },
  { name: "오페라", code: "A02080400" },
  { name: "전시회", code: "A02080500" },
  { name: "박람회", code: "A02080600" },
  { name: "무용", code: "A02080800" },
  { name: "클래식음악회", code: "A02080900" },
  { name: "대중콘서트", code: "A02081000" },
  { name: "영화", code: "A02081100" },
  { name: "스포츠경기", code: "A02081200" },
  { name: "기타행사", code: "A02081300" }
];
const selectedSubCategory = ref("");

// ✅ 서울 지역(구) 목록
const locations = [
  "전체", "종로구", "중구", "용산구", "성동구", "광진구", "동대문구", "중랑구", "성북구",
  "강북구", "도봉구", "노원구", "은평구", "서대문구", "마포구", "양천구", "강서구", "구로구",
  "금천구", "영등포구", "동작구", "관악구", "서초구", "강남구", "송파구", "강동구"
];
const selectedLocation = ref("전체");

// ✅ 기간 필터 (1개월, 3개월, 6개월, 1년)
const periods = [
  { label: "1개월", value: 1 },
  { label: "3개월", value: 3 },
  { label: "6개월", value: 6 },
  { label: "1년", value: 12 }
];
const selectedPeriod = ref<number | null>(null); // 선택한 기간

const searchKeyword = ref("");

const resetFilters = () => {
  selectedCategory.value = "";
  selectedSubCategory.value = "";
  selectedLocation.value = "전체";
  selectedPeriod.value = null;
  searchKeyword.value = "";
  emit("filterChanged", { category: "", subCategory: "", location: "전체", keyword: "", period: null });
};

const applyFilters = () => {
  console.log("📌 선택한 지역:", selectedLocation.value);
  console.log("📌 선택한 기간:", selectedPeriod.value ? `${selectedPeriod.value}개월` : "설정 안됨");
  console.log("📌 검색 키워드:", searchKeyword.value); // 🔹 최신 키워드 값 확인
  
  emit("filterChanged", {
    category: selectedCategory.value,
    subCategory: selectedSubCategory.value,
    keyword: searchKeyword.value,
    location: selectedLocation.value,
    period: selectedPeriod.value
  });
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
      <input
        type="text"
        v-model="searchKeyword"
        @input="applyFilters"
        placeholder="키워드를 입력하세요"
        class="w-full p-2 border border-mono-200 rounded-md bg-white text-mono-900"
      />
    </div>

    <!-- 행사 분류 -->
    <div class="mb-4">
      <p class="font-bold text-mono-800 mb-2">행사 분류</p>
      <div class="grid grid-cols-2 gap-2">
        <button
          v-for="category in categories"
          :key="category.code"
          class="p-2 border border-mono-200 rounded-md cursor-pointer text-mono-900"
          :class="selectedCategory === category.code ? 'bg-main-400 text-white' : 'bg-mono-100'"
          @click="selectedCategory = selectedCategory === category.code ? '' : category.code; applyFilters()"
        >
          {{ category.name }}
        </button>
      </div>
    </div>

    <!-- 상세 분류 -->
    <div class="mb-4">
      <p class="font-bold text-mono-800 mb-2">상세 분류</p>
      <div class="grid grid-cols-3 gap-2">
        <button
          v-for="subCategory in subCategories"
          :key="subCategory.code"
          class="p-2 border border-mono-200 rounded-md text-sm cursor-pointer text-mono-900"
          :class="selectedSubCategory === subCategory.code ? 'bg-main-400 text-white' : 'bg-mono-100'"
          @click="selectedSubCategory = selectedSubCategory === subCategory.code ? '' : subCategory.code; applyFilters()"
        >
          {{ subCategory.name }}
        </button>
      </div>
    </div>

    <!-- ✅ 지역(구) 필터 -->
    <div class="mb-4">
      <p class="font-bold text-mono-800 mb-2">지역</p>
      <select v-model="selectedLocation" @change="applyFilters" class="w-full p-2 border border-mono-200 rounded-md text-sm bg-white text-mono-900">
        <option v-for="location in locations" :key="location" :value="location">
          {{ location }}
        </option>
      </select>
    </div>

        <!-- ✅ 기간 선택 필터 -->
        <div class="mb-4">
      <p class="font-bold text-mono-800 mb-2">기간</p>
      <div class="grid grid-cols-4 gap-2">
        <button v-for="period in periods" :key="period.value" 
          class="p-2 border border-mono-200 rounded-md text-sm cursor-pointer text-mono-900"
          :class="selectedPeriod === period.value ? 'bg-main-400 text-white' : 'bg-mono-100'"
          @click="selectedPeriod = selectedPeriod === period.value ? null : period.value; applyFilters()">
          {{ period.label }}
        </button>
      </div>
    </div>
    
  </div>
</template>
