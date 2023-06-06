/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { getAllCity, getJadwalSolat } from "./actions";

interface propsLocation {
  id: string;
  lokasi: string;
}

interface UsersState {
  allCity: propsLocation[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  solat: any;
}

const initialState = {
  allCity: [],
  loading: "idle",
  solat: null,
} as UsersState;

const jadwalSlice = createSlice({
  name: "solat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCity.fulfilled, (state, action) => {
      state.allCity = action.payload;
    });
    builder.addCase(getJadwalSolat.fulfilled, (state, action) => {
      state.solat = action.payload;
    });
  },
});

export default jadwalSlice.reducer;
