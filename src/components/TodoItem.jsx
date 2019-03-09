import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { toggleTodo } from "./../actions/actions.jsx";
import { Icon } from "antd";


const TodoItem = ({ todo, toggleTodo }) => (
	<li className="todo-item"
		onClick={ () => toggleTodo(todo.id) }
	>
		{ 
			todo &&
			todo.completed ? 
			(<Icon type="check" />) : (<Icon type="close" />)
		}

		{" "}

		{
			<span
				className={cx(
					"todo-item-text",
					todo && todo.completed && "todo-item-text-completed"
				)}
			>
				{todo.content}
			</span>
		}
	</li>
);

export default connect(
	null,
	{ toggleTodo }
)(TodoItem);












