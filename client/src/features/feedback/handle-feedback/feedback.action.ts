import { api } from "@/api/api"
import { FeedbackInputs } from "@/components/create/create-feedback/create-feedback.type"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const postFeedbackAsync = createAsyncThunk(
    'feedback/create',
    async (data : FeedbackInputs, thunkApi) => {
        try {
            const response = await api.post("/feedbacks", data)
            return response.data
        } catch (error: any) {
            return thunkApi.rejectWithValue(
                error?.response?.data || 'something went wrong'
            )
        }
    }
)   

export const fetchFeedbacksAsync = createAsyncThunk(
    'feedback/fetch',
    async (_, thunkApi) => {
        try {
            const response = await api.get('feedbacks')
            return response.data
        } catch (error : any) {
            return thunkApi.rejectWithValue(
                error?.response?.data || 'something went wrong'
            )
        }
    }
)