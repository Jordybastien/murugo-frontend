import { SET_AUTHED_USER, LOGOUT_USER } from './actionTypes';
import { logError } from './error';
import { decodeToken, tokenKey } from '../services/auth';
import { loginUser } from '../services/users';

export const setAuthedUser = (user) => {
  return {
    type: SET_AUTHED_USER,
    user,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const handleUserLogin = (user) => {
  return async (dispatch) => {
    try {
      const { token } = await loginUser(user);
      localStorage.setItem(tokenKey, token);
      const loggedIn = decodeToken();
      dispatch(setAuthedUser(loggedIn));
      return true;
    } catch (error) {
      return dispatch(
        logError(
          error.response
            ? error.response.data.error
            : 'Failed to authenticate Please contact Us'
        )
      );
    }
  };
};
