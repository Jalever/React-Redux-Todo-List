import React from "react";
import { connect } from "react-redux";

import TodoItem from "./TodoItem.jsx";

import { VISIBILITY_FILTERS } from "./../constants/constants.jsx";
import { getTodosByVisibilityFilter } from "./../reducers/selectors.jsx";

const TodoList = ({ todos }) => (

	<ul className="todo-list">
		{
			todos && todos.length ?
				todos.map( (todoItem, index) => {
					return <TodoItem
								key={`todo-${todoItem.id}`}
								todo={todoItem}
							/>
				} ) : "No todos,yay!"
		}
	</ul>
);

const mapStateToProps = state => {
	const { visibilityFilter } = state;
	const todos = getTodosByVisibilityFilter( state, visibilityFilter );
	return {
		todos
	};
};


export default connect(mapStateToProps)(TodoList);









