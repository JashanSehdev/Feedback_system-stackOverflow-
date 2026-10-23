import { api, getErrorMessage } from "@/api/api"
import { VoteEnum } from "@/type/feedback.type"
import { createAsyncThunk } from "@reduxjs/toolkit"


export const setVoteAsync =  createAsyncThunk(
    'vote/set',
    async ( data : {feedbackId : number, voteType : VoteEnum}, thunkApi) => {
          try {
            const response = await api.post("votes", data)

            return response.data
        } catch(error : unknown) {
             return thunkApi.rejectWithValue(getErrorMessage(error))
        }
    }
)

