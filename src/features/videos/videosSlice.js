import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import client from "../../api/client";
import { camelizeKeys, decamelizeKeys } from "humps";

const videosAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.id - a.id,
});
const usersAdapter = createEntityAdapter();

const initialState = videosAdapter.getInitialState({
  fetchVideos: {
    status: "idle",
    error: null,
  },
  addVideo: {
    status: "idle",
    error: null,
  },
  hasMore: true,
  users: usersAdapter.getInitialState(),
});

export const fetchVideos = createAsyncThunk(
  "videos/fetchVideos",
  async (lastId, { rejectWithValue }) => {
    let response;
    try {
      response = await client.get("/videos", {
        params: decamelizeKeys({ lastId }),
      });
    } catch (error) {
      return rejectWithValue(
        error.response
          ? error.response.data
          : { error: { detail: error.message } }
      );
    }
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
      hasNextPage: camelizeKeys(meta).hasNextPage,
    };
  }
);

export const addVideo = createAsyncThunk(
  "videos/addVideo",
  async (video, { rejectWithValue }) => {
    let response;
    try {
      response = await client.post("/videos", video);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
    const { data, included } = response.data;
    const { attributes, relationships, ...otherAttrs } = data;
    const formattedVideo = {
      ...otherAttrs,
      ...attributes,
      user: relationships.user.data,
    };
    const formattedUsers = included.map(({ attributes, ...otherAttrs }) => ({
      ...otherAttrs,
      ...attributes,
    }));
    return { video: formattedVideo, user: formattedUsers[0] };
  }
);

const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    changeAddVideoStatus(state, action) {
      state.addVideo.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.fetchVideos.status = "loading";
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.fetchVideos.status = "succeeded";
        state.hasMore = action.payload.hasNextPage;
        videosAdapter.upsertMany(state, action.payload.videos);
        usersAdapter.upsertMany(state.users, action.payload.users);
        state.fetchVideos.error = null;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.fetchVideos.status = "failed";
        state.fetchVideos.error = action.payload.error;
      })
      .addCase(addVideo.pending, (state) => {
        state.addVideo.status = "loading";
      })
      .addCase(addVideo.fulfilled, (state, action) => {
        state.addVideo.status = "succeeded";
        videosAdapter.addOne(state, action.payload.video);
        usersAdapter.addOne(state.users, action.payload.user);
        state.addVideo.error = null;
      })
      .addCase(addVideo.rejected, (state, action) => {
        state.addVideo.status = "failed";
        state.addVideo.error = action.payload.error;
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

export const { changeAddVideoStatus } = videosSlice.actions;

export const selectHasMore = (state) => state.videos.hasMore;
