<template>
  <div>
    <HomeTitle title="오늘의 레시피" link="/recipe" content="간편하게 따라하는 오늘의 한 끼" />
    <div class="flex py-10 gap-10">
      <div>
        <RecipeSquareCard
          image="/recipe/recipe_category_rice.webp"
          :size="500"
          title="단호박 케일밥"
        />
      </div>
      <div class="flex w-full flex-col justify-between gap-3">
        <div>
        <div class="pb-6 flex justify-between">
          <h4 class="text-2xl  font-semibold">영양가득 레시피</h4>
          <div class="flex text-mono-400 items-center">
            <span>전체보기</span>
            <v-icon>mdi-chevron-right</v-icon>
          </div>
        </div>
          <div class="flex gap justify-between">
            <RecipeSquareCard
              image="/recipe/recipe_category_rice.webp"
              :size="200"
              title="단호박 케일밥"
            />
            <RecipeSquareCard
              image="/recipe/recipe_category_rice.webp"
              :size="200"
              title="단호박 케일밥"
            />
            <RecipeSquareCard
              image="/recipe/recipe_category_rice.webp"
              :size="200"
              title="단호박 케일밥"
            />
            <RecipeSquareCard
              image="/recipe/recipe_category_rice.webp"
              :size="200"
              title="단호박 케일밥"
            />
            <RecipeSquareCard
              image="/recipe/recipe_category_rice.webp"
              :size="200"
              title="단호박 케일밥"
            />
          </div>
        </div>
        <div>
          <div class="pb-6 flex justify-between">
          <h4 class="text-2xl  font-semibold">리얼 자취생 레시피</h4>
          <div class="flex text-mono-400 items-center">
            <span>전체보기</span>
            <v-icon>mdi-chevron-right</v-icon>
          </div>
        </div>
          <div class="flex gap-2 justify-between">
            <RecipePostList
            author="방구석 셰프"
              image="/recipe/recipe_category_rice.webp"
              :size="200"
              title="단호박 케일밥"
              content="자취생 필수템, 참치캔과 마요네즈로 만드는 초간단 덮밥!"
            />
            <RecipePostList
            author="방구석 셰프"
              image="/recipe/recipe_category_rice.webp"
              :size="200"
              title="단호박 케일밥"
              content="자취생 필수템, 참치캔과 마요네즈로 만드는 초간단 덮밥!"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import RecipeSquareCard from '@/components/recipe/RecipeSquareCard.vue';
  import HomeTitle from './common/HomeTitle.vue';
import RecipePostList from '@/components/recipe/RecipePostList.vue';
</script>

<style scoped></style>
