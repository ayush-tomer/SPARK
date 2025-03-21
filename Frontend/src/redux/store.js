import { configureStore } from "@reduxjs/toolkit";
import { communityApi } from "./features/community/communityApi";

const store = configureStore({
  reducer: {
    [communityApi.reducerPath]: communityApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(communityApi.middleware),
});

export default store;
