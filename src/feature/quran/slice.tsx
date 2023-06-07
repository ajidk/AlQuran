/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { getListSurah } from "./action";
import { quranState } from "../../utils/interface/quran";

// interface listSurahState

const initialState = {
  listSurah: [],
  loading: false,
  solat: null,
} as quranState;

const quranSlice = createSlice({
  name: "quran",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListSurah.fulfilled, (state, action) => {
      state.listSurah = action.payload;
      state.loading = false;
    });
    builder.addCase(getListSurah.pending, (state) => {
      state.loading = true;
    });
    // builder.addCase(getJadwalSolat.fulfilled, (state, action) => {
    //   state.solat = action.payload;
    // });
  },
});

export default quranSlice.reducer;
