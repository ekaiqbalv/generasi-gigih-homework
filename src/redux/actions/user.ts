import { IImage } from 'utils/model';

export const SET_TOKEN = 'SET_TOKEN';
export const SET_USER = 'SET_USER';
export const DELETE_USER = 'DELETE_USER';

export interface IUser {
  id: string;
  displayName: string;
  images: Array<IImage>;
}

export function setToken(token: string = '') {
  return {
    type: SET_TOKEN,
    payload: token,
  };
}

export function setUser(user: IUser) {
  return {
    type: SET_USER,
    payload: user,
  };
}

export function deleteUser() {
  return {
    type: DELETE_USER,
  };
}
