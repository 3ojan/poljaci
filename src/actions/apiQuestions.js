
import axios from 'axios';

export const USER_API_ACITONS = {
  GET_DATA: 'GET_DATA',
  SET_DATA: 'SET_DATA',
}

export const setQuestionsData = payload => ({
  type: USER_API_ACITONS.SET_DATA,
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
        dispatch(setQuestionsData(data))
      })
      .catch(error => {
        throw (error);
      });


  }
}
export function updateData() {
  return function (dispatch) {
    axios.get('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data')
      .then((response) => {
        console.log(response.data)
        return response.data
      })
      .then((data) => {
        dispatch(setQuestionsData(data))
      })
      .catch(error => {
        throw (error);
      });


  }
}