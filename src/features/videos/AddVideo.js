import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Div, Icon, Text, Button, Input } from "atomize";
import { addVideo, changeAddVideoStatus } from "./videosSlice";

export const AddVideo = () => {
  const [url, setUrl] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const videoStatus = useSelector((state) => state.videos.addVideo.status);
  const error = useSelector((state) => state.videos.addVideo.error);
  const hasDetailedError = error && error.detail;

  const onUrlChanged = (e) => setUrl(e.target.value);
  const onFormSubmitted = (e) => {
    e.preventDefault();
    dispatch(addVideo({ url }));
  };

  useEffect(() => {
    if (videoStatus === "succeeded") {
      dispatch(changeAddVideoStatus("idle"));
      navigate("/");
    }
  }, [videoStatus, dispatch, navigate]);

  return (
    <Div m="3rem" p={{ b: "1rem" }}>
      <Div bg="white" shadow="4" rounded="xl">
        <Div
          border={{ b: "1px solid" }}
          borderColor="gray300"
          p={{ b: "1.75rem" }}
        >
          <Text
            tag="h1"
            textSize="subheader"
            m={{ t: "3rem" }}
            textAlign="center"
          >
            Share a Youtube video
          </Text>
          {hasDetailedError && typeof error.detail === "string" && (
            <Text textSize="caption" textColor="danger700" textAlign="center">
              {error.detail}
            </Text>
          )}
          <Div d="flex" flexDir="column" w="50%" m="0 auto">
            <form onSubmit={onFormSubmitted}>
              <Input
                placeholder="Youtube URL"
                m={{ t: "1.5rem", b: "0.5rem" }}
                onChange={onUrlChanged}
              />
              {hasDetailedError && error.detail.url && (
                <Text
                  textSize="caption"
                  textColor="danger700"
                  p={{ l: "0.5rem", b: "0.5rem" }}
                >
                  {`Youtube URL ${error.detail.url[0]}`}
                </Text>
              )}
              <Button
                h="2rem"
                w="20%"
                p={{ x: "0.75rem" }}
                textColor="info700"
                hoverTextColor="info900"
                bg="white"
                hoverBg="info200"
                border="1px solid"
                borderColor="info700"
                hoverBorderColor="info900"
                suffix={
                  <Icon
                    name="External"
                    size="16px"
                    color="info700"
                    m={{ r: "0.5rem" }}
                  />
                }
              >
                Share
              </Button>
            </form>
          </Div>
        </Div>
      </Div>
    </Div>
  );
};
