
/** this is not used , just a showcase for combining reducers */


import { ITEM_ACTIONS } from '../actions/items'

const initialState = {
  selectedItem: null,
};


function editable(state = initialState, action) {
  if (action.type === ITEM_ACTIONS.SET_SELECTED_ITEM) {
    return {
      ...state,
      selectedItem: action.payload,
    };
  }
  if (action.type === ITEM_ACTIONS.EDIT_SELECTED_ITEM) {
    return {
      ...state,
      selectedItem: action.payload,
    };
  }
  if (action.type === ITEM_ACTIONS.REMOVE_SELECTED_ITEM) {
    return {
      selectedItem: null,
    };
  }
  return state;
};

export default editable