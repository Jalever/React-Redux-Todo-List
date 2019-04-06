import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { toggleTodo } from "./../actions/index.jsx";

const TodoItem = ({ todo, toggleTodo }) => {
	return <li 
		className="todo-item"
		onClick={
			() => {
				return toggleTodo(todo.id);
			} 
		}
	>
		{todo && todo.completed ? "👌" : "👋"}
		
		{" "}
		
		{
			<span
				className={cx(
					"todo-item-text",
					todo && todo.completed && "todo-item-text-completed"
				)}
			>
				{ todo.content }	
			</span>
		}
		
	</li>
};

export default connect(
	null,
	{ toggleTodo }
)(TodoItem);



