import { formatDate } from "@/utils/dateFormat"
import axios from "axios"


const baseUrl = 'https://api.odcloud.kr/api';
const key = import.meta.env.VITE_SUBSCRIPTION_API_KEY;


export const getSubscriptionList = async() =>{
  try{
    const response = await axios.get(`${baseUrl}/ApplyhomeInfoDetailSvc/v1/getUrbtyOfctlLttotPblancDetail`,{
      params:{
        serviceKey:key,
        page:1,
        perPage:1000,

        'cond[RCRIT_PBLANC_DE::GT]':formatDate(new Date(),-1)
      }

    }
  )
  console.log(response.data)
  return response.data
  }catch(e){
    console.error(e);
    return [];
  }
}
export const getAptData = async (id: string) => {
  try {
    const response = await axios.get(
      `${baseUrl}/ApplyhomeInfoDetailSvc/v1/getAPTLttotPblancDetail`,
      {
        params: {
          serviceKey: key,
          page: 1,
          perPage: 50,
          'cond[HSSPLY_ADRES::LIKE]': '서울', // 서울지역
          'cond[RCRIT_PBLANC_DE::GTE]': '2024-01-01', // 24년 1월 1일 부터
          'cond[RCRIT_PBLANC_DE::LTE]': '2025-12-31', // 25년 12월 31일 까지
          'cond[HOUSE_MANAGE_NO::EQ]': id,
        },
      },
    );
    return response.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getHouseData = async (id: string) => {
  try {
    const response = await axios.get(
      `${baseUrl}/ApplyhomeInfoDetailSvc/v1/getUrbtyOfctlLttotPblancDetail`,
      {
        params: {
          serviceKey: key,
          page: 1,
          perPage: 100,
          'cond[HSSPLY_ADRES::LIKE]': '서울', // 서울지역
          'cond[RCRIT_PBLANC_DE::GTE]': '2024-01-01', // 24년 1월 1일 부터
          'cond[RCRIT_PBLANC_DE::LTE]': '2025-12-31', // 25년 12월 31일 까지
          'cond[HOUSE_MANAGE_NO::EQ]': id,
        },
      },
    );
    return response.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};
