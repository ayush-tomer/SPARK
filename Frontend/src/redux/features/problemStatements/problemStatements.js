import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://localhost:8080/api/problemStatement";

export const problemStatementsApi = createApi({
  reducerPath: "problemStatementsApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getProblemStatements: builder.query({
      query: () => "/getAll-Statement",
      providesTags: ["ProblemStatements"],
    }),
    getProblemStatement: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "ProblemStatements", id }],
    }),
    createProblemStatement: builder.mutation({
      query: (newStatement) => ({
        url: "/create-Statement",
        method: "POST",
        body: newStatement,
      }),
      invalidatesTags: ["ProblemStatements"],
    }),
    updateProblemStatement: builder.mutation({
      query: ({ id, data }) => ({
        url: `/update-Statement/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "ProblemStatements", id },
      ],
    }),
    deleteProblemStatement: builder.mutation({
      query: (id) => ({
        url: `/delete-Statement/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProblemStatements"],
    }),
  }),
});

export const {
  useGetProblemStatementsQuery,
  useGetProblemStatementQuery,
  useCreateProblemStatementMutation,
  useUpdateProblemStatementMutation,
  useDeleteProblemStatementMutation,
} = problemStatementsApi;
