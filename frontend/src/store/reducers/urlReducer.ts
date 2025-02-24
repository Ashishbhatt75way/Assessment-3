import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { urlApi } from "../../services/urlApi";

const initialState: ShortenedURL[] = [];

export const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {
    addUrl: (state, action: PayloadAction<ShortenedURL>) => {
      state.push(action.payload);
    },
    deleteUrl: (state, action: PayloadAction<{ id: number }>) => {
      return state.filter((url) => url.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      urlApi.endpoints.getShortUrls.matchFulfilled,
      (state, action: PayloadAction<ShortenedURL[]>) => {
        return (state = action.payload);
      }
    );
    builder.addMatcher(
      urlApi.endpoints.deleteShortUrl.matchFulfilled,
      (state, action: PayloadAction<{ id: number }>) => {
        return state.filter((url) => url.id !== action.payload.id);
      }
    );
  },
});

export const { addUrl, deleteUrl } = urlSlice.actions;
export default urlSlice.reducer;
