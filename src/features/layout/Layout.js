import React, { useState } from "react";
import { Div, Text, Icon, Button } from "atomize";
import { Link } from "react-router-dom";
import { LoginModal } from "../session/LoginModal";
import { SignupModal } from "../session/SignupModal";
import "./layout.css";

export const Layout = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const onLoginModalOpened = () => setShowLoginModal(true);
  const onLoginModalClosed = () => setShowLoginModal(false);
  const onSignupModalOpened = () => setShowSignupModal(true);
  const onSignupModalClosed = () => setShowSignupModal(false);

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
          <Div d="flex">
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
            <SignupModal
              isOpen={showSignupModal}
              onClose={onSignupModalClosed}
            />
          </Div>
        </Div>
      </div>
    </>
  );
};
