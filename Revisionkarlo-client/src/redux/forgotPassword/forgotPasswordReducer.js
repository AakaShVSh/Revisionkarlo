import {
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_LOADING,
  FORGOT_PASSWORD_SUCCESS,
} from "./forgotPassword.Types";

const initialState = {
  forgotPasswordLoading: false,
  forgotPasswordSuccess: false,
  forgotPasswordOtp: 0,
  forgotPasswordUser: null,
  forgotPasswordError: false,
};

export const forgotPasswordReducer = (
  state = initialState,
  { type, payload }
) => {
  // console.log(type,payload);
  switch (type) {
    case FORGOT_PASSWORD_LOADING:
      return {
        ...state,
        forgotPasswordLoading: true,
        forgotPasswordError: false,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordLoading: false,
        forgotPasswordSuccess: true,
        forgotPasswordOtp: payload.Otp,
        forgotPasswordUser:payload.user._id,
        forgotPasswordError: false,
      };
    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        forgotPasswordLoading: false,
        forgotPasswordError: true,
      };
    default:
      return state;
  }
};
