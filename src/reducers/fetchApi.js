
import { USER_API_ACITONS } from '../actions/apiQuestions'
import { ITEM_ACTIONS } from '../actions/items';

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
  if (action.type === USER_API_ACITONS.CUSTOM_SET_DATA) {
    return {
      data: action.payload,
      loading: false,
    };
  }
  if (action.type === USER_API_ACITONS.ADD_ITEM) {
    const _data = [...state.data];
    _data.push({
      id: Math.floor(Math.random() * 100 + 30),
      name: action.payload.name,
      email: action.payload.email,
      username: "New item",
    })
    return {
      data: _data,
      loading: false,
    };
  }
  return state;
};

export default fetchApi