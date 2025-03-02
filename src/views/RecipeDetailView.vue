<script setup lang="ts">
  import type RecipeResponse from '@/\btypes/RecipeResponse';
  import DoughnutChart from '@/components/recipe/DoughnutChart.vue';

  const recipeData: RecipeResponse = {
    RCP_NM: '저염된장 삼치구이',
    RCP_PARTS_DTLS:
      '•필수재료 : 삼치(140g), 치커리(35g), 전분가루(10g)\n•구이소스 : 일본된장(5g), 청주(5g)\n•곁들임소스 : 유자청(15g), 다진마늘(5g), 청고추(15g), 홍고추(20g)',
    RCP_PAT2: '반찬',
    RCP_WAY2: '굽기',
    RCP_SEQ: '430',
    INFO_WGT: '130',
    INFO_ENG: '196.3', // 열량
    INFO_CAR: '5.8', // 탄수화물
    INFO_NA: '168.8', // 나트륨
    INFO_PRO: '18.9', // 단백질
    INFO_FAT: '10.8', // 지방
    HASH_TAG: '일본된장',
    ATT_FILE_NO_MK:
      'http://www.foodsafetykorea.go.kr/uploadimg/20230306/20230306050812_1678090092306.jpg',
    ATT_FILE_NO_MAIN:
      'http://www.foodsafetykorea.go.kr/uploadimg/20230306/20230306050759_1678090079442.jpg',
    MANUAL01: '1. 삼치는 세척 후 전분가루로 옷을 입혀준다.',
    MANUAL02: '2. 일본된장과 청주를 섞어 구이소스를 만들어 삼치를 재운다.',
    MANUAL03: '3. 청고추와 홍고추는 곱게 다지고 치커리는 적당하게 잘라서 물에 담가준다.',
    MANUAL04: '4. 유자청, 다진마늘, 다진 청고추와 홍고추를 섞어 곁들임소스를 만든다.',
    MANUAL05: '5. 재워두었던 삼치를 굽는다.',
    MANUAL06: '6. 접시에 구운 삼치와 치커리를 올리고 치커리를 올리고 곁들임소스를 뿌려 완성한다.',
    MANUAL07: '',
    MANUAL08: '',
    MANUAL09: '',
    MANUAL10: '',
    MANUAL11: '',
    MANUAL12: '',
    MANUAL13: '',
    MANUAL14: '',
    MANUAL15: '',
    MANUAL16: '',
    MANUAL17: '',
    MANUAL18: '',
    MANUAL19: '',
    MANUAL20: '',
  };

  const {INFO_ENG, INFO_NA, INFO_PRO, INFO_FAT, INFO_CAR} = recipeData;
  const nutrition = {
    INFO_ENG: parseFloat(INFO_ENG),
    INFO_NA: parseFloat(INFO_NA),
    INFO_CAR: parseFloat(INFO_CAR),
    INFO_PRO: parseFloat(INFO_PRO),
    INFO_FAT: parseFloat(INFO_FAT),
  };
</script>

<template>
  <div class="flex flex-col gap-[100px]">
    <!-- 코드 Merge 이후에 banner 컴포넌트 가져와서 적용하기 -->
    <div class="w-full h-[360px] bg-mono-300">배너 영역</div>
    <div class="container flex justify-between">
      <div class="border-2 border-mono-200 w-[52px] h-[104px]">
        <!-- 스크랩, 공유 버튼 -->
      </div>
      <div class="flex flex-col gap-[80px] border-mono-200 w-[1330px] h-[2000px]">
        <!-- 상세 내용 -->
        <div class="h-[580px] flex gap-[48px] rounded-[20px] shadow-lg overflow-hidden">
          <div class="w-[677px] overflow-hidden shrink-0">
            <img
              src="/recipe/recipe_popular1.webp"
              alt="recipe_image"
              class="w-full h-full object-cover object-center"
            />
          </div>
          <div class="flex flex-col gap-[48px] p-[48px]">
            <div class="flex flex-col gap-4">
              <div class="text-[40px] text-main-400 font-bold">{{ recipeData.RCP_NM }}</div>
              <div class="text-[18px] text-mono-600">
                {{ recipeData.RCP_PAT2 }} | {{ recipeData.RCP_WAY2 }} | #{{ recipeData.HASH_TAG }}
              </div>
            </div>
            <div class="flex flex-col gap-4">
              <div class="text-[28px] text-main-700 font-bold">재료</div>
              <div class="text-[18px] text-mono-600">
                {{ recipeData.RCP_PARTS_DTLS }}
              </div>
            </div>
          </div>
        </div>
        <!-- 영양정보 -->
        <div class="flex flex-col gap-2">
          <div class="text-[40px] text-mono-700 font-semibold">영양 정보</div>
          <p class="text-[20px] leading-[24px] text-mono-400">
            1일 영양성분 기준치에 대한 비율 (%)
          </p>
          <div class="h-[200px]">
            <div class="flex justify-between mt-[40px]">
              <template v-for="(value, key) in nutrition">
                <div class="w-[210px] h-[210px]">
                  <DoughnutChart :nutrition-info="key" :input-data="value" />
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
