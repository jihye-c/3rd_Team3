export {};
declare global {
  interface Window {
    kakao: any;
  }
}

interface MapBounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export interface MapData {
  bounds: MapBounds;
  lng: number;
  lat: number;
  level: number;
}
