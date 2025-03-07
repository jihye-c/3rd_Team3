import { defineStore } from "pinia";

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
<<<<<<< HEAD

    toggleBookmark(festival: any) {
      const index = this.bookmarkedFestivals.findIndex((item) => item.content_id === festival.content_id);
      if (index !== -1) {
        this.bookmarkedFestivals.splice(index, 1); // 이미 북마크된 경우 제거
      } else {
        this.bookmarkedFestivals.push(festival); // 북마크 추가
      }
    },
=======
>>>>>>> main
  },

  // 🛠 **persist 활성화 (상태 유지)**
  persist: true,
});


