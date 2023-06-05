/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import connection from "../../config/connection";

interface propsJadwalSolat {
  id: string;
  today: string;
}

export const getAllCity = createAsyncThunk(
  "jadwal/all-city",
  async (_, { rejectWithValue }) => {
    try {
      const res = await connection.get(`sholat/kota/semua`);

      const messages = "something went wrong";
      if (res.status != 200) {
        throw new Error(messages);
      }

      return res.data;
      //   return data;
    } catch (e: any) {
      console.log("Error", e);
      return rejectWithValue(e.res.data);
    }
  }
);

export const getJadwalSolat = createAsyncThunk<any, propsJadwalSolat>(
  "jadwal/solat",
  async ({ id, today }, { rejectWithValue }) => {
    try {
      const res: any = await connection.get(`sholat/jadwal/${id}/${today}`);

      const messages = "something went wrong";
      if (res.status != 200) {
        throw new Error(messages);
      }

      //   return console.log(res.data.data);

      return res.data;
      //   return data;
    } catch (e: any) {
      console.log("Error", e);
      return rejectWithValue(e.res.data);
    }
  }
);
