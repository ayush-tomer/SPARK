import { configureStore } from "@reduxjs/toolkit";
import { communityApi } from "./features/community/communityApi";
import { internshipApi } from "./features/internships/internshipsApi";
import { projectsApi } from "./features/projects/projectsApi";
import { problemStatementsApi } from "./features/problemStatements/problemStatements";

const store = configureStore({
  reducer: {
    [communityApi.reducerPath]: communityApi.reducer,
    [internshipApi.reducerPath]: internshipApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [problemStatementsApi.reducerPath]: problemStatementsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      communityApi.middleware,
      internshipApi.middleware,
      projectsApi.middleware,
      problemStatementsApi.middleware
    ),
});

export default store;
