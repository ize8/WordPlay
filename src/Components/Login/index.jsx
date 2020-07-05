import React, { useState, useEffect } from "react";

import { Button } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Backdrop } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { motion } from "framer-motion";

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

  const DialogTitle = ({ active, titles, onSubClick, ...props }) => {
    const variants = {
      main: {
        fontFamily: "Courier",
        cursor: "default",
        color: "rgba(0,0,0,1)",
        fontSize: "2em",
        bottom: "0rem",
        left: "0rem",
        zIndex: 1
      },
      sub: {
        fontFamily: "Courier",
        fontSize: "0.9em",
        color: "rgba(0,0,200,0.4)",
        cursor: "pointer",
        bottom: "-0.2rem",
        left: "2rem",
        zIndex: 5
      }
    };
    return (
      <div
        style={{
          position: "relative",
          padding: "10px",
          width: "100%",
          height: "3rem"
        }}
        {...props}
      >
        <motion.h1
          key={titles[0]}
          variants={variants}
          onClick={active === 1 ? onSubClick : null}
          initial={active === 0 ? "sub" : "main"}
          animate={active === 0 ? "main" : "sub"}
          transition={{ duration: 0.5 }}
          style={{ position: "absolute", width: "100%", textAlign: "center" }}
        >
          {titles[0]}
        </motion.h1>
        <motion.h1
          key={titles[1]}
          style={{ position: "absolute", width: "100%", textAlign: "center" }}
          variants={variants}
          onClick={active === 0 ? onSubClick : null}
          initial={active === 0 ? "main" : "sub"}
          animate={active === 0 ? "sub" : "main"}
          transition={{ duration: 0.5 }}
        >
          {titles[1]}
        </motion.h1>
      </div>
    );
  };

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
            borderBottom: "1px solid gray",
            display: "flex"
          }}
        >
          <DialogTitle
            titles={["Login", "Register"]}
            active={doingLogin ? 0 : 1}
            onSubClick={() =>
              doingLogin ? setDoingLogin(false) : setDoingLogin(true)
            }
          />
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
