import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "../features/session/sessionSlice";
import videosReducer from "../features/videos/videosSlice";

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    videos: videosReducer,
  },
});
