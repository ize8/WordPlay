export const APP_LOGIN_USER = "APP_LOGIN_USER";
export const APP_SET_USER = "APP_SET_USER";
export const APP_DELETE_WORDLIST = "APP_DELETE_WORDLIST";
export const APP_ADD_WORDLIST = "APP_ADD_WORDLIST";
export const APP_UPDATE_WORDLIST = "APP_UPDATE_WORDLIST";
export const APP_SET_ALL_WORDLISTS = "APP_SET_ALL_WORDLISTS";
export const APP_SET_ACTIVE_LIST_IDS = "APP_SET_ACTIVE_LIST_IDS";

export const setUser = user => ({
  type: APP_SET_USER,
  payload: user
});

export const setActiveListIds = list => ({
  type: APP_SET_ACTIVE_LIST_IDS,
  payload: list
});

//MOVE all fetch into Database/Database.js ...like in Auth/auth.js

export const deleteWordList = list => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    const state = getState();

    if (state.app.user) {
      try {
        const raw = await fetch(
          "https://word-play-1.herokuapp.com/delete-wordlist",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              token: state.app.user.token,
              id: list.id
            })
          }
        );
        const result = await raw.json();
        console.log("List deleted:", result);
        dispatch({
          type: APP_DELETE_WORDLIST,
          payload: list
        });
        resolve(result);
      } catch (error) {
        console.warn("API Error:", error);
        reject(error);
      }
    }
  });
};

export const addWordList = list => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    const state = getState();

    if (state.app.user) {
      try {
        const raw = await fetch(
          "https://word-play-1.herokuapp.com/create-wordlist",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              token: state.app.user.token,
              label: list.label,
              list: list.list
            })
          }
        );
        const result = await raw.json();
        console.log("List added:", result);
        resolve(result);
      } catch (error) {
        console.warn("API Error:", error);
        reject(error);
      }
    }
    dispatch({ type: APP_ADD_WORDLIST, payload: list });
  });
};

export const getAllWordListsForUser = () => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    const state = getState();

    if (state.app.user) {
      try {
        const raw = await fetch(
          "https://word-play-1.herokuapp.com/get-all-wordlists",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              token: state.app.user.token,
              id: state.app.user.id
            })
          }
        );
        const result = await raw.json();
        const converted = result.map(e => ({ ...e, id: e._id }));
        console.log("Lists received:", converted);
        dispatch({
          type: APP_SET_ALL_WORDLISTS,
          payload: converted
        });
        resolve(result);
      } catch (error) {
        console.warn("API Error:", error);
        reject(error);
      }
    }
  });
};

export const updateWordList = list => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    const state = getState();

    if (state.app.user) {
      try {
        const raw = await fetch(
          "https://word-play-1.herokuapp.com/update-wordlist",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              token: state.app.user.token,
              id: list.id,
              label: list.label,
              list: list.list
            })
          }
        );
        const result = await raw.json();
        console.log("List updated:", result);
        dispatch({
          type: APP_UPDATE_WORDLIST,
          payload: list
        });
        resolve(result);
      } catch (error) {
        console.warn("API Error:", error);
        reject(error);
      }
    }
  });
};

export const setAllWordLists = lists => ({
  type: APP_SET_ALL_WORDLISTS,
  payload: lists
});

//async actions with thunk....

export const leaveRoom = roomId => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const state = getState();
    const socket = state.socket.io;

    if (!socket) {
      reject({ message: "Invalid Socket! Try again a bit later!" });
    }
    socket.emit("leave-room", roomId, data => {
      if (data.status === "ok") {
        dispatch({ type: "ACTION_TYPE" });
        resolve(data);
      } else {
        reject(data);
      }
    });
  });
};
