
// 주소 셀렉트 값
export const address_select_items =[
  { address: "강남구", latitude: 37.5172, longitude: 127.0473 },
  { address: "강동구", latitude: 37.5301, longitude: 127.1238 },
  { address: "강북구", latitude: 37.6396, longitude: 127.0257 },
  { address: "강서구", latitude: 37.5509, longitude: 126.8495 },
  { address: "관악구", latitude: 37.4784, longitude: 126.9516 },
  { address: "광진구", latitude: 37.5384, longitude: 127.0822 },
  { address: "구로구", latitude: 37.4954, longitude: 126.8874 },
  { address: "금천구", latitude: 37.4568, longitude: 126.8955 },
  { address: "노원구", latitude: 37.6542, longitude: 127.0568 },
  { address: "도봉구", latitude: 37.6688, longitude: 127.0472 },
  { address: "동대문구", latitude: 37.5744, longitude: 127.0396 },
  { address: "동작구", latitude: 37.5124, longitude: 126.9393 },
  { address: "마포구", latitude: 37.5663, longitude: 126.9016 },
  { address: "서대문구", latitude: 37.5791, longitude: 126.9368 },
  { address: "서초구", latitude: 37.4836, longitude: 127.0324 },
  { address: "성동구", latitude: 37.5634, longitude: 127.0365 },
  { address: "성북구", latitude: 37.5894, longitude: 127.0167 },
  { address: "송파구", latitude: 37.5146, longitude: 127.1066 },
  { address: "양천구", latitude: 37.5271, longitude: 126.8563 },
  { address: "영등포구", latitude: 37.5264, longitude: 126.8963 },
  { address: "용산구", latitude: 37.5324, longitude: 126.9908 },
  { address: "은평구", latitude: 37.6176, longitude: 126.9227 },
  { address: "종로구", latitude: 37.5729, longitude: 126.9794 },
  { address: "중구", latitude: 37.5636, longitude: 126.9976 },
  { address: "중랑구", latitude: 37.6066, longitude: 127.0926 }
]

//홈 슬라이드 값
export const background_items = [
  {
    title: "병원정보",
    content: "내 주변 병원 정보를 한눈에 확인해보세요.",
    color: "var(--color-main-400)",
    img: "/home/main_hero1.webp",
  },
  {
    title: "나만의 레시피",
    content: "건강하고 맛있는 나만의 레시피를 찾아보세요!",
    color: "#f25267",
    img: "/home/main_hero2.webp",
  },
  {
    title: "동네정보",
    content: "우리 동네 생활 정보와 편의시설을 확인해보세요.",
    color: "#03d8b1",
    img: "/home/main_hero3.webp",
  },
  {
    title: "청약 정보",
    content: "내 집 마련! 청약 정보를 빠르게 확인해보세요.",
    color: "#00bdec",
    img: "/home/main_hero4.webp",
  },

];

// 행사 카테고리

export const sub_categories = [
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

export const reviewData = [
  {
    title: "동네 카페 추천",
    content: "아침에 산책하다 발견한 작은 카페인데 분위기 너무 좋아요!",
    image_src: "https://media.istockphoto.com/id/1428594094/ko/%EC%82%AC%EC%A7%84/%EB%82%98%EB%AC%B4-%ED%85%8C%EC%9D%B4%EB%B8%94-%EC%BB%A4%ED%94%BC-%EB%A9%94%EC%9D%B4%EC%BB%A4-%ED%8C%A8%EC%8A%A4%ED%8A%B8%EB%A6%AC-%EB%B0%8F-%ED%8E%9C%EB%8D%98%ED%8A%B8-%EC%A1%B0%EB%AA%85%EC%9D%B4%EC%9E%88%EB%8A%94-%EB%B9%88-%EC%BB%A4%ED%94%BC-%EC%88%8D-%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4.jpg?s=612x612&w=0&k=20&c=5bHJXVEZ4D9zsN_ZV-XVZsTxwxL5GdUOo5D0PPs3fsI=",
    post_url: "/community/review/1",
    0: {
      dong: "삼성동",
      tags: ["카페", "산책", "분위기"],
    },
  },
  {
    title: "깨끗한 세탁소 발견!",
    content: "옷을 맡겼는데 너무 깔끔하고 친절해요!",
    image_src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe92J5r758M8c_GK4RNUGYL9axeRLWeMFXpQ&s",
    post_url: "/community/review/2",
    0: {
      dong: "역삼동",
      tags: ["세탁소", "친절", "깨끗함"],
    },
  },
];

export const resaleData = [
  {
    title: "중고 아이패드 판매",
    image_src: "https://cdn.bizwatch.co.kr/news/photo/2022/12/09/2bcdd98d1355f02d43a2bfd7eba60165.jpg",
    post_url: "/community/resale/1",
    0: {
      price: "300,000원",
      dong: "신사동",
    },
  },
  {
    title: "자전거 중고로 팔아요",
    image_src: "https://hellovelo.co.kr/web/product/big/202410/61b018175cd209217a532d4d97e2a6e7.jpg",
    post_url: "/community/resale/2",
    0: {
      price: "100,000원",
      dong: "압구정동",
    },
  },
];

export const questionData = [
  {
    title: "삼성동 근처 괜찮은 맛집 추천 부탁드려요!",
    content: "이번 주말에 친구랑 갈만한 곳 추천해주세요!",
    post_url: "/community/question/1",
    0: {
      dong: "삼성동",
    },
    tags: ["맛집", "추천", "삼성동"],
  },
  {
    title: "자취 첫날에 필요한 물품은 뭐가 있을까요?",
    content: "혼자 사는 건 처음이라 필요한 물건이 많을 것 같아요.",
    post_url: "/community/question/2",
    0: {
      dong: "역삼동",
    },
    tags: ["자취", "필수템", "초보"],
  },
];

export const recipData = [
  {
    title: "초간단 크림 카레",
    image_src: "/images/recipe/recipe_popular1.webp",
    post_url: "/community/recipe/1",
    0: {
      tags: ["한식", "볶음밥", "간단"],
    },
  },
  {
    title: "매콤 비빔밥",
    image_src: "/images/recipe/recipe_popular3.webp",
    post_url: "/community/recipe/2",
    0: {
      author_name: "매운맛 사랑꾼",
      tags: ["한식", "닭볶음탕", "매운맛"],
    },
  },
];

export const rectangleRecipeData = [
  {
    title: "토마토 파스타",
    image_src: "https://example.com/tomato-pasta.jpg",
    post_url: "/recipe/1",
  },
  {
    title: "크림 리조또",
    image_src: "https://example.com/cream-risotto.jpg",
    post_url: "/recipe/2",
  },
  {
    title: "간장찜닭",
    image_src: "https://example.com/chicken.jpg",
    post_url: "/recipe/3",
  },
];

