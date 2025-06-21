import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utilis/baseUrl.js"; // Utility function for dynamic base URL

// Base Query with Authorization Token Handling
const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/projects`,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery,
  endpoints: (builder) => ({
    // Get All Projects
    getAllProjects: builder.query({
      query: () => "/getAll-project",
    }),

    // Get Single Project
    getProject: builder.query({
      query: (id) => `/getSingle-project/${id}`,
    }),

    // Create Project
    addProject: builder.mutation({
      query: (projectData) => ({
        url: "/create-project",
        method: "POST",
        body: projectData,
      }),
    }),

    // Update Project
    updateProject: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/update-project/${id}`,
        method: "PUT",
        body: updatedData,
      }),
    }),

    // Delete Project
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/delete-project/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export Hooks
export const {
  useGetAllProjectsQuery,
  useGetProjectQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;
