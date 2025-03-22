import { configureStore } from "@reduxjs/toolkit";
import { communityApi } from "./features/community/communityApi";
import { internshipApi } from "./features/internships/internshipsApi";
import { projectsApi } from "./features/projects/projectsApi";

const store = configureStore({
  reducer: {
    [communityApi.reducerPath]: communityApi.reducer,
    [internshipApi.reducerPath]: internshipApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      communityApi.middleware,
      internshipApi.middleware,
      projectsApi.middleware
    ),
});

export default store;
