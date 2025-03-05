//지오로케이션으로 좌표 받아오기
export function askForLocation(): Promise<{ latitude: number; longitude: number }> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error: GeolocationPositionError) => {
        reject(error);
      }
    );
  });
}

