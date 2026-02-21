import {
  SIGNIN_ERROR,
  SIGNIN_lOADING,
  SIGNIN_SUCCESS,
  USER_LOGOUT,
} from "./sign.types";

const initialstate = {
  signInLoading: false,
  signInSuccess: false,
  userData: [],
  signInError: false,
  userLogout: false,
};

export const signInReducer = (state = initialstate, { type, payload }) => {
  // console.log(type);
  switch (type) {
    case SIGNIN_lOADING:
      return {
        ...state,
        signInLoading: true,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        signInLoading: false,
        signInSuccess: true,
        userData: payload,
        signInError: false,
      };
    case SIGNIN_ERROR:
      return {
        ...state,
        signInLoading: false,
        signInError: true,
      };
    case USER_LOGOUT:
      return {
        ...state,
        signInSuccess: false,
        userLogout: true,
        userData: [],
      };

    default:
      return state;
  }
};
