import React from "react";
import ReactDOM from "react-dom";
import store from "./reducers/store.jsx";
import { Provider } from "react-redux";

import TodoList from "./components/TodoList.jsx";
import FilterArea from "./components/FilterArea.jsx";
import InputTodoArea from "./components/InputTodoArea.jsx";

import "./styles/style.scss";

class App extends React.Component {
	render() {
		return(
			<div className="todo-app">
				<h1>Add Todo List:</h1>
				<InputTodoArea />
				<FilterArea />
				<TodoList />
			</div>
		);
	}
}


ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);