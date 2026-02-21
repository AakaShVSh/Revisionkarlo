import axios from "axios";
import {
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_LOADING,
  FORGOT_PASSWORD_SUCCESS,
} from "./forgotPassword.Types";

export const forgotPasswordApi = (data, setMessage) => async (dispatch) => {
  dispatch({ type: FORGOT_PASSWORD_LOADING });
  axios
    .post("https://testwala-backend.onrender.com/auth/forgot-password", data)
    .then((r) => 
      dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: r.data })
    )
    .catch((e) => dispatch({ type: FORGOT_PASSWORD_ERROR }));
};
