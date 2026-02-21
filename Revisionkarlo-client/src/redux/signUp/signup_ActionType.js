import axios from "axios";
import { setCookies } from "../../helpers/cookies";
import { SIGNUP_ERROR, SIGNUP_LOADING, SIGNUP_SUCCESS } from "./signupTypes";

export const signupApi = (data, setMessage) => async (dispatch) => {
  console.log(data.Password);
  try {
    dispatch({ type: SIGNUP_LOADING });
    const r = await axios.post(
      "https://testwala-backend.onrender.com/auth/signup",
      data
    );
    console.log(r);
    if (r.data.token !== undefined) {
      console.log(r.data);
      setMessage(r.data.message);
      setCookies("_user", r.data.token);
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: r.data,
      });
    } else {
      setMessage(r.data.message);
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: null,
      });
      console.log("ll");
    }
  } catch (error) {
    setMessage("Email is already register");
    dispatch({ type: SIGNUP_ERROR });
  }
};
