import { combineReducers } from "redux";
import fetchApi from './fetchApi';
import gameLogic from './gameLogic';

export default combineReducers({ fetchApi, gameLogic });

