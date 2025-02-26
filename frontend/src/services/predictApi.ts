import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const VITE_PYTHON_API_URL = import.meta.env.VITE_PYTHON_API_URL;

export const predictApi = createApi({
  reducerPath: "predictApi",
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_PYTHON_API_URL,
  }),
  endpoints: (builder) => ({
    predict: builder.mutation({
      query: (url) => {
        return {
          url: "/predict",
          method: "POST",
          body: { url },
        };
      },
    }),
  }),
});

export const { usePredictMutation } = predictApi;
