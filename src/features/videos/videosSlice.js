import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import client from "../../api/client";

const videosAdapter = createEntityAdapter();
const usersAdapter = createEntityAdapter();

const initialState = videosAdapter.getInitialState({
  status: "idle",
  error: null,
  users: usersAdapter.getInitialState(),
});

export const fetchVideos = createAsyncThunk("videos/fetchVideos", async () => {
  const response = await client.get("/videos");
  const { data, included, meta } = response.data;
  const formattedVideos = data.map(
    ({ attributes, relationships, ...otherAttrs }) => ({
      ...otherAttrs,
      ...attributes,
      user: relationships.user.data,
    })
  );
  const formattedUsers = included.map(({ attributes, ...otherAttrs }) => ({
    ...otherAttrs,
    ...attributes,
  }));
  return {
    videos: formattedVideos,
    users: formattedUsers,
    hasNextPage: meta.hasNextPage,
  };
});

const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchVideos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.status = "succeeded";
        videosAdapter.upsertMany(state, action.payload.videos);
        usersAdapter.upsertMany(state.users, action.payload.users);
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default videosSlice.reducer;

export const {
  selectAll: selectAllVideos,
  selectById: selectVideosById,
  selectIds: selectVideosIds,
} = videosAdapter.getSelectors((state) => state.videos);

export const { selectById: selectUserById } = usersAdapter.getSelectors(
  (state) => state.videos.users
);
