import { configureStore } from "@reduxjs/toolkit";
import { generalReducer, jadwalReducer, quranReducer } from "../feature";

export const store = configureStore({
  reducer: {
    jadwal: jadwalReducer,
    quran: quranReducer,
    general: generalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
