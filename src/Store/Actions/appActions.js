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

export const deleteWordList = list => ({
  type: APP_DELETE_WORDLIST,
  payload: list
});

export const addWordList = list => ({
  type: APP_ADD_WORDLIST,
  payload: list
});

export const updateWordList = list => ({
  type: APP_UPDATE_WORDLIST,
  payload: list
});

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
