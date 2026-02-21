import axios from "axios";
import {
  CHANGEPASSWORD_ERROR,
  CHANGEPASSWORD_LOADING,
  CHANGEPASSWORD_SUCCESS,
} from "./changePassword.types";

export const changePasswordApi = (data,user) => async (dispatch) => {
    console.log(
      user,data
    );
  dispatch({ type: CHANGEPASSWORD_LOADING });
  axios
    .patch(
      `https://testwala-backend.onrender.com/auth//change-password/${user}`,
      data
    )
    .then((r) => dispatch({ type: CHANGEPASSWORD_SUCCESS, payload: r.data }))
    .catch((err) => dispatch({ type: CHANGEPASSWORD_ERROR }));
};
