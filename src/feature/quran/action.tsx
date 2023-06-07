/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import quran from "../../config/quran";

export const getListSurah = createAsyncThunk(
  "quran/list-surah",
  async (_, { rejectWithValue }) => {
    try {
      const res = await quran.get("surat");

      const messages = "something went wrong";
      if (res.status != 200) {
        throw new Error(messages);
      }

      return res.data.data;
    } catch (err: any) {
      console.log("err", err);
      return rejectWithValue(err.res.data);
    }
  }
);
