import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Div,
  Input,
  Icon,
  Text,
  Label,
  Checkbox,
  Modal,
} from "atomize";
import { login } from "./sessionSlice";

export const LoginModal = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const error = useSelector((state) => state.session.error.login);
  const dispatch = useDispatch();

  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onRememberMeChanged = (e) => setRememberMe(e.target.checked);
  const onPasswordVisibleClicked = () => setShowPassword(!showPassword);
  const onFormSubmitted = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
      rememberMe,
    };
    dispatch(login({ user }));
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
          Login
        </Text>
        <Div d="flex" flexDir="column" align="center" w="80%" m="0 auto">
          {error && (
            <Text textSize="caption" textColor="danger700">
              {error && error.detail ? error.detail : error}
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
                  onClick={onPasswordVisibleClicked}
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
            <Div d="flex" align="center" m={{ t: "1rem" }}>
              <Div d="flex" flexGrow="1">
                <Button bg="info700" type="submit">
                  Login
                </Button>
              </Div>
              <Label align="center" textWeight="600">
                <Checkbox
                  onChange={onRememberMeChanged}
                  checked={rememberMe}
                  inactiveColor="success400"
                  activeColor="success700"
                  size="24px"
                />
                Remember Me
              </Label>
            </Div>
          </form>
        </Div>
      </Div>
    </Modal>
  );
};
