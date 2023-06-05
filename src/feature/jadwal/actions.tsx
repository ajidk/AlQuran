/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import connection from "../../config/connection";

export const getAllCity = createAsyncThunk(
  "jadwal/all-city",
  async (_, { rejectWithValue }) => {
    try {
      const response = await connection.get(`sholat/kota/semua`);

      const messages = "something went wrong";
      if (response.status != 200) {
        throw new Error(messages);
      }

      return response.data;
      //   return data;
    } catch (e: any) {
      console.log("Error", e);
      return rejectWithValue(e.response.data);
    }
  }
);

export const getJadwalSolat = createAsyncThunk<
  string,
  { id: string; today: string }
>("jadwal/solat", async ({ id, today }, { rejectWithValue }) => {
  try {
    const response = await connection.get(`sholat/jadwal/${id}/${today}`);

    const messages = "something went wrong";
    if (response.status != 200) {
      throw new Error(messages);
    }

    return response.data;
    //   return data;
  } catch (e: any) {
    console.log("Error", e);
    return rejectWithValue(e.response.data);
  }
});
