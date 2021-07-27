import { SET_TOKEN } from "redux/actions/user";

const INITIAL_STATE = { token: "" };

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.payload };
    default:
      return state;
  }
}
