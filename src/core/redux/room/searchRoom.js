import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { axiosApi } from "@Core/api/axiosApi";
import { homeRoomAdapter } from "./homeRoom";

export const searchRoomAdapter = createEntityAdapter({})

export const getRoomSearched = createAsyncThunk(
    '/room/searchRoom',
    async () => {
        try {
           const {data} = await axiosApi.get('/room/search') 
           return data;
        } catch (error) {
            
        }
    }
)


const searchRoom = createSlice({
    name: 'searchRoom',
    initialState: homeRoomAdapter.getInitialState({
        loading: "idle",
        error: null
    }),
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getRoomSearched.pending, (state, action)=>{
            state.loading = "pending";
        })
            .addCase(getRoomSearched.fulfilled, (state, action)=>{
                state.loading = "fulfilled";
                searchRoomAdapter.setAll(state, action.payload.data)
            })
            .addCase(getRoomSearched.rejected, (state, action)=>{
                state.loading = "error";
            })
    }
})