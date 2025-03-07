import { defineStore } from "pinia";
import { getUserScrapList, toggleScrap } from "@/apis/userService";

export const useCultureStore = defineStore("cultureStore", {
  state: () => ({
    festivals: [] as any[], // 전체 축제 데이터
    filteredFestivals: [] as any[], // 필터링된 축제 데이터
    selectedFilters: {
      category: "",
      subCategory: "",
      keyword: "",
      location: "",
      period: null as number | null,
    },
    currentPage: 1, // 현재 페이지
    bookmarkedFestivals: [] as any [],
  }),

  actions: {
    setFestivals(festivals: any[]) {
      this.festivals = festivals;
    },

    setFilteredFestivals(filteredFestivals: any[]) {
      this.filteredFestivals = filteredFestivals;
    },

    setFilters(filters: {
      category: string;
      subCategory: string;
      keyword: string;
      location: string;
      period: number | null;
    }) {
      this.selectedFilters = filters;
    },

    setCurrentPage(page: number) {
      this.currentPage = page;
    },

    async loadBookmarks(userId) {
      try {
        const bookmarks = await getUserScrapList(userId);
        this.bookmarkedFestivals = bookmarks;
        console.log("✅ 북마크 불러오기 성공:", bookmarks);
      } catch (error) {
        console.error("❌ 북마크 불러오기 실패:", error);
      }
    },

    // ✅ 북마크 추가/삭제
    async toggleBookmark(userId, festivalData) {
      try {
        this.bookmarkedFestivals = await toggleScrap(userId, festivalData);
        console.log("✅ 북마크 업데이트 완료");
      } catch (error) {
        console.error("❌ 북마크 업데이트 실패:", error);
      }
    }
  },

  // 🛠 **persist 활성화 (상태 유지)**
  persist: true,
});


