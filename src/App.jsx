/*eslint-disable*/
import React, { useState, useEffect } from "react";
import "./styles.css";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { AnimatePresence } from "framer-motion";

import { Paper } from "@material-ui/core";
import { Divider } from "@material-ui/core";

import { ListManager } from "./Components/ListManager";
import { Login } from "./Components/Login";
import { GamePicker } from "./Components/GamePicker";
import { StartScreen } from "./Components/StartScreen";
import { Memory } from "./Components/Memory";
import { Connect } from "./Components/Connect";
import { Profile } from "./Components/Profile";
import { Header } from "./Components/Header";

import { LoadSavedData, saveDatabase } from "./Database/Database";
import {
  setUser,
  deleteWordList,
  updateWordList,
  addWordList,
  setAllWordLists,
  setActiveListIds,
  getAllWordListsForUser
} from "./Store/Actions/appActions";
import {
  loginUser,
  loadSavedToken,
  validateToken,
  saveTokenToLocalStorage,
  removeTokenFromLocalStorage,
  registerNewUser,
  sendValidationEmail
} from "./Auth/auth.js";

const demoList = [
  {
    simp: "欢迎",
    trad: "歡迎",
    pinyin: "huan1 ying2",
    eng: "to welcome/welcome"
  },
  {
    simp: "你好",
    trad: "你好",
    pinyin: "ni3 hao3",
    eng: "hello/hi"
  },
  {
    simp: "促使",
    trad: "促使",
    pinyin: "cu4 shi3",
    eng:
      "to induce/to promote/to urge/to impel/to bring about/to provoke/to drive (sb to do sth)/to catalyze/to actuate/to contribute to (some development)"
  }
];

const Games = [
  {
    path: "/connect",
    label: "Connect",
    desc: "Connect the pieces!"
  },
  {
    path: "/memory",
    label: "Memory",
    desc: "Find the pairs!"
  },
  {
    path: "/multiple_choice",
    label: "Multiple Choice",
    desc: "Pick the right anwser!"
  },
  {
    path: "/flashcard",
    label: "Flashcard",
    desc: "...the classic..."
  }
];

export const App = () => {
  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();
  const user = useSelector(state => state.app.user);

  //database: the db of wordlists under this user
  const database = useSelector(state => state.app.database);
  //activeIdList: lists selected for the game
  const activeListIds = useSelector(state => state.app.activeListIds);
  const [activeList, setActiveList] = useState([]);
  //gameId: the chosen game
  const [gamePath, setGamePath] = useState("/");
  //user: logged in user data or null
  const [dbChanged, setDbChanged] = useState(false);

  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const loadLocalWordLists = () => {
    console.log("Loading locally saved WordLists....");
    const loadedData = LoadSavedData();
    dispatch(setAllWordLists(loadedData));
  };

  const offerImportingLocalWordLists = async () => {
    console.log("Do you want to import your locally saved lists?");
    console.log(database.map(e => e.label));
    if (window.confirm("Do you want to import your locally saved lists?")) {
      for (let i = 0; i < database.length; i++) {
        await dispatch(addWordList(database[i]));
      }
    }
  };

  useEffect(() => {
    setActiveList(
      [].concat.apply(
        [],
        database?.filter(e => activeListIds.includes(e.id)).map(e => e.list)
      )
    );
  }, [database, activeListIds]);

  useEffect(() => {
    const savedToken = loadSavedToken();
    if (savedToken) {
      setLoading(true);
      try {
        validateToken(savedToken).then(async valid => {
          console.log("Valid token! :", valid.user);
          saveTokenToLocalStorage(valid.token);
          dispatch(setUser({ ...valid.user, token: savedToken }));
          await dispatch(getAllWordListsForUser());
          setLoading(false);
        });
      } catch (err) {
        console.log("Token error:", err);
        setLoading(false);
        loadLocalWordLists();
      }
    } else {
      loadLocalWordLists();
    }
  }, []);

  useEffect(() => {
    if (dbChanged && !user) {
      saveDatabase(database);
      setDbChanged(false);
    }
  }, [dbChanged]);

  useEffect(() => {
    if (!gamePath) return;
    history.push(`${gamePath}`);
  }, [gamePath]);

  const onLogin = async (email, password) => {
    setLoading(true);
    try {
      const response = await loginUser(email, password);
      if (!response.user.validated) {
        setLoginError(`Please validate your address!`);
        return;
      }
      console.log("User logged in:", response);
      dispatch(setUser({ ...response.user, token: response.token }));
      saveTokenToLocalStorage(response.token);
      if (database.length > 0) await offerImportingLocalWordLists();
      dispatch(setAllWordLists([]));
      await dispatch(getAllWordListsForUser());
      setLoading(false);
      setShowLogin(false);
      history.push(`/`);
    } catch (err) {
      if (typeof err === "string") setLoginError(err);
      console.log("ERROR:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!showLogin) setLoginError(null);
  }, [showLogin]);

  const onLogout = () => {
    dispatch(setUser(null));
    removeTokenFromLocalStorage();
    loadLocalWordLists();
    history.push(`/`);
  };

  const onRegister = async (name, email, password) => {
    try {
      setLoading(true);
      const result = await registerNewUser(name, email, password);
      console.log(result);
      const sentemail = await sendValidationEmail(email);
      console.log(sentemail);
      setLoginError(`Please check your emails!`);
      setLoading(false);
    } catch (err) {
      if (typeof err === "string") setLoginError(err);
      console.log(err);
      setLoading(false);
    }
  };

  const onResetPassword = email => {
    console.log("Reset:", email);
  };

  const onDeleteWordList = list => {
    console.log("delete list:", list);
    dispatch(deleteWordList(list));
    setDbChanged(true);
  };

  const onUpdateWordList = list => {
    console.log("update list:", list);
    dispatch(updateWordList(list));
    setDbChanged(true);
  };

  const onAddWordList = list => {
    console.log("add list:", list);
    dispatch(addWordList(list));
    setDbChanged(true);
  };

  return (
    <>
      {showLogin && (
        <>
          <Login
            onLogin={onLogin}
            onRegister={onRegister}
            onCancel={() => setShowLogin(false)}
            onResetPassword={onResetPassword}
            loading={loading}
            error={loginError}
          />
        </>
      )}
      <Header
        onLogin={() => setShowLogin(true)}
        onLogout={onLogout}
        onProfile={() => setGamePath("/profile")}
        loading={loading}
      />
      <div
        className="App"
        style={{ display: "flex", alignItems: "flex-start" }}
      >
        <ListManager
          database={database}
          deleteWordList={onDeleteWordList}
          addWordList={onAddWordList}
          updateWordList={onUpdateWordList}
          activeIdList={activeListIds}
          changeActiveIdList={list => dispatch(setActiveListIds(list))}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            marginLeft: "5px"
          }}
        >
          <Paper elevation={3}>
            <GamePicker
              games={Games}
              onSelect={setGamePath}
              selected={gamePath}
            />
            <Divider />
            <AnimatePresence exitBeforeEnter initial={false}>
              <div style={{ padding: "10px" }}>
                <Switch path={location} key={location.pathname}>
                  <Route
                    path="/login"
                    render={props => (
                      <Login
                        {...props}
                        onLogin={onLogin}
                        onRegister={onRegister}
                        onCancel={() => {}}
                        onResetPassword={onResetPassword}
                        loading={loading}
                        error={loginError}
                      />
                    )}
                  />
                  <Route path="/memory" component={Memory} />
                  <Route
                    path="/connect"
                    render={props => (
                      <Connect
                        list={activeList}
                        options={["simp", "pinyin", "eng"]}
                      />
                    )}
                  />
                  <Route path="/profile" component={Profile} />
                  <Route path="/" component={StartScreen} />
                </Switch>
              </div>
            </AnimatePresence>
          </Paper>
        </div>
      </div>
    </>
  );
};
