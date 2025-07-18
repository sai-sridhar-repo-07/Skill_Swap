import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface CreditState {
  balance: number;
  totalEarned: number;
  totalSpent: number;
  loading: boolean;
  error: string | null;
}

const initialState: CreditState = {
  balance: 0,
  totalEarned: 0,
  totalSpent: 0,
  loading: false,
  error: null,
};

export const fetchCredits = createAsyncThunk(
  'credits/fetch',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const state: any = thunkAPI.getState();
      const userId = state.auth.user?._id;
      const res = await axios.get(`${API}/credits/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue('Failed to load credits');
    }
  }
);

const creditSlice = createSlice({
  name: 'credits',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCredits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCredits.fulfilled, (state, action) => {
        const { balance, totalEarned, totalSpent } = action.payload;
        state.balance = balance;
        state.totalEarned = totalEarned;
        state.totalSpent = totalSpent;
        state.loading = false;
      })
      .addCase(fetchCredits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default creditSlice.reducer;
