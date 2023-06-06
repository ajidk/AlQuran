import { configureStore } from "@reduxjs/toolkit";
import jadwalSlice from "../feature/jadwal/slice";

export const store = configureStore({
  reducer: {
    jadwal: jadwalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
