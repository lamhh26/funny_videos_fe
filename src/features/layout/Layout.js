import React, { useState, useContext, useEffect } from "react";
import { Div, Text, Icon, Button, Tag, Container, Notification } from "atomize";
import { Link, useNavigate } from "react-router-dom";
import { LoginModal } from "../session/LoginModal";
import { SignupModal } from "../session/SignupModal";
import { CableContext } from "../../contexts/cableContext";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectCurrentUser,
  logout,
} from "../session/sessionSlice";

import "./layout.css";

const formatMessage = ({ data, included }) => {
  const { attributes, relationships, ...otherAttrs } = data;
  const formattedVideo = {
    ...otherAttrs,
    ...attributes,
  };
  const formattedUsers = included.map(({ attributes, ...otherAttrs }) => ({
    ...otherAttrs,
    ...attributes,
  }));
  return { video: formattedVideo, user: formattedUsers[0] };
};

const NonLoggedIn = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const onLoginModalOpened = () => setShowLoginModal(true);
  const onLoginModalClosed = () => setShowLoginModal(false);
  const onSignupModalOpened = () => setShowSignupModal(true);
  const onSignupModalClosed = () => setShowSignupModal(false);

  return (
    <>
      <Button
        h="2.5rem"
        p={{ x: "1rem" }}
        textSize="body"
        textColor="info700"
        hoverTextColor="info900"
        bg="white"
        hoverBg="info200"
        border="1px solid"
        borderColor="info700"
        hoverBorderColor="info900"
        m={{ r: "0.5rem" }}
        onClick={onLoginModalOpened}
      >
        Login
      </Button>
      <LoginModal isOpen={showLoginModal} onClose={onLoginModalClosed} />
      <Button
        h="2.5rem"
        p={{ x: "1rem" }}
        textSize="body"
        textColor="info700"
        hoverTextColor="info900"
        bg="white"
        hoverBg="info200"
        border="1px solid"
        borderColor="info700"
        hoverBorderColor="info900"
        m={{ r: "0.5rem" }}
        onClick={onSignupModalOpened}
      >
        Signup
      </Button>
      <SignupModal isOpen={showSignupModal} onClose={onSignupModalClosed} />
    </>
  );
};

const LoggedIn = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [sharedUser, setSharedUser] = useState({
    id: null,
    email: null,
  });
  const [sharedVideoTitle, setSharedVideoTitle] = useState("");

  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cable = useContext(CableContext);

  const onNotificationClosed = () => {
    setShowNotification(false);
    setSharedVideoTitle("");
    setSharedUser({ id: null, email: null });
  };
  const onLogoutClicked = () => dispatch(logout());
  const onShareClicked = () => {
    navigate("/share");
  };

  useEffect(() => {
    cable.subscriptions.create(
      {
        channel: "NotificationsChannel",
      },
      {
        received: (message) => {
          const { video, user } = formatMessage(message);
          if (currentUser.id !== user.id) {
            setSharedVideoTitle(video.title);
            setSharedUser({ id: user.id, email: user.email });
            setShowNotification(true);
          }
        },
      }
    );
  }, [cable.subscriptions, currentUser]);

  return (
    <>
      <Tag
        bg={"success100"}
        border="1px solid"
        borderColor={"none"}
        textColor={"success800"}
        m={{ r: "0.5rem" }}
      >
        Welcome {currentUser.email}
      </Tag>
      <Button
        h="2.5rem"
        p={{ x: "1rem" }}
        textSize="body"
        textColor="info700"
        hoverTextColor="info900"
        bg="white"
        hoverBg="info200"
        border="1px solid"
        borderColor="info700"
        hoverBorderColor="info900"
        m={{ r: "0.5rem" }}
        onClick={onShareClicked}
      >
        Share a video
      </Button>
      <Button
        h="2.5rem"
        p={{ x: "1rem" }}
        textSize="body"
        textColor="info700"
        hoverTextColor="info900"
        bg="white"
        hoverBg="info200"
        border="1px solid"
        borderColor="info700"
        hoverBorderColor="info900"
        m={{ r: "0.5rem" }}
        onClick={onLogoutClicked}
      >
        Logout
      </Button>
      <Notification
        bg="info100"
        textColor="info800"
        isOpen={showNotification}
        onClose={() => {}}
        suffix={
          <Icon
            name="Cross"
            pos="absolute"
            top="1rem"
            right="0.5rem"
            size="15px"
            cursor="pointer"
            m={{ r: "0.5rem" }}
            onClick={onNotificationClosed}
          />
        }
      >
        <Text>
          <b>{sharedUser.email}</b> has shared a video: "{sharedVideoTitle}"
        </Text>
      </Notification>
    </>
  );
};

export const Layout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const content = isLoggedIn ? <LoggedIn /> : <NonLoggedIn />;

  return (
    <>
      <div className="topnav">
        <Link to="/">
          <Div d="flex" align="center">
            <Icon name="HomeSolid2" />
            <Text tag="h1" textSize="heading">
              Funny Videos
            </Text>
          </Div>
        </Link>
        <Div m={{ l: "auto" }}>
          <Div d="flex">{content}</Div>
        </Div>
      </div>
      <Container>{children}</Container>
    </>
  );
};
