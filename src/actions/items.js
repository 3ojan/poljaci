

export const ITEM_ACTIONS = {
  SET_SELECTED_ITEM: 'SET_SELECTED_ITEM',
  REMOVE_SELECTED_ITEM: 'REMOVE_SELECTED_ITEM',
  EDIT_SELECTED_ITEM: 'EDIT_SELECTED_ITEM',
}

export const setSelectedItem = payload => ({
  type: ITEM_ACTIONS.SET_SELECTED_ITEM,
  payload
});
export const removeSelectedItem = payload => ({
  type: ITEM_ACTIONS.REMOVE_SELECTED_ITEM,
  payload
});
export const editSelectedItem = payload => ({
  type: ITEM_ACTIONS.EDIT_SELECTED_ITEM,
  payload
});

