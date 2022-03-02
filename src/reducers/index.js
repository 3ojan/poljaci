import { combineReducers } from "redux";
import fetchApi from './fetchApi';
import editable from './editable';

export default combineReducers({ fetchApi, editable });

