import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utilis/baseUrl.js"; // Utility function for dynamic base URL

// Base Query with Authorization Token Handling
const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/internship`,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const internshipApi = createApi({
  reducerPath: "internshipApi",
  baseQuery,
  endpoints: (builder) => ({
    // Get All Internships
    getAllInternships: builder.query({
      query: () => "/getAll-internship",
    }),

    // Get Single Internship
    getInternship: builder.query({
      query: (id) => `/getSingle-internship/${id}`,
    }),

    // Create Internship
    addInternship: builder.mutation({
      query: (internshipData) => ({
        url: "/create-internship",
        method: "POST",
        body: internshipData,
      }),
    }),

    // Update Internship
    updateInternship: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/update-internship/${id}`,
        method: "PUT",
        body: updatedData,
      }),
    }),

    // Delete Internship
    deleteInternship: builder.mutation({
      query: (id) => ({
        url: `/delete-internship/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export Hooks
export const {
  useGetAllInternshipsQuery,
  useGetInternshipQuery,
  useAddInternshipMutation,
  useUpdateInternshipMutation,
  useDeleteInternshipMutation,
} = internshipApi;
