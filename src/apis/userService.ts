import type {UserFullName} from '@/types/User';
import type User from '@/types/User';
import type UserRegisterForm from '@/types/UserRegisterForm';
import axiosApi from '@/utils/axiosConfig';
import axios from 'axios';

const apiRoot = import.meta.env.VITE_PROGRAMMERS_API_ROOT;
const kakaoApi = import.meta.env.VITE_KAKAO_REST_BASE_API_URL
const kakaoApiKey = import.meta.env.VITE_KAKAO_REST_API_KEY;

export async function userRegister(formData: UserRegisterForm): Promise<User> {
  const fullName = JSON.stringify({
    name: formData.name,
    nickname: formData.nickname,
  });
  const signUpRes = await axiosApi.post(`${apiRoot}/signup`, {
    email: formData.email,
    password: formData.password,
    fullName: fullName,
  });
  if (signUpRes.status !== 200) {
    throw new Error('Post Error : ' + signUpRes.status);
  }
  return signUpRes.data.user;
}
export async function updateUser(fullName: UserFullName): Promise<User> {
  const response = await axiosApi.put<User>(`${apiRoot}/settings/update-user`, {"fullName": JSON.stringify(fullName)});
  if (response.status !== 200) {
    throw 'state : ' + response.status;
  }
  return response.data; //이것도 타입 검증 필요
}
export async function checkUserEmail(email: string): Promise<boolean> {
  try {
      const userList = await axiosApi.get<User[]>(`${apiRoot}/users/get-users`);
    if (userList.status !== 200) {
      throw '유저 목록을 불러오는데 실패했습니다. : ' + userList.status;
    }
    const users = userList.data;
    return !users.some(user => user.email === email);
  } catch (err) {
    console.log('유저 목록을 불러오는데 실패했습니다. : ', err);
    return false;
  }
}
export async function createScrapPost(userId: string, festivalData: any): Promise<string> {
  try {
    const scrapTitle = JSON.stringify({
      userId: userId,  // ✅ 유저 ID 저장 유지
      content_id: festivalData.content_id,
      name: festivalData.name,
      category3: festivalData.category3,
      homepage: festivalData.homepage,
      event_start_date: festivalData.event_start_date,
      event_end_date: festivalData.event_end_date,
      gu_name: festivalData.gu_name,
      overview: festivalData.overview
    });

    // ✅ `scrap` 채널에 저장 (유저 ID 포함)
    const res = await axiosApi.post(`${apiRoot}/posts/create`, {
      title: scrapTitle,
      channelId: '67bfdc61ff075444a9c22ebd', // scrap 채널 ID
    });

    console.log(`✅ [유저별] 스크랩 생성 완료 (userId: ${userId}):`, res.data);
    return res.data._id;
  } catch (error) {
    console.error(`❌ [유저별] 스크랩 생성 실패 (userId: ${userId}):`, error);
    throw error;
  }
}


export const getUserScrapList = async (userId: string) => {
  try {
    console.log(`🚀 스크랩 목록 불러오기 (userId: ${userId})`);

    // 1️⃣ scrap 채널의 전체 게시물 가져오기
    const scrapChannelRes = await axios.get("http://13.125.143.126:5003/posts/channel/67bfdc61ff075444a9c22ebd");

    if (!scrapChannelRes.data || !Array.isArray(scrapChannelRes.data)) {
      console.warn("⚠️ 스크랩 목록이 없거나 데이터가 올바르지 않습니다.");
      return [];
    }

    const allScrapPosts = scrapChannelRes.data; // 전체 스크랩된 게시물 리스트

    // 2️⃣ 특정 유저의 스크랩만 필터링
    const userScrapPosts = allScrapPosts.filter(post => {
      try {
        const titleData = JSON.parse(post.title);
        return titleData.userId === userId;
      } catch (error) {
        console.warn("⚠️ JSON 파싱 오류 발생:", post.title);
        return false;
      }
    });

    // 3️⃣ `_id` 값을 포함한 새로운 객체 배열로 변환
    const filteredScrapList = userScrapPosts.map(post => ({
      _id: post._id, // ✅ _id 값을 유지하여 삭제할 때 사용
      ...JSON.parse(post.title) // title 필드에서 JSON 데이터 추출
    }));

    console.log("✅ [유저별] 스크랩 목록 불러오기 성공:", filteredScrapList);
    return filteredScrapList;
  } catch (error) {
    console.error("❌ 스크랩 목록 불러오기 실패:", error);
    return [];
  }
};







export async function testScrapChannelAPI() {
  try {
    const response = await axios.get("http://13.125.143.126:5003/channels/67bfdc61ff075444a9c22ebd", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    });

    console.log("📌 스크랩 채널 API 응답:", response.data);
  } catch (error) {
    console.error("❌ 스크랩 채널 API 요청 실패:", error);
  }
}

testScrapChannelAPI();

export async function deleteScrapPost(scrapId: string) {
  try {
    if (!scrapId) {
      console.error("❌ 삭제 요청 실패: scrapId가 없습니다.");
      return false;
    }

    console.log(`🗑️ 삭제 요청: ${scrapId}`);
    const res = await axiosApi.delete(`${apiRoot}/posts/delete`, {
      data: { id: scrapId } // ✅ 올바른 request body 사용
    });

    console.log("✅ 스크랩 삭제 완료:", res.data);
    return true;
  } catch (error) {
    console.error("❌ 스크랩 삭제 실패:", error);
    return false;
  }
}

export async function toggleScrap(userId: string, festivalData: any, context: string = "default") {
  try {
    // ✅ 유저의 현재 스크랩 목록 가져오기
    const userScraps = await getUserScrapList(userId);
    
    // ✅ 동일한 `content_id`의 스크랩 찾기
    const existingScrap = userScraps.find(scrap => scrap.content_id === festivalData.content_id);

    console.log("🔎 기존 스크랩 데이터:", existingScrap); // ✅ 삭제할 데이터 확인

    let updatedScrapList = [];

    if (existingScrap) {
      if (!existingScrap._id) { // ✅ 삭제할 `_id` 값이 있는지 확인
        console.error(`❌ 삭제할 스크랩 ID가 없습니다. (content_id: ${existingScrap.content_id})`);
        return userScraps;
      }

      console.log(`🗑️ 스크랩 삭제 요청 (scrapId: ${existingScrap._id})`);
      const isDeleted = await deleteScrapPost(existingScrap._id);

      if (!isDeleted) {
        console.error(`❌ 스크랩 삭제 실패 (scrapId: ${existingScrap._id})`);
        return userScraps;
      }

      console.log(`✅ [유저별] 스크랩 삭제 완료 (userId: ${userId})`);
      updatedScrapList = userScraps.filter(scrap => scrap.content_id !== festivalData.content_id);
    } else {
      const newScrapId = await createScrapPost(userId, festivalData);
      console.log(`✅ [유저별] 스크랩 추가 완료 (userId: ${userId})`);
      updatedScrapList = [...userScraps, { ...festivalData, _id: newScrapId }];
    }
    // ✅ 마이페이지에서는 이동하지 않음
    if (context !== "mypage") {
      console.log("🔄 페이지 이동 필요 (마이페이지 제외)");
      return updatedScrapList;
    }
    console.log("✅ 마이페이지 내에서 스크랩 변경 완료!");
    return updatedScrapList;
  } catch (error) {
    console.error(`❌ [유저별] 스크랩 토글 실패 (userId: ${userId}):`, error);
    return [];
  }
}




// 좌표를 주소로 받아오는 API
export async function getGeolocationAddress(locations: { latitude: number; longitude: number; }){
  const res = await axios.get(`${kakaoApi}`,{
    headers:{
      Authorization:`KakaoAK ${kakaoApiKey}`
    },
    params:{
      x: locations.longitude,
      y: locations.latitude
    }
  });
  return res.data
}

