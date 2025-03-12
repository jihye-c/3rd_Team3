<script setup lang="ts">
import Supabase from "@/apis/supabase";
import router from "@/router";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
interface Props {
  thumb?: string;
  small?: boolean;
  class?: string | string[];
  cultureData?: {
    title: string;
    contentId: string;
    eventEndDate: string;
    eventStartDate: string;
    location: string;
    image_src: string;
    content: string;
  };
  commData?: string;
  authorName?: string;
  authorImg?: string;
  image?: string;
}
const bookmarked = ref(false);
const splitPath = route.path.split("/");
const userId = localStorage.getItem("userId");
const props = defineProps<Props>();
const emit = defineEmits<{
  (event: "toggle"): void;
}>();

const toggleBookmark = async () => {
  if (!userId) {
    alert("로그인이 필요합니다.");
    router.push("/auth");
    return;
  }
  if (!bookmarked.value) {
    //북마크 넣기
    let imgSrc: string | undefined = undefined;

    switch (splitPath[1]) {
      case "subscription":
        const subscriptionTitle = document.getElementById("subscriptionNewsTitle");
        const subscriptionDate = document.getElementById("subscriptionNewsDate");
        imgSrc = props.thumb;
        await Supabase.addScrapData({
          type: "subscription",
          defaultData: {
            user_id: userId,
            image_src: imgSrc,
            post_url: route.fullPath,
            title: subscriptionTitle?.innerText || "청약 카드 뉴스",
          },
          additionalData: { date: subscriptionDate?.innerText || "" },
        });
        break;
      case "recipe":
        const imgEl = document.querySelector('img[alt="recipe_image"]');
        const recipeTitle = document.getElementById("recipeName");
        if (imgEl) {
          imgSrc = imgEl.getAttribute("src") || undefined;
        }
        await Supabase.addScrapData({
          type: "recipe",
          defaultData: {
            user_id: userId,
            image_src: imgSrc,
            post_url: route.fullPath,
            title: recipeTitle?.innerText || "레시피",
          },
        });
        break;
      case "culture":
        if (!props.cultureData) return;
        imgSrc = props.thumb;
        await Supabase.addScrapData({
          type: "culture",
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
      case "community":
        if (!props.commData) return;
        const commParsingData = JSON.parse(props.commData);
        // console.log(commParsingData);
        // console.log(props.authorName, props.authorImg);
        // console.log(props.image);
        if (splitPath[2] == "review") {
          await Supabase.addScrapData({
            type: "comm_review",
            defaultData: {
              user_id: userId,
              image_src: props.image,
              post_url: route.fullPath,
              title: commParsingData.title,
              content: commParsingData.content,
            },
            additionalData: {
              dong: commParsingData.region.dong,
              tags: commParsingData.tags,
            },
          });
        } else if (splitPath[2] == "question") {
          await Supabase.addScrapData({
            type: "comm_qna",
            defaultData: {
              user_id: userId,
              image_src: props.image,
              post_url: route.fullPath,
              title: commParsingData.title,
              content: commParsingData.content,
            },
            additionalData: {
              dong: commParsingData.region.dong,
              tags: commParsingData.tags,
            },
          });
        } else if (splitPath[2] == "resale") {
          await Supabase.addScrapData({
            type: "comm_sale",
            defaultData: {
              user_id: userId,
              image_src: props.image,
              post_url: route.fullPath,
              title: commParsingData.title,
            },
            additionalData: {
              price: commParsingData.price,
              dong: commParsingData.region.dong,
              tags: commParsingData.tags,
            },
          });
        } else if (splitPath[2] == "recipe") {
          await Supabase.addScrapData({
            type: "comm_recipe",
            defaultData: {
              user_id: userId,
              image_src: props.image,
              post_url: route.fullPath,
              title: commParsingData.title,
              content: commParsingData.content,
            },
            additionalData: {
              author_img: props.authorImg || "",
              author_name: props.authorName || "",
              tags: commParsingData.tags,
            },
          });
        }
        break;
    }
    bookmarked.value = true;
  } else {
    //북마크 지우기
    await Supabase.removeScrap(userId, route.fullPath);
    bookmarked.value = false;
  }
  emit("toggle");
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
        bookmarked ? "mdi-bookmark" : "mdi-bookmark-outline"
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
