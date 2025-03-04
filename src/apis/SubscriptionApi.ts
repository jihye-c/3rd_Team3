import axios from "axios"

const baseUrl = "https://api.odcloud.kr/api"
const key = import.meta.env.VITE_SUBSCRIPTION_API_KEY


export const getData = async() =>{
  try{
    const response = await axios.get(`${baseUrl}/ApplyhomeInfoDetailSvc/v1/getUrbtyOfctlLttotPblancDetail`,{
      params:{
        serviceKey:key,
        page:1,
        perPage:30,
        "cond[RCRIT_PBLANC_DE::LT]":"2024-03-01"
      }

    }
  )
  return response.data
  }catch(e){
    console.error(e);
    return [];
  }

}
