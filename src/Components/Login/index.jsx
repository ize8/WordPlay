import React, { useState, useEffect } from "react";

import { Button } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Backdrop } from "@material-ui/core";
import { Grow } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export const Login = ({
  onLogin,
  onRegister,
  onCancel,
  onResetPassword,
  error,
  loading
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("Bugs Bunny");
  const [doingLogin, setDoingLogin] = useState(true);
  const [showError, setShowError] = useState(false);
  const [internalError, setInternalError] = useState("Demo Error!");
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    if (error) AlertError(error);
    else setShowError(false);
  }, [error]);

  const AlertError = error => {
    setInternalError(error);
    setShowError(true);
  };

  const validateEmail = () => {
    const pattern = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const valid = pattern.test(email);
    if (!valid) setEmailError(true);
    else setEmailError(false);
    return valid;
  };

  const onClickedSubmit = () => {
    if (validateEmail())
      if (doingLogin) onLogin(email, password);
      else {
        if (password !== repeatPassword) AlertError("Passwords don't match!");
        else onRegister(name, email, password);
      }
  };

  const onClickedReset = () => {
    if (validateEmail()) onResetPassword(email);
  };

  const DialogTitle = ({ main, sub, onSubClick, ...props }) => (
    <div {...props}>
      <h1
        key={main}
        style={{
          fontFamily: "Courier",
          textAlign: "center",
          position: "relative",
          cursor: "default"
        }}
      >
        {main}
        <span
          key={sub}
          onClick={onSubClick}
          style={{
            fontFamily: "Courier",
            fontSize: "12px",
            color: "gray",
            cursor: "pointer",
            position: "absolute",
            left: "50%",
            top: "100%",
            zIndex: "20"
          }}
        >
          {sub}
        </span>
      </h1>
    </div>
  );

  return (
    <Backdrop
      open={true}
      style={{
        color: "#fff",
        zIndex: 3,
        overflowY: "auto",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed"
      }}
    >
      <Paper
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "5px 5px 8px black"
        }}
      >
        <div
          style={{
            backgroundColor: "gainsboro",
            width: "100%",
            borderBottom: "1px solid gray"
          }}
        >
          {doingLogin && (
            <Grow in={doingLogin} timeout={400}>
              <DialogTitle
                main="Login"
                sub="Register"
                onSubClick={() => setDoingLogin(false)}
              />
            </Grow>
          )}
          {!doingLogin && (
            <Grow in={!doingLogin} timeout={400}>
              <DialogTitle
                main="Register"
                sub="Login"
                onSubClick={() => setDoingLogin(true)}
              />
            </Grow>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px",
            position: "relative"
          }}
        >
          {showError && (
            <Alert
              severity="error"
              style={{ marginBottom: "10px", width: "90%" }}
            >
              <span>{internalError}</span>
            </Alert>
          )}
          {!doingLogin && (
            <TextField
              label="Name"
              variant="outlined"
              style={{ marginBottom: "10px" }}
              value={name}
              onChange={e => setName(e.target.value)}
            />
          )}
          <TextField
            label="Email"
            error={emailError}
            helperText={emailError ? "Incorrect email" : null}
            variant="outlined"
            style={{ marginBottom: "10px" }}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            style={{ marginBottom: "10px" }}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {!doingLogin && (
            <TextField
              type="password"
              label="Repeat Password"
              variant="outlined"
              value={repeatPassword}
              onChange={e => setRepeatPassword(e.target.value)}
            />
          )}
          {doingLogin && (
            <p
              onClick={onClickedReset}
              style={{ color: "gray", cursor: "pointer" }}
            >
              <i>Forgot password</i>
            </p>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%"
          }}
        >
          <Button
            style={{ borderRadius: "0px" }}
            color="primary"
            variant="contained"
            disabled={loading}
            onClick={onClickedSubmit}
          >
            {doingLogin ? "Login" : "Register"}
          </Button>
          <Button
            style={{ borderRadius: "0px" }}
            color="secondary"
            variant="contained"
            onClick={onCancel}
          >
            cancel
          </Button>
        </div>
      </Paper>
    </Backdrop>
  );
};
