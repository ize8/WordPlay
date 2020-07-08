import {
  wordListDelete,
  wordListAdd,
  wordListGetAllForUser,
  wordListUpdate
} from "../../Database/Database";

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
        const result = await wordListDelete(list, state.app.user.token);
        console.log("List deleted:", result);
        dispatch({
          type: APP_DELETE_WORDLIST,
          payload: list
        });
        resolve(result);
      } catch (error) {
        console.warn("Error:", error);
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
        const result = await wordListAdd(list, state.app.user.token);
        console.log("List added:", result);
        dispatch({
          type: APP_ADD_WORDLIST,
          payload: { ...list, id: result }
        });
        resolve(result);
      } catch (error) {
        console.warn("API Error:", error);
        reject(error);
      }
    }
  });
};

export const getAllWordListsForUser = () => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    const state = getState();

    if (state.app.user) {
      try {
        const result = await wordListGetAllForUser(
          state.app.user.id,
          state.app.user.token
        );
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
        const result = await wordListUpdate(list, state.app.user.token);
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
