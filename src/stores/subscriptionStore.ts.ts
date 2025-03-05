import { getSubscriptionList } from '@/apis/subscriptionApi';
import type { HouseInfo, SubscriptionDateListType } from '@/types/SubscriptionTypes';
import { groupByDay, groupByMonth } from '@/utils/dateFormat';
import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useSubscriptionStore = defineStore('subscription', () => {
  const SubscriptionList = ref<HouseInfo[] | null>([]);
  const SubscriptionDateList = ref([]);
  const filteredMonthDatas = ref<HouseInfo[] | null>([]);
  const filteredDayhDatas = ref([]);


  const getSubscription = async () => {
    try {
      const data = await getSubscriptionList();
     SubscriptionList.value =data.data

    //  console.log(SubscriptionList.value)
     const sortMonthDate =  await groupByMonth(data.data)
     SubscriptionDateList.value = sortMonthDate
    } catch (e) {
      console.log(e);
    }
  };

  const filteredData = async (date:any)=>{
   const filter =  SubscriptionDateList.value[date]
   filteredMonthDatas.value = filter

   if(filter){
    const sortMonthDate =  await groupByDay(filter)
    filteredDayhDatas.value = sortMonthDate
    console.log(sortMonthDate)
   }


  }

  return {
    getSubscription,
    filteredData,
    SubscriptionList,
    filteredMonthDatas,
    SubscriptionDateList,
    filteredDayhDatas
  };
});
