
import axios from 'axios';

export const USER_API_ACITONS = {
  GET_DATA: 'GET_DATA',
  SET_DATA: 'SET_DATA',
  CUSTOM_SET_DATA: 'CUSTOM_SET_DATA',
  ADD_ITEM: 'ADD_ITEM',
}

export const setFetchedData = payload => ({
  type: USER_API_ACITONS.SET_DATA,
  payload
});
export const customSetFetchedData = payload => ({
  type: USER_API_ACITONS.CUSTOM_SET_DATA,
  payload
});
export const addItem = payload => ({
  type: USER_API_ACITONS.ADD_ITEM,
  payload
});

export function fetchData() {
  return function (dispatch) {
    axios.get('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data')
      .then((response) => {
        console.log(response.data)
        return response.data
      })
      .then((data) => {
        dispatch(setFetchedData(data))
      })
      .catch(error => {
        throw (error);
      });


  }
}