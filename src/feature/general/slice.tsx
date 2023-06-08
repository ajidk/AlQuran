import { createSlice } from "@reduxjs/toolkit";
import { dailyState } from "../../utils/json/dailyPrayer";

export interface ModalState {
  modal: boolean;
  byDetail: null | dailyState;
}

const initialState: ModalState = {
  modal: false,
  byDetail: null,
};

export const generalSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    updateModal: (state, action) => {
      state.modal = action.payload;
    },
    updateDetail: (state, action) => {
      state.byDetail = action.payload;
    },
  },
});

export const { updateModal, updateDetail } = generalSlice.actions;

export default generalSlice.reducer;
