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

// Then, handle actions in your reducers:
const jadwalSlice = createSlice({
  name: "solat",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getAllCity.fulfilled, (state, action) => {
      state.allCity = action.payload;
    });
    builder.addCase(getJadwalSolat.fulfilled, (state, action) => {
      state.solat = action.payload;
    });
  },
});

export default jadwalSlice.reducer;
