import { configureStore } from "@reduxjs/toolkit";
import { communityApi } from "./features/community/communityApi";
import { internshipApi } from "./features/internships/internshipsApi";

const store = configureStore({
  reducer: {
    [communityApi.reducerPath]: communityApi.reducer,
    [internshipApi.reducerPath]: internshipApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      communityApi.middleware,
      internshipApi.middleware
    ),
});

export default store;
