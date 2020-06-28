import React, { useState, useEffect } from "react";
import { Info, LogIn, LogOut } from "react-feather";
import { useSelector } from "react-redux";
import { SpinnerRoundFilled } from "spinners-react";
import { Person } from "@material-ui/icons";

import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Slide from "@material-ui/core/Slide";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

export const Header = ({ onLogin, onLogout, onProfile, loading }) => {
  const user = useSelector(state => state.app.user);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <>
      <AppBar
        position="static"
        style={{ marginBottom: "10px", color: "black" }}
      >
        <Toolbar
          style={{
            backgroundColor: "gainsboro",
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {user && (
              <>
                <div
                  style={{ display: "flex", alignItems: "center" }}
                  onClick={onLogout}
                >
                  <LogOut style={{ cursor: "pointer", color: "salmon" }} />
                </div>
                <div
                  onClick={onProfile}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer"
                  }}
                >
                  <Person />
                  <span style={{ fontSize: "10px", color: "gray" }}>
                    {user.name || "Who are you ?!"}
                  </span>
                </div>
              </>
            )}
            {!user && !loading && (
              <>
                Login
                <LogIn style={{ cursor: "pointer" }} onClick={onLogin} />
              </>
            )}
            {loading && <SpinnerRoundFilled color="salmon" />}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <h1 style={{ fontFamily: "Courier New" }}>WordPlay</h1>
          </div>
          <div
            style={{
              display: "flex",
              position: "relative",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Info
              onClick={() => setShowAbout(!showAbout)}
              style={{ cursor: "pointer" }}
            />
            <Snackbar
              open={showAbout}
              onClose={() => setShowAbout(false)}
              message="I love snacks"
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              autoHideDuration={6000}
            >
              <Slide in={showAbout} mountOnEnter unmountOnExit>
                <MuiAlert elevation={6} variant="filled" severity="info">
                  <p>
                    <i>
                      The dictionary section uses the{" "}
                      <a href="https://cc-cedict.org/wiki/start">CC-CEDICT</a>{" "}
                    </i>
                  </p>
                  <p>
                    <i>
                      database under the terms of{" "}
                      <a href="https://creativecommons.org/licenses/by-sa/4.0/">
                        CC BY-SA 4.0
                      </a>
                    </i>
                  </p>
                </MuiAlert>
              </Slide>
            </Snackbar>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};
