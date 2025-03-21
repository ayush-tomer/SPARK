import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utilis/baseUrl.js";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/community`,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const communityApi = createApi({
  reducerPath: "communityApi",
  baseQuery,
  endpoints: (builder) => ({
    getAllCommunities: builder.query({
      query: () => "/get-community",
    }),
    addCommunity: builder.mutation({
      query: (communityData) => ({
        url: "/create-community",
        method: "POST",
        body: communityData,
      }),
    }),
    updateCommunity: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/update-community/${id}`,
        method: "PUT",
        body: updatedData,
      }),
    }),
    deleteCommunity: builder.mutation({
      query: (id) => ({
        url: `/delete-community/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllCommunitiesQuery,
  useAddCommunityMutation,
  useUpdateCommunityMutation,
  useDeleteCommunityMutation,
} = communityApi;
