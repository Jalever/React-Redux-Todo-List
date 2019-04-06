import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import AddTodo from "./components/AddTodo.jsx";
import TodoList from "./components/TodoList.jsx";
import VisibilityFilters from "./components/VisibilityFilters.jsx";

import store from "./store.jsx";

import "./styles/style.scss";

// if(module.hot) {
// 	module.hot.accept();

// 	window.addEventListener("message", e => {
// 		if("production" !== process.env.NODE_ENV) {
// 			console.clear();
// 		}
// 	});
// }


class App extends React.Component {
	render() {
		return(
			<div className="todo-app">
				<h1>Todo List:</h1>
				<AddTodo />
				<TodoList />
				<VisibilityFilters />
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
