import axios from "axios";
import { setCookies } from "../helpers/cookies";
import { setLocalStorage } from "../helpers/localStorage";
export const signUpApi = async (data, cmpPassword,setMessage) => {
  console.log(data.Password, "d", cmpPassword);
  try {
    const r = await axios.post(
      "https://testwala-backend.onrender.com/auth/signup",
      data
    );
    console.log(r);
    if (r.data.token!==undefined) {
      console.log(r.data);
      setCookies("_user", r.data.token);
       setMessage(r.data.message);
      console.log("hh");
      return true;
    } else {
      // alert(r.data.message);
      console.log("ll");
      setMessage(r.data.message)
      return false;
    }
  } catch (error) {
    console.log(error.message);
    setMessage("something went wrong")
    return false;
  }
};

export const signInApi = async (data,setMessage) => {
  try {
    const r = await axios.post("https://testwala-backend.onrender.com/auth/signin", data)
    if(r.data.token){
     
       setCookies("_user", r.data.token);
       setMessage(r.data.message);
       setLocalStorage("_user",r.data.data._id)
         console.log(r.data.data);
       console.log("hh");
       return true;
    }else{
      setMessage(r.data.message);
      return false
    }
    // console.log(r);
  } catch (error) {
    console.log(error.message);
    setMessage("something went wrong");
    return false;
  }
};
