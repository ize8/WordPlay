import * as actions from "../Actions/appActions";
import { nanoid } from "nanoid";

const initState = {
  user: null,
  database: null,
  activeListIds: []
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actions.APP_SET_ACTIVE_LIST_IDS:
      return {
        ...state,
        activeListIds: action.payload
      };
    case actions.APP_ADD_WORDLIST:
      return {
        ...state,
        database: [...state.database, { ...action.payload, id: nanoid(10) }]
      };
    case actions.APP_DELETE_WORDLIST:
      return {
        ...state,
        database: state.database.filter(e => e.id !== action.payload.id)
      };
    case actions.APP_UPDATE_WORDLIST:
      return {
        ...state,
        database: state.database.map(e =>
          e.id === action.payload.id ? action.payload : e
        )
      };
    case actions.APP_SET_ALL_WORDLISTS:
      return {
        ...state,
        database: action.payload
      };
    case actions.APP_SET_USER:
      return {
        ...state,
        user: action.payload
      };

    default:
      return state;
  }
}

export default reducer;
