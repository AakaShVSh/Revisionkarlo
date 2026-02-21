import { SIGNUP_ERROR, SIGNUP_LOADING, SIGNUP_SUCCESS } from "./signupTypes";

const initialstate = {
  signupLoading: false,
  signupSuccess: false,
  data: [],
  signupError: false,
};
console.log(initialstate.data);
export const signupReducer = (state = initialstate, { type, payload }) => {
  // console.log(type);
  switch (type) {
    case SIGNUP_LOADING:
      console.log(state);
      return { ...state, signupLoading: true, signupError: false };
    case SIGNUP_SUCCESS:
      console.log(state);
      return {
        ...state,
        signupSuccess: true,
        signupLoading: false,
        data: payload.data,
        signupError: false,
      };
    case SIGNUP_ERROR:
      console.log(state);
      return {
        ...state,
        signupSuccess: false,
        signupLoading: false,
        signupError: true,
      };
    default:
      return state;
  }
};
