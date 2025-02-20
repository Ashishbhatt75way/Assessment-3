import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: ShortenedURL[] = [];

export const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {
    addUrl: (state, action: PayloadAction<ShortenedURL>) => {
      state.push(action.payload);
    },
    deleteUrl: (state, action: PayloadAction<{ id: number }>) => {
      state = state.filter((url) => url.id !== action.payload.id);
    },
  },
});

export const { addUrl, deleteUrl } = urlSlice.actions;
export default urlSlice.reducer;
