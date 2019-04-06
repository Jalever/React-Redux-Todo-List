import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter.jsx";
import todoItem from "./todos.jsx";

export default combineReducers({ todoItem, visibilityFilter });


