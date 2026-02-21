import axios from "axios";
import { setCookies } from "../../helpers/cookies";
import { setLocalStorage } from "../../helpers/localStorage";
import { SIGNIN_ERROR, SIGNIN_lOADING, USER_LOGOUT, SIGNIN_SUCCESS } from "./sign.types";




export const signInApi = (data, setMessage) => async (dispatch) => {
  try {
    dispatch({type:SIGNIN_lOADING})
    const r = await axios.post(
      "https://testwala-backend.onrender.com/auth/signin",
      data
    );
    if (r.data.token) {
      setCookies("_user", r.data.token);
      setMessage(r.data.message);
      setLocalStorage("_user", r.data.data._id);
      console.log(r.data.data);
  dispatch({type:SIGNIN_SUCCESS,payload:r.data.data})
    } else {
      setMessage(r.data.message);
     dispatch({type:SIGNIN_ERROR})
    }
    // console.log(r);
  } catch (error) {
    console.log(error.message);
    setMessage("something went wrong");
    dispatch({type:SIGNIN_ERROR})
  }
};

export const logoutApi = () => (dispatch) => {
    dispatch({type:USER_LOGOUT});
}