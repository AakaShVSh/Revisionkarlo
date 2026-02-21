import {
  USERTESTDATA_ERROR,
  USERTESTDATA_LOADING,
  USERTESTDATA_SUCCESS,
} from "./userTestData.type";

const initialstate = {
  isLoading: false,
  success: false,
  data: [],
  isError: false,
};
console.log(initialstate.data);
export const userTestDataReducer = (
  state = initialstate,
  { type, payload }
) => {
  console.log(type,payload);
  switch (type) {
    case USERTESTDATA_LOADING:
       console.log(state);
      return { ...state, isLoading: true, isError: false  };
    case USERTESTDATA_SUCCESS:
       console.log(state);
      return { ...state, success: true, isLoading: false,data:payload, isError: false };
    case USERTESTDATA_ERROR:
       console.log(state);
      return {
        ...state,
        success: false,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};
