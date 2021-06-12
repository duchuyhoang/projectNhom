import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi } from "@Core/api/axiosApi";


export const setSelectedRoomByNameRouter = createAsyncThunk(
    "currentRoom/setSelectedRoomByNameRouter",
    async (payload, { rejectWithValue }) => {

        const { name_router } = payload;
        try {
            const response = await axiosApi.get(`/room/currentRoom/${name_router}`)

            return {data:response.data.data[0] || null};

        }
        catch (e) {
            return rejectWithValue(e);
        }



    })



const currentRoom = createSlice({
    name: "currentRoom",
    initialState: {
        currentRoom: null,
        loading: "idle",
        error: null,
    },
    reducer: {},
    extraReducers: (builder) => {
        builder.addCase(setSelectedRoomByNameRouter.pending, (state, {payload}) => {
            state.loading = "pending";
        }).addCase(setSelectedRoomByNameRouter.fulfilled,(state, {payload}) => {
            state.loading = "fulfilled";
            state.currentRoom=payload.data;
        }).addCase(setSelectedRoomByNameRouter.rejected,(state, {payload}) => {
            state.loading="rejected";
        })

        builder.addCase("setARoom",(state, payload) => {
            console.log(payload);
            state.room =payload
        })
    }
})


export default currentRoom.reducer;