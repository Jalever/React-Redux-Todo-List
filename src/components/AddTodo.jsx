import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodo } from "./../actions/index.jsx";
import { 
	Button,
	Input 
} from "antd";
import 'antd/dist/antd.css';

import { ADD_TODO } from "./../constants/index.jsx";

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
    this.updateInput = this.updateInput.bind(this);
    this.handleAddTodo = this.handleAddTodo.bind(this);
  }

  // updateInput = input => {
  //   this.setState({ input });
  // };

  updateInput(input) {
    this.setState({ input });
  }

  // handleAddTodo = () => {
  //   this.props.addTodo(this.state.input);
  //   this.setState({ input: "" });
  // };

  handleAddTodo() {
    this.props.addTodo(this.state.input);
    // console.log("this.state.input ", this.state.input);
    this.setState({ input: "" });
  }

  render() {
    return (
      <React.Fragment>
        <Input
          style={{width: "200px"}}
          onChange={e => this.updateInput(e.target.value)}
          value={this.state.input}
        />
        <Button 
          type="primary"
          className="add-todo" 
          onClick={this.handleAddTodo}
        >
          Add Todo
        </Button>
      </React.Fragment>
    );
  }
}


export default connect(
	null,
	{ addTodo }
)(AddTodo);


















