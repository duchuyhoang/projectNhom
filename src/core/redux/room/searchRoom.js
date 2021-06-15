import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { axiosApi } from '@Core/api/axiosApi';
import { homeRoomAdapter } from './homeRoom';

export const searchRoomAdapter = createEntityAdapter({
  selectId: (room) => room.id,
});

export const getRoomsSearched = createAsyncThunk(
  '/room/searchRoom',
  async (payload, { rejectWithValue }) => {
    try {
      // console.log("payload", payload);

      const {
        page_index = 1,
        items_per_page = 3,
        ...searchCondition
      } = payload;

      const urlSearchQuery = new URLSearchParams({
        ...searchCondition,
        page_index,
        items_per_page,
      }).toString();

      const { data } = await axiosApi.get(`/room/search?${urlSearchQuery}`);
     
      return {
        data: data.data,
        totalPage: data.totalPage,
        pagination: {
          page_index,
          items_per_page,
        },
        searchCondition:
          Object.keys(searchCondition).length === 0 ? null : searchCondition,
      };
    } catch (error) {
      return rejectWithValue({err})
    }
  }
);

const searchRoom = createSlice({
  name: 'searchRoom',
  initialState: searchRoomAdapter.getInitialState({
    loading: 'idle',
    error: null,
    searchCondition: null,
    pagination: null,
    totalPage: 1,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRoomsSearched.pending, (state, action) => {
        state.loading = 'pending';
      })
      .addCase(getRoomsSearched.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.totalPage = action.payload.totalPage;
        state.searchCondition = action.payload.searchCondition;
        state.pagination = action.payload.pagination;
        searchRoomAdapter.setAll(state, action.payload.data);
      })
      .addCase(getRoomsSearched.rejected, (state, action) => {
        state.loading = 'error';
        state.totalPage=1;
      });
  },
});

export default searchRoom.reducer;
