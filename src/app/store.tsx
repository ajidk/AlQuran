import { configureStore } from "@reduxjs/toolkit";
import jadwalSlice from "../feature/jadwal/slice";

export const store = configureStore({
  reducer: {
    jadwal: jadwalSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
