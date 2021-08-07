import { AnyAction } from 'redux';
import { IUser, SET_TOKEN, SET_USER } from 'redux/actions/user';

interface IUserState extends IUser {
  token: string;
}

const INITIAL_STATE: IUserState = {
  token: '',
  displayName: '',
  email: '',
  id: '',
};

export default function userReducer(state = INITIAL_STATE, action: AnyAction) {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case SET_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
