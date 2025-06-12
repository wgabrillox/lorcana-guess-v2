import { configureStore } from "@reduxjs/toolkit";
import optionsReducer from "../features/optionsSection/optionsSlice";
import mainReducer from "../features/mainSection/mainSlice";

export const store = configureStore({
  reducer: {
    options: optionsReducer,
    main: mainReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
