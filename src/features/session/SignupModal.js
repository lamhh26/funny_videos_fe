import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Div, Input, Icon, Text, Modal } from "atomize";
import { signup } from "./sessionSlice";

export const SignupModal = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const error = useSelector((state) => state.session.signup.error);
  const hasDetailedError = error && error.detail;
  const dispatch = useDispatch();

  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onShowPasswordClicked = () => setShowPassword(!showPassword);
  const onPasswordConfirmationChanged = (e) =>
    setPasswordConfirmation(e.target.value);
  const onShowPasswordConfiramtionClicked = () =>
    setShowPasswordConfirmation(!showPassword);
  const onFormSubmitted = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
      passwordConfirmation,
    };
    dispatch(signup({ user }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} align="start" rounded="md">
      <Icon
        name="Cross"
        pos="absolute"
        top="1rem"
        right="1rem"
        size="16px"
        onClick={onClose}
        cursor="pointer"
      />
      <Div>
        <Text
          tag="h1"
          textSize="subheader"
          m={{ t: "3rem" }}
          textAlign="center"
        >
          Signup
        </Text>
        <Div d="flex" flexDir="column" align="center" w="80%" m="0 auto">
          {hasDetailedError && typeof error.detail === "string" && (
            <Text textSize="caption" textColor="danger700">
              {error.detail}
            </Text>
          )}
          <form
            classsname="form-signin"
            style={{ width: "100%" }}
            onSubmit={onFormSubmitted}
          >
            <Input
              placeholder="Email"
              m={{ t: "1.5rem" }}
              value={email}
              onChange={onEmailChanged}
            />
            {hasDetailedError && error.detail.email && (
              <Text
                textSize="caption"
                textColor="danger700"
                p={{ l: "0.5rem" }}
              >
                {`Email ${error.detail.email[0]}`}
              </Text>
            )}
            <Input
              m={{ t: "1rem" }}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={onPasswordChanged}
              suffix={
                <Button
                  type="button"
                  pos="absolute"
                  onClick={onShowPasswordClicked}
                  bg="transparent"
                  w="3rem"
                  top="0"
                  right="0"
                  rounded={{ r: "md" }}
                >
                  <Icon
                    name={showPassword ? "EyeSolid" : "Eye"}
                    color={showPassword ? "danger800" : "success800"}
                    size="16px"
                  />
                </Button>
              }
            />
            {hasDetailedError && error.detail.password && (
              <Text
                textSize="caption"
                textColor="danger700"
                p={{ l: "0.5rem" }}
              >
                {`Password ${error.detail.password[0]}`}
              </Text>
            )}
            <Input
              m={{ t: "1rem" }}
              placeholder="Password confirmation"
              type={showPasswordConfirmation ? "text" : "password"}
              value={passwordConfirmation}
              onChange={onPasswordConfirmationChanged}
              suffix={
                <Button
                  type="button"
                  pos="absolute"
                  onClick={onShowPasswordConfiramtionClicked}
                  bg="transparent"
                  w="3rem"
                  top="0"
                  right="0"
                  rounded={{ r: "md" }}
                >
                  <Icon
                    name={showPasswordConfirmation ? "EyeSolid" : "Eye"}
                    color={
                      showPasswordConfirmation ? "danger800" : "success800"
                    }
                    size="16px"
                  />
                </Button>
              }
            />
            {hasDetailedError && error.detail.passwordConfirmation && (
              <Text
                textSize="caption"
                textColor="danger700"
                p={{ l: "0.5rem" }}
              >
                {`Password confirmation ${error.detail.passwordConfirmation[0]}`}
              </Text>
            )}
            <Div d="flex" align="center" m={{ t: "1rem" }}>
              <Div d="flex" flexGrow="1">
                <Button bg="info700" type="submit">
                  Signup
                </Button>
              </Div>
            </Div>
          </form>
        </Div>
      </Div>
    </Modal>
  );
};
