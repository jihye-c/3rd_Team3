<script setup lang="ts">
  import Supabase from '@/apis/supabase';
  import {onMounted, ref} from 'vue';
  import {useRoute} from 'vue-router';
  const route = useRoute();
  interface Props {
    thumb?: string;
    small?: boolean;
    class?: string | string[];
    cultureData: {
      title: string;
      contentId: string;
      eventEndDate: string;
      eventStartDate: string;
      location: string;
      image_src: string;
      content: string;
    };
  }
  const bookmarked = ref(false);
  const splitPath = route.path.split('/');
  const userId = localStorage.getItem('userId');
  const props = defineProps<Props>();
  const emit = defineEmits<{
    (event: 'toggle'): void;
  }>();

  const toggleBookmark = async () => {
    if (!userId) return;
    if (!bookmarked.value) {
      //북마크 넣기
      let imgSrc: string | undefined = undefined;

      switch (splitPath[1]) {
        case 'subscription':
          const subscriptionTitle = document.getElementById('subscriptionNewsTitle');
          const subscriptionDate = document.getElementById('subscriptionNewsDate');
          imgSrc = props.thumb;
          await Supabase.addScrapData({
            type: 'subscription',
            defaultData: {
              user_id: userId,
              image_src: imgSrc,
              post_url: route.fullPath,
              title: subscriptionTitle?.innerText || '청약 카드 뉴스',
            },
            additionalData: {date: subscriptionDate?.innerText || ''},
          });
          break;
        case 'recipe':
          const imgEl = document.querySelector('img[alt="recipe_image"]');
          const recipeTitle = document.getElementById('recipeName');
          if (imgEl) {
            imgSrc = imgEl.getAttribute('src') || undefined;
          }
          await Supabase.addScrapData({
            type: 'recipe',
            defaultData: {
              user_id: userId,
              image_src: imgSrc,
              post_url: route.fullPath,
              title: recipeTitle?.innerText || '레시피',
            },
          });
          break;
        case 'culture':
          console.log(props.cultureData);
          imgSrc = props.thumb;
          await Supabase.addScrapData({
            type: 'culture',
            defaultData: {
              user_id: userId,
              image_src: props.cultureData.image_src,
              post_url: route.fullPath,
              title: props.cultureData.title,
            },
            additionalData: {
              contentId: props.cultureData.contentId,
              eventEndDate: props.cultureData.eventEndDate,
              eventStartDate: props.cultureData.eventStartDate,
              location: props.cultureData.location,
            },
          });
          break;
        case 'community':
          if (splitPath[2] == 'review') {
            console.log('커뮤니티 리뷰');
          } else if (splitPath[2] == 'question') {
            console.log('커뮤니티 질문');
          } else if (splitPath[2] == 'resale') {
            console.log('커뮤니티 중고거래');
          } else if (splitPath[2] == 'recipe') {
            console.log('커뮤니티 레시피');
          }
          break;
      }
      bookmarked.value = true;
    } else {
      //북마크 지우기
      await Supabase.removeScrap(userId, route.fullPath);
      bookmarked.value = false;
    }
    emit('toggle');
  };
  onMounted(async () => {
    if (!userId) return;
    bookmarked.value = await Supabase.checkScrap(userId, route.fullPath);
  });
</script>

<template>
  <div>
    <v-btn
      :variant="props.small ? 'text' : 'outlined'"
      :block="!props.small"
      :height="props.small ? '32' : '52'"
      @click="toggleBookmark"
      :style="{
        borderColor: 'var(--color-mono-300)',
        width: props.small ? '32px' : 'auto',
        minWidth: props.small ? '32px' : 'auto',
        padding: props.small ? '0' : 'auto',
      }"
    >
      <v-icon size="30" :class="bookmarked ? 'bookmarked' : 'unbookmarked'">{{
        bookmarked ? 'mdi-bookmark' : 'mdi-bookmark-outline'
      }}</v-icon>
    </v-btn>
  </div>
</template>

<style scoped>
  :deep(.bookmarked) {
    color: var(--color-main-400);
  }

  :deep(.unbookmarked) {
    color: var(--color-mono-400);
  }
</style>
