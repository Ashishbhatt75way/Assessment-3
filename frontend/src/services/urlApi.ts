import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const urlApi = createApi({
  reducerPath: "urlApi",
  tagTypes: ["Url"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  endpoints: (builder) => ({
    getShortUrls: builder.query<ShortenedURL[], void>({
      query: () => "/urls",
      providesTags: ["Url"],
    }),
    createShortUrl: builder.mutation<
      ShortenedURL,
      Omit<ShortenedURL, "id" | "qrCode" | "analytics">
    >({
      query: (newUrl) => ({
        url: "/urls",
        method: "POST",
        body: newUrl,
      }),
      invalidatesTags: ["Url"],
    }),
    deleteShortUrl: builder.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `/urls/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Url"],
    }),
  }),
});

export const {
  useGetShortUrlsQuery,
  useCreateShortUrlMutation,
  useDeleteShortUrlMutation,
} = urlApi;
