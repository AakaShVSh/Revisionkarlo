import axios from "axios";
import { setCookies } from "../../helpers/cookies";
import {
  USERTESTDATA_ERROR,
  USERTESTDATA_LOADING,
  USERTESTDATA_SUCCESS,
} from "./userTestData.type";
import { setLocalStorage } from "../../helpers/localStorage";

export const userTestDataApi = (data) => async (dispatch) => {
  console.log(data);
  dispatch({ type: USERTESTDATA_LOADING });
  axios
    .post(
      "https://testwala-backend.onrender.com/UserTestData/AddNew-userTestData",
      data
    )
    .then((r) => {
      dispatch({ type: USERTESTDATA_SUCCESS, payload: r.data });
    })
    .catch((e) => {
      dispatch({ type: USERTESTDATA_ERROR });
    });
};


export const userTestFetchDataApi = () => {
  // console.log(data);
  // dispatch({ type: USERTESTDATA_LOADING });
  axios
    .get(
      "https://testwala-backend.onrender.com/UserTestData/",
      // data
    )
    .then((r) => {
     console.log(r.data);
     setLocalStorage("AllUserTestData",r.data.data)
    return r.data ;
    })
    .catch((e) => {
     console.log(e);
     return e;
     
    });
};
