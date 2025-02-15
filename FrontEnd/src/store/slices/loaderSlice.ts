// src/redux/loaderSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoaderState {
  isLoading: boolean;
  status: 'processing' | 'success' | 'error' | 'failed' | null;
  closeDuration: number; // New property to store the dynamic timer duration
}

const initialState: LoaderState = {
  isLoading: false,
  status: null,
  closeDuration: 3000 // New property to store the dynamic timer duration
};

const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
      showLoader: (state, action: PayloadAction<{ status: LoaderState['status'], closeDuration?: number }>) => {
        state.isLoading = true;
        state.status = action.payload.status;
        state.closeDuration = action.payload.closeDuration ?? 3000; // Set dynamic closeDuration or default to 3 seconds
      },
      hideLoader: (state) => {
        state.isLoading = false;
        state.closeDuration = 0
      },
    },
  });

export const { showLoader, hideLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
