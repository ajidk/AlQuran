export interface propsLocation {
  id: string;
  lokasi: string;
}

export interface UsersState {
  allCity: propsLocation[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  solat: any;
}
