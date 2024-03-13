import React, { useState, useEffect, useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Div, Icon, Text, Button, Notification } from "atomize";
import ReactPlayer from "react-player";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  fetchVideos,
  selectVideosIds,
  selectVideosById,
  selectUserById,
  selectHasMore,
} from "./videosSlice";

const Video = ({ videoId }) => {
  const video = useSelector((state) => selectVideosById(state, videoId));
  const user = useSelector((state) => selectUserById(state, video.user.id));

  return (
    <Div m="3rem" p={{ b: "1rem" }}>
      <Div bg="white" shadow="4" rounded="xl">
        <Button
          h="1.75rem"
          w="1.75rem"
          bg="success300"
          hoverBg="success400"
          rounded="lg"
          m={{ l: "auto", r: "1rem" }}
        >
          <Icon name="RightArrow" size="15px" color="success700" />
        </Button>
        <Div
          d="flex"
          border={{ b: "1px solid" }}
          borderColor="gray300"
          p={{ b: "1.75rem" }}
        >
          <ReactPlayer url={video.url} controls />
          <Div p={{ l: "1rem" }}>
            <Div
              border={{ b: "1px solid" }}
              borderColor="gray300"
              p={{ b: "0.75rem" }}
            >
              <Text textSize="caption" textColor="light">
                Shared by
              </Text>
              <Text textSize="caption" textColor="dark">
                {user.email}
              </Text>
            </Div>
            <Div>
              <Text textSize="caption" textColor="light">
                Description
              </Text>
              <Text
                className="test"
                textSize="caption"
                textColor="dark"
                maxW={{ xs: "auto", md: "30vw" }}
              >
                {String(video.description)}
              </Text>
            </Div>
          </Div>
        </Div>
      </Div>
    </Div>
  );
};

export const VideoList = () => {
  const dispatch = useDispatch();
  const orderedVideoIds = useSelector(selectVideosIds);
  const lastVideoId = orderedVideoIds[orderedVideoIds.length - 1];
  const videoStatus = useSelector((state) => state.videos.status);
  const error = useSelector((state) => state.videos.error);
  const hasMore = useSelector(selectHasMore);

  const [showNotification, setShowNotification] = useState(false);
  const infiniteFetchVideos = useCallback(() => {
    dispatch(fetchVideos(lastVideoId));
  }, [dispatch, lastVideoId]);

  useEffect(() => {
    if (videoStatus === "idle") {
      infiniteFetchVideos();
    }
  }, [videoStatus, infiniteFetchVideos]);

  useEffect(() => {
    setShowNotification(videoStatus === "failed");
  }, [videoStatus]);

  let content;

  if (videoStatus === "succeeded") {
    content = orderedVideoIds.map((videoId) => (
      <Video key={videoId} videoId={videoId} />
    ));
  }

  return (
    <>
      <InfiniteScroll
        dataLength={orderedVideoIds.length}
        next={infiniteFetchVideos}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {content}
      </InfiniteScroll>
      {error && (
        <Notification
          bg="danger300"
          hoverBg="danger400"
          textColor="danger800"
          isOpen={showNotification}
          onClose={() => setShowNotification(false)}
          prefix={
            <Icon
              name="Close"
              color="danger800"
              size="18px"
              m={{ r: "0.5rem" }}
            />
          }
        >
          <Text>{error.detail.msg}</Text>
        </Notification>
      )}
    </>
  );
};
