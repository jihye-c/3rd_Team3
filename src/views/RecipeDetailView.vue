<script setup lang="ts"></script>

<template>
  <div class="flex flex-col gap-[100px]">
    <!-- 코드 Merge 이후에 banner 컴포넌트 가져와서 적용하기 -->
    <div class="w-full h-[360px] bg-mono-300">배너 영역</div>
    <div class="container flex justify-between">
      <div class="border-2 border-mono-200 w-[52px] h-[104px]">
        <!-- 스크랩, 공유 버튼 -->
      </div>
      <div class="border-mono-200 w-[1330px] h-[2000px]">
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
              <div class="text-[40px] text-main-400 font-bold">저염된장 삼치구이</div>
              <div class="text-[18px] text-mono-600">반찬 | 굽기 | #삼치</div>
            </div>
            <div class="flex flex-col gap-4">
              <div class="text-[28px] text-main-700 font-bold">재료</div>
              <div class="text-[18px] text-mono-600">
                흑미밥 쌀 90g, 검은 쌀 10g, 닭가슴살 40g(1/3개), 월계수 잎 2장, 후추 약간, 나물준비
                숙주 20g(1/20봉지), 토란대 20g(5cm, 5개), 고사리 20g(10줄기), 고명 달걀 50g(1개),
                대파 10g(5cm), 들기름 5g(1작은술), 실고추약간, 소금약간 들깨 소스 들깨가루
                15g(1큰술), 고추기름 10g(2작은술), 꿀 8g(1⅔작은술), 저염간장 8g(1⅔작은술)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
