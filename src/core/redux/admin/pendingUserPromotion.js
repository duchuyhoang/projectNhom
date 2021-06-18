import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { axiosApi } from '@Core/api/axiosApi';

export const getUserPendingPromotionRequest = createAsyncThunk(
  'pendingUser/getUserPendingPromotionRequest',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get('/admin/getPendingPromotion');

      return { data: response.data.data };
    } catch (err) {
      return rejectWithValue({ err: 'Loi' });
    }
  }
);

export const acceptUserPendingPromotionRequest = createAsyncThunk(
  "pendingUser/acceptUserPendingPromotionRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const { id_user,id } = payload;

      const response = await axiosApi.post(
        '/admin/acceptUserPendingPromotionRequest',
        {id_user}
      );

      return { message: 'Thăng chức thành công',id };
    } catch (err) {
        console.log(err);
      return rejectWithValue({ err: 'Thăng chức thất bại' });
    }
  }
);


export const rejectUserPendingPromotionRequest= createAsyncThunk(
    "pendingUser/rejectUserPendingPromotionRequest,", async (payload, { rejectWithValue }) => {
        try {
          const { id_user,id } = payload;
    
          const response = await axiosApi.post(
            '/admin/rejectUserPendingPromotionRequest',
            {id_user}
          );
    
          return { message: 'Từ chối thành công',id };
        } catch (err) {
          return rejectWithValue({ err: 'Từ chối thất bại' });
        }
      })

export const pendingUserEnityAdapter = createEntityAdapter({
  selectId: (pendingRequest) => pendingRequest.id,
});

const pendingUserSlice = createSlice({
  name: 'pendingUser',
  initialState: pendingUserEnityAdapter.getInitialState({
    loading: 'idle',
    acceptLoading:"idle",
    rejectLoading:"idle",
    error: null,
  }),
  extraReducers: (builder) => {
    builder
      .addCase(getUserPendingPromotionRequest.pending, (state, action) => {
        state.loading = 'pending';
      })
      .addCase(getUserPendingPromotionRequest.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        pendingUserEnityAdapter.setAll(state, action.payload.data);
      })
      .addCase(getUserPendingPromotionRequest.rejected, (state, action) => {
        state.loading = 'reject';
      });

      builder
      .addCase(acceptUserPendingPromotionRequest.pending, (state, action) => {
        state.acceptLoading = 'pending';
      })
      .addCase(acceptUserPendingPromotionRequest.fulfilled, (state, action) => {
        state.acceptLoading = 'fulfilled';
        console.log(action);
        pendingUserEnityAdapter.removeOne(state, action.payload.id);
      })
      .addCase(acceptUserPendingPromotionRequest.rejected, (state, action) => {
          console.log("hea");
        state.acceptLoading = 'reject';
      });

      builder
      .addCase(rejectUserPendingPromotionRequest.pending, (state, action) => {
        state.rejectLoading = 'pending';
      })
      .addCase(rejectUserPendingPromotionRequest.fulfilled, (state, action) => {
        state.rejectLoading = 'fulfilled';
        pendingUserEnityAdapter.removeOne(state, action.payload.id);
      })
      .addCase(rejectUserPendingPromotionRequest.rejected, (state, action) => {
        state.rejectLoading = 'reject';
      });
  },
});

export default pendingUserSlice.reducer;
