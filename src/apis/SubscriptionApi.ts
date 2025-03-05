import { formatDate } from "@/utils/dateFormat"
import axios from "axios"

const baseUrl = "https://api.odcloud.kr/api"
const key = import.meta.env.VITE_SUBSCRIPTION_API_KEY


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
