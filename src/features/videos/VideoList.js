import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Div, Icon, Text, Button } from "atomize";
import ReactPlayer from "react-player";
import {
  selectAllVideos,
  fetchVideos,
  selectVideosIds,
  selectVideosById,
  selectUserById,
} from "./videosSlice";

const Video = ({ videoId }) => {
  const video = useSelector((state) => selectVideosById(state, videoId));
  const user = useSelector((state) => selectUserById(state, video.user.id));

  return (
    <Div m="3rem" p={{ b: "1rem" }}>
      <Div bg="white" shadow="4" rounded="xl">
        <Button
          h="2.5rem"
          w="2.5rem"
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

  const videoStatus = useSelector((state) => state.videos.status);
  const error = useSelector((state) => state.videos.error);

  useEffect(() => {
    if (videoStatus === "idle") {
      dispatch(fetchVideos());
    }
  }, [videoStatus, dispatch]);

  let content;

  if (videoStatus === "succeeded") {
    content = orderedVideoIds.map((videoId) => (
      <Video key={videoId} videoId={videoId} />
    ));
  }

  return <>{content}</>;
};
