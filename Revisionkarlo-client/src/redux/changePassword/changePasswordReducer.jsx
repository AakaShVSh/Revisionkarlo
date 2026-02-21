import {
  CHANGEPASSWORD_ERROR,
  CHANGEPASSWORD_LOADING,
  CHANGEPASSWORD_SUCCESS,
} from "./changePassword.types";

const initialState = {
  changePasswordLoading: false,
  changePasswordSuccess: false,
  changePasswordData: null,
  changePasswordError: false,
};

export const changePasswordReducer = (
  state = initialState,
  { type, payload }
) => {
  // console.log(type, payload);
  switch (type) {
    case CHANGEPASSWORD_LOADING:
      return {
        ...state,
        changePasswordLoading: true,
        changePasswordError: false,
      };
    case CHANGEPASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordLoading: false,
        changePasswordSuccess: true,
        changePasswordData: payload,
        changePasswordError: false,
      };
    case CHANGEPASSWORD_ERROR:
      return {
        ...state,
        changePasswordLoading: false,
        changePasswordError: true,
      };
    default:
      return state;
  }
};
