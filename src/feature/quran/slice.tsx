/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { quranState } from "../../utils/interface/quran";
import { detailSurah, getListSurah } from "./action";

// interface listSurahState

const initialState = {
  listSurah: [],
  loading: false,
  solat: null,
  detail: null,
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
    builder.addCase(detailSurah.fulfilled, (state, action) => {
      state.detail = action.payload;
      state.loading = false;
    });
    builder.addCase(detailSurah.pending, (state) => {
      state.loading = false;
    });
  },
});

export default quranSlice.reducer;
