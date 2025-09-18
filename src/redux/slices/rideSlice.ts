// store/rideSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Ride } from "../../types/ride";

interface RideState {
  rides: Ride[];
  loading: boolean;
  error: string | null;
}

const initialState: RideState = {
  rides: [],
  loading: false,
  error: null,
};

// ✅ Fetch user rides
export const fetchUserRides = createAsyncThunk("rides/fetchUserRides", async (userId: string) => {
  const res = await axios.get(`/api/rides/user/${userId}`);
  return res.data;
});

const rideSlice = createSlice({
  name: "rides",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRides.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserRides.fulfilled, (state, action) => {
        state.loading = false;
        state.rides = action.payload;
      })
      .addCase(fetchUserRides.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch rides";
      });
  },
});

export default rideSlice.reducer;
