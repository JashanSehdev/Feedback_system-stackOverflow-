import { api } from "@/api/api";
import { Tag } from "@/type/tag.type";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTagsAsync = createAsyncThunk("tag/fetch", async (tag: string, thunkApi) => {
  try {
    const response = await api.get("/tags", {
      params: { tag },
    });

    return response.data as Tag[];
  } catch (error: any) {
    return thunkApi.rejectWithValue(error?.response?.data || "something went wrong");
  }
});

export const createTagAsync = createAsyncThunk("tag/create", async (name: string, thunkApi) => {
  try {
    const response = await api.post("/tags", {name});

    return response.data as Tag;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error?.response?.data || "something went wrong");
  }
});