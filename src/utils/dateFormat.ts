import type { HouseInfo } from "@/types/SubscriptionTypes";

//날짜 포멧
export function formatDate(date: Date,years:number): string {
  const newDate = new Date(date);
    newDate.setFullYear(date.getFullYear() + years);
  return newDate.toISOString().split("T")[0];
}

export function groupByMonth (data:HouseInfo[]){
  return data.reduce((acc:any, item) => {
    const date = item.RCRIT_PBLANC_DE;

    const month = date.slice(0, 7); // 날짜 기준
    if (!acc[month]) {
      acc[month] = []; // 날짜가 없으면 배열 초기화
    }
    acc[month].push(item)
    return acc;
  }, {});
};
export function groupByDay (data:HouseInfo[]){
  return data.reduce((acc:any, item) => {
    const date = item.RCRIT_PBLANC_DE;
    if (!acc[date]) {
      acc[date] = []; // 날짜가 없으면 배열 초기화
    }
    acc[date].push(item); // 같은 날짜끼리 추가
    return acc;
  }, {});
};

export function getLocalDate(date:Date){
  const formattedDate = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .replace(/. /g, "-")
    .replace(".", "");
    return formattedDate;
}
