import { configureStore } from "@reduxjs/toolkit";
import { jadwalReducer, quranReducer } from "../feature";

export const store = configureStore({
  reducer: {
    jadwal: jadwalReducer,
    quran: quranReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
