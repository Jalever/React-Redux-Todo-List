import React from "react";
import { connect } from "react-redux";
import { addTodo } from "./../actions/actions.jsx";
import {
	Input,
	Button
} from "antd";
import { 
	CONSTANT_BUTTON,
	INPUT_PLACEHOLDER
} from "./../constants/constants.jsx";

class InputTodoArea extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ""
		};

		this.updateValue = this.updateValue.bind(this);
		this.handleAddTodo = this.handleAddTodo.bind(this);
	}

	updateValue(e) {
		this.setState({
			value: e.target.value
		})
	}

	handleAddTodo() {
		this.props.addTodo(this.state.value);
		
		this.setState({
			value: ""
		});
	}

	render() {
		return(
			<div>
				<Input 
					placeholder={ INPUT_PLACEHOLDER }
					onChange={ this.updateValue }
					value={this.state.value}
				/>

				<Button 
					className="add-todo"
					type="primary"
					onClick={ this.handleAddTodo }
				>
					{ CONSTANT_BUTTON }
				</Button>
			</div>
		);
	}
}

export default connect(
	null,
	{ addTodo }
)(InputTodoArea);









