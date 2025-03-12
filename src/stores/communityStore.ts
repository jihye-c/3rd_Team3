import { defineStore } from "pinia";
// import { getUserScrapList, toggleScrap } from "@/apis/userService";
import type { Post } from "@/types/PostResponse";
import axios from "axios";

export const useCommunityStore = defineStore("communityStore", {
  state: () => ({
    bookmarkedPosts: {
      recipe: [] as any[],  // 나만의 레시피 북마크
      trade: [] as any[],   // 중고거래 북마크
      review: [] as any[],  // 동네 리뷰 북마크
      QnA: [] as any[],     // 질문 게시판 북마크
    },
    scrapCache: [] as Post[],  // 스크랩된 게시글 캐시 (API 요청 최소화)
    lastUpdated: null as number | null, // 마지막 업데이트 시간 (캐싱 유효성 검사)
  }),

  actions: {
    // 북마크 데이터 불러오기
    async loadBookmarks(userId: string) {
      try {
        console.log(`[스크랩] 불러오기 (userId: ${userId})`);

        // 10분 이내 캐시 유효성 검사
        const isCacheValid = this.lastUpdated && Date.now() - this.lastUpdated < 10 * 60 * 1000;
        if (isCacheValid && this.scrapCache.length > 0) {
          console.log("[캐시] 기존 북마크 데이터 사용");
          this._updateBookmarks();
          return;
        }

        // 1. API에서 스크랩된 `_id` 목록 가져오기
        const scrapList = await getUserScrapList(userId);
        if (!scrapList || scrapList.length === 0) {
          console.warn("[스크랩] 유저의 스크랩 목록이 없습니다.");
          this.scrapCache = [];
          this._updateBookmarks();
          return;
        }

        // 2. `_id` 목록을 이용해 실제 게시글 가져오기
        const postRequests = scrapList.map(scrap => 
          axios.get(`http://13.125.143.126:5003/posts/${scrap._id}`)
            .then(res => res.data)
            .catch(err => {
              console.warn(`[스크랩] 게시글 조회 실패 (id: ${scrap._id})`, err);
              return null;
            })
        );

        // 3. 모든 게시글 조회 요청 실행
        const posts = (await Promise.all(postRequests)).filter(post => post !== null);

        // 4. 상태 업데이트 (캐싱)
        this.scrapCache = posts;
        this.lastUpdated = Date.now();
        this._updateBookmarks();

        console.log("[스크랩] 최종 정리된 데이터:", this.bookmarkedPosts);
      } catch (error) {
        console.error("[스크랩] 북마크 불러오기 실패:", error);
      }
    },

    // 북마크 추가/삭제
    async toggleBookmark(userId: string, postData: Post) {
      try {
        console.log(`[스크랩] 토글 요청:`, postData);
        const updatedScraps = await toggleScrap(userId, postData);

        // 기존 캐시에서 같은 `_id` 찾기
        const existingIndex = this.scrapCache.findIndex(scrap => scrap._id === postData._id);
        if (existingIndex !== -1) {
          this.scrapCache.splice(existingIndex, 1); // 삭제된 경우 제거
        } else {
          const newScrapPost = await axios.get(`http://13.125.143.126:5003/posts/${postData._id}`)
            .then(res => res.data)
            .catch(err => {
              console.warn(`[스크랩] 새 게시글 조회 실패 (id: ${postData._id})`, err);
              return null;
            });

          if (newScrapPost) {
            this.scrapCache.push(newScrapPost);
          }
        }

        this._updateBookmarks();
        this.lastUpdated = Date.now();

        console.log("[스크랩] 북마크 업데이트 완료:", this.bookmarkedPosts);
      } catch (error) {
        console.error("[스크랩] 북마크 업데이트 실패:", error);
      }
    },

    // 내부 함수: `scrapCache` 데이터를 기반으로 `bookmarkedPosts` 업데이트
    _updateBookmarks() {
      this.bookmarkedPosts = {
        recipe: this.scrapCache
          .filter(post => post.channel?.name === "recipe")
          .map(post => this._formatPost(post, "recipe")),

        trade: this.scrapCache
          .filter(post => post.channel?.name === "trade")
          .map(post => this._formatPost(post, "trade")),

        review: this.scrapCache
          .filter(post => post.channel?.name === "review")
          .map(post => this._formatPost(post, "review")),

        QnA: this.scrapCache
          .filter(post => post.channel?.name === "QnA")
          .map(post => this._formatPost(post, "QnA")),
      };
    },

    // 게시글 데이터 변환 (JSON title 파싱)
    _formatPost(post: any, type: string) {
      let parsedTitle;
      try {
        parsedTitle = JSON.parse(post.title);
      } catch (e) {
        console.warn("title JSON 파싱 실패:", post.title);
        parsedTitle = { title: post.title, content: post.content };
      }

      return {
        type,
        title: parsedTitle.title,
        text: parsedTitle.content ?? null,
        tag: parsedTitle.tags ?? null,
        region: parsedTitle.region ?? null,
        price: type === "trade" ? parsedTitle.price ?? null : null,
        img: post.image ?? null,
        path: `/community/${type}/${post._id}`
      };
    },
  },

  persist: true, // 상태 유지 (새로고침해도 북마크 유지)
});







