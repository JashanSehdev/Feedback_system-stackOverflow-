import { createAsyncThunk } from "@reduxjs/toolkit";
import { dispatchComment } from "./comment.type";
import { api, getErrorMessage } from "@/api/api";

export const addCommentAsync = createAsyncThunk(
    'create thunk async',
    async (data : dispatchComment, thunkApi) => {
        try {
            const response = await api.post("/comments", data);
            return response.data
        } catch (error : unknown) {
            return thunkApi.rejectWithValue(getErrorMessage(error))
        }
    }   
)

export const getFeedCommentAsync = createAsyncThunk(
    'create thunk async',
    async (feedbackId : number, thunkApi) => {
        try {
            const response = await api.get(`/comments/feedback/${feedbackId}`);
            return response.data
        } catch (error : unknown) {
            return thunkApi.rejectWithValue(getErrorMessage(error))
        }
    }   
)