import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const predictApi = createApi({
  reducerPath: "predictApi",
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_API_URL,
  }),
  endpoints: (builder) => ({
    predict: builder.mutation({
      query: (url) => {
        return {
          url: "models/predict",
          method: "POST",
          body: { url },
        };
      },
    }),
  }),
});

export const { usePredictMutation } = predictApi;
