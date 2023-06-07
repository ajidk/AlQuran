/* eslint-disable @typescript-eslint/no-explicit-any */
export interface propsLocation {
  id: string;
  lokasi: string;
}
export interface prayerTodayState {
  jadwal: {
    imsak: string;
    subuh: string;
    terbit: string;
    dzuhur: string;
    ashar: string;
    maghrib: string;
    isya: string;
  };
}

export interface UsersState {
  allCity: propsLocation[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  solat: any;
}
