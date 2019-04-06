import React from "react";
import { connect } from "react-redux";
import TodoItem from "./TodoItem.jsx";

import { VISIBILITY_FILTER } from "./../constants/index.jsx";

const getATodoItem = todoList => {
	return todoList.todoItem
};

const getTodoAllIds = (todoList) => {
	return getATodoItem(todoList) ? getATodoItem(todoList).allIds : [];
};

const getATodoContent = (todoList, id) => {
	return getATodoItem(todoList) ? { ...getATodoItem(todoList).byIds[id], id } : {};
};

const getTodos = todoList => getTodoAllIds(todoList).map( id => getATodoContent( todoList, id ) );

const getTodosListByVisibilityFilter = ( todoList, visibilityFilter ) => {
	const allTodos = getTodos(todoList);

	switch(visibilityFilter) {
		case VISIBILITY_FILTER.COMPLETED: {
			return allTodos.filter(item => item.completed);
		}
		case VISIBILITY_FILTER.INCOMPLETED: {
			return allTodos.filter(item => !item.completed);
		}
		case VISIBILITY_FILTER.ALL:
		default:
			return allTodos;
	}

};

const TodoList = ({ tod }) => {
	return (
		<ul className="todo-list">
			{
				tod && tod.length
				? tod.map((curVarlue, index) => {
					return <TodoItem key={`todo-${curVarlue.id}`} todo={curVarlue} />;
				}) : "No todos, yay!"
			}
	</ul>
	);
};

const mapStateToProps = state => {
	const { visibilityFilter } = state;
	const tod = getTodosListByVisibilityFilter(state, visibilityFilter);
	return { tod };
};

export default connect(mapStateToProps)(TodoList);

