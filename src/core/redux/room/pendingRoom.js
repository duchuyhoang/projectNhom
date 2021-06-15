import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createAction
} from '@reduxjs/toolkit';
import { axiosApi } from '@Core/api/axiosApi';
import {roomStatus} from "@Core/const";


export const pendingRoomAdapter = createEntityAdapter({
  selectId: (room) => room.id,
});

export const getPendingRoom = createAsyncThunk(
  'pendingRoom/getPendingRoom',
  async (payload, { rejectWithValue }) => {
    try {
    //   const {
    //     page_index = 1,
    //     items_per_page = 3,
    //     ...searchCondition
    //   } = payload;

    //   const urlSearchQuery = new URLSearchParams({
    //     ...searchCondition,
    //     page_index,
    //     items_per_page,
    //   }).toString();

      const { data } = await axiosApi.get(
        `/room/getPendingRoom`
      );

      return {
        data: data.data,
        // totalPage: data.totalPage,
        // pagination: {
        //   page_index,
        //   items_per_page,
        // },
        // searchCondition:
        //   Object.keys(searchCondition).length === 0 ? null : searchCondition,
      };
    } catch (err) {
      return rejectWithValue({ err:"Không thể xóa" });
    }
  }
);

export const acceptPendingRoom = createAsyncThunk(
  'pendingRoom/acceptPendingRoom',
  async (payload, { rejectWithValue }) => {
    const { id_room } = payload;

    try {
      const response = await axiosApi.post('/admin/acceptRoom', { id_room });
      return { message: 'Đã chấp nhận', id_room };
    } catch (err) {
      return rejectWithValue({ err:"Khoong the chap nhan" });
    }
  }
);


export const rejectPendingRoom=createAsyncThunk(
    'pendingRoom/rejectPendingRoom',
    async (payload, { rejectWithValue }) => {
        const { id_room } = payload;
    
        try {
          const response = axiosApi.post('/admin/rejectRoom', { id_room });
          return { message: 'Đã từ chối', id_room };
        } catch (err) {
          return rejectWithValue({ err });
        }
      }
)


export const clearNotPendingRoom=createAction("pendingRoom/clearNotPendingRoom")



export const pendingRoomSlice = createSlice({
  name: 'pendingRoom',
  initialState: pendingRoomAdapter.getInitialState({
    loading: 'idle',
    acceptRoomLoading: 'idle',
    rejectRoomLoading:"idle",
    error: 'null',
    searchCondition: null,
    pagination: null,
    totalPage: 1,
  }),
  extraReducers: (builder) => {
    builder
      .addCase(getPendingRoom.pending, (state, action) => {
        state.loading = 'pending';
      })
      .addCase(getPendingRoom.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.totalPage = action.payload.totalPage;
        state.searchCondition = action.payload.searchCondition;
        state.pagination = action.payload.pagination;
        pendingRoomAdapter.setAll(state, action.payload.data);
      })
      .addCase(getPendingRoom.rejected, (state, action) => {
        state.loading = 'reject';
      });

    builder
      .addCase(acceptPendingRoom.pending, (state, action) => {
        state.acceptRoomLoading = 'pending';
      })
      .addCase(acceptPendingRoom.fulfilled, (state, action) => {
        state.acceptRoomLoading="fulfilled"
        const {id_room}=action.payload;

        pendingRoomAdapter.removeOne(state,id_room);
        // pendingRoomAdapter.updateOne(state,{id:id_room,changes:{isShow:roomStatus.SHOW}})
      })
      .addCase(acceptPendingRoom.rejected, (state, action) => {
        state.acceptRoomLoading="reject"

      });

      builder.addCase(rejectPendingRoom.pending, (state, action) => {
        state.rejectRoomLoading="pending"
      })
      .addCase(rejectPendingRoom.fulfilled,(state,action)=>{
        state.rejectRoomLoading="fulfilled";

        const {id_room}=action.payload;

        // pendingRoomAdapter.updateOne(state,{id:id_room,changes:{isShow:roomStatus.HIDDEN}})
        pendingRoomAdapter.removeOne(state,id_room);

      })
      .addCase(rejectPendingRoom.rejected,(state, action)=>{
          state.rejectRoomLoading="reject"
      })

      builder.addCase("pendingRoom/clearNotPendingRoom",(state, action)=>{
          const {id_room}=action.payload || [];

          // need upgrade for future version
          // pendingRoomAdapter.removeOne(state,id_room);
      })
  },
});

export default pendingRoomSlice.reducer
