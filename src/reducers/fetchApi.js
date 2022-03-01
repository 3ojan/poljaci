
import { USER_API_ACITONS } from '../actions/apiQuestions'
import { gameLogicActions } from '../actions/gameLogic';

const initialState = {
  data: [],
  loading: true,
};


function fetchApi(state = initialState, action) {
  if (action.type === USER_API_ACITONS.GET_DATA) {
    return {
      data: null,
      loading: true,
    };
  }
  if (action.type === USER_API_ACITONS.SET_DATA) {
    return {
      data: action.payload,
      loading: false,
    };
  }
  return state;
};

export default fetchApi