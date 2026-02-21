import { QUESTION_ERROR, QUESTION_LOADING, QUESTION_SUCCESS } from "./questions.Type";


const initialState = {
    questionLoading:false,
    questionSuccess:false,
    questionData:[],
    questionError:false
}


export const QuestionReducer = (state = initialState,{type,payload}) => {
    console.log(type);
    switch(type){
        case QUESTION_LOADING:
            return {
                ...state,
                questionLoading:true,
                questionError:false,
            }
            case QUESTION_SUCCESS:
                return {
                  ...state,
                  questionLoading: false,
                  questionSuccess: true,
                  questionData: payload.data,
                  questionError: false,
                };
                case QUESTION_ERROR:
                    return {
                        ...state,
                        questionLoading:false,
                        questionError:true
                    }
        default:
            return state
    }
}