## A Todo List Example

## Summary
`reducers/index.jsx`中的`combineReducers(todoItem, visibilityFilter)`會創造出:
```javascript
  {
    todoItem: {
      allIds: […]
      byIds: {…}
    },
    visibilityFilter: "all"
  }
```
`store.jsx`中的：`createStore()`

### The React UI Components
We have implemented our React UI components as follows:
- `index.jsx` is the entry component for our app. It renders the header, the `InputTodoArea`, `TodoList`, and `FilterArea` components.

- `InputTodoArea` is the component that allows a user to input a todo item and add to the list upon clicking its “Add Todo” button: 
    - It uses a controlled input that sets state upon `onChange`.
    - When the user clicks on the “Add Todo” button, it dispatches the action (that we will provide using React Redux) to add the todo to the store.

- `TodoList` is the component that renders the list of todos: 
    - It renders the filtered list of todos when one of the `FilterArea` is selected.

- `TodoItem` is the component that renders a single todo item: 
    - It renders the todo content, and shows that a todo is completed by crossing it out.
    - It dispatches the action to toggle the todo's complete status upon `onClick`.

- `FilterArea` renders a simple set of filters: ***all***, ***completed***, and ***incomplete***. Clicking on each one of them filters the todos: 
    - It accepts an `activeFilter` prop from the parent that indicates which filter is currently selected by the user. An active filter is rendered with an underscore.
    - It dispatches the `setFilter` action to update the selected filter.

- `constants` holds the constants data for our app.

- And finally `index` renders our app to the DOM.

### The Redux Store
&ensp;&ensp;The Redux portion of the application has been set up using the patterns recommended in the Redux docs:<br/>
- Store 
    - `todos`: A normalized reducer of todos. It contains a `byIds` map of all todos and a `allIds` that contains the list of all ids.
    - `visibilityFilters`: A simple string `all`, `completed`, or `incomplete`.

- Action Creators
    - `addTodo` creates the action to add todos. It takes a single string variable `content` and returns an `ADD_TODO` action with `payload` containing a self-incremented `id` and `content`
    - `toggleTodo` creates the action to toggle todos. It takes a single number variable `id` and returns a `TOGGLE_TODO` action with `payload` containing `id` only
    - `setFilter` creates the action to set the app’s active filter. It takes a single string variable `filter` and returns a `SET_FILTER` action with `payload` containing the `filter` itself

- Reducers
    - The `todos` reducer 
        - Appends the `id` to its `allIds` field and sets the todo within its `byIds` field upon receiving the `ADD_TODO` action
        - Toggles the `completed` field for the todo upon receiving the `TOGGLE_TODO` action

- Action Types
    - We use a file `actionTypes.js` to hold the constants of action types to be reused

- Selectors
    - `getTodosAllIds` returns the `allIds` list from the `todos` store
    - `getTodosContent` finds the todo in the store given by `id`
    - `getAllTodos` is slightly more complex. It takes all the `ids` from `allIds`, finds each todo in `byIds`, and returns the final array of todos
    - `getTodosByVisibilityFilter` filters the todos according to the visibility filter

### Providing the Store
&ensp;&ensp;First we need to make the store available to our app. To do this, we wrap our app with the <Provider /> API provided by React Redux.
```
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
```
&ensp;&ensp;Notice how our <App /> is now wrapped with the <Provider /> with store passed in as a prop.

### Connecting the Components
&ensp;&ensp;React Redux provides a `connect` function for you to read values from the Redux store (and re-read the values when the store updates).<br/>
The connect function takes two arguments, both optional:
- `mapStateToProps`: called every time the store state changes. It receives the entire store state, and should return an object of data this component needs.
- `mapDispatchToProps`: this parameter can either be a function, or an object.
    - If it’s a function, it will be called once on component creation. It will receive `dispatch` as an argument, and should return an object full of functions that use `dispatch` to dispatch actions.
    - If it’s an object full of action creators, each action creator will be turned into a prop function that automatically dispatches its action when called. <ins>***Note***</ins>: We recommend using this “object shorthand” form.

Normally, you’ll call connect in this way:
```
const mapStateToProps = (state, ownProps) => ({
  // ... computed data from state and optionally ownProps
})

const mapDispatchToProps = {
  // ... normally is an object full of action creators
}

// `connect` returns a new function that accepts the component to wrap:
const connectToStore = connect(
  mapStateToProps,
  mapDispatchToProps
)
// and that function returns the connected, wrapper component:
const ConnectedComponent = connectToStore(Component)
```

We normally do both in one step, like this:
```
connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
```

#### Example - Connecting the Components
Our addTodo action creator looks like this:
```
// actions/actions.js
import { ADD_TODO } from './actionTypes'

let nextTodoId = 0
export const addTodo = content => ({
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    content
  }
})

// ... other actions
```

&ensp;&ensp;By passing it to connect, our component receives it as a prop, and it will automatically dispatch the action when it’s called.<br/>
&ensp;&ensp;Notice now that <AddTodo /> is wrapped with a parent component called <Connect(AddTodo) />. Meanwhile, <AddTodo /> now gains one prop: the addTodo action.
```
// components/InputTodoArea.js

// ... other imports
import { connect } from 'react-redux'
import { addTodo } from './../actions/actions.jsx'

class AddTodo extends React.Component {
  // ... component implementation
}

export default connect(
  null,
  { addTodo }
)(AddTodo)
```

&ensp;&ensp;We also need to implement the handleAddTodo function to let it dispatch the addTodo action and reset the input.
&ensp;&ensp;Now our <AddTodo /> is connected to the store. When we add a todo it would dispatch an action to change the store. We are not seeing it in the app because the other components are not connected yet.
```
// components/InputTodoArea.js

import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from './../actions/actions.jsx'

class AddTodo extends React.Component {
  // ...

  handleAddTodo = () => {
    // dispatches actions to add todo
    this.props.addTodo(this.state.input)

    // sets state back to empty string
    this.setState({ input: '' })
  }

  render() {
    return (
      <div>
        <input
          onChange={e => this.updateInput(e.target.value)}
          value={this.state.input}
        />
        <button className="add-todo" onClick={this.handleAddTodo}>
          Add Todo
        </button>
      </div>
    )
  }
}

export default connect(
  null,
  { addTodo }
)(AddTodo)
```

&ensp;&ensp;The `<TodoList />` component is responsible for rendering the list of todos. Therefore, it needs to read data from the store. We enable it by calling `connect` with the `mapStateToProps` parameter, a function describing which part of the data we need from the store.
Our `<TodoItem />` component takes the todo item as props. We have this information from the `byIds` field of the `todos`. However, we also need the information from the `allIds` field of the store indicating which todos and in what order they should be rendered. Our `mapStateToProps` function may look like this:
```
// components/TodoList.js

// ...other imports
import { connect } from "react-redux";

const TodoList = // ... UI component implementation

const mapStateToProps = state => {
  const { byIds, allIds } = state.todos || {};
  const todos =
    allIds && allIds.length
      ? allIds.map(id => (byIds ? { ...byIds[id], id } : null))
      : null;
  return { todos };
};

export default connect(mapStateToProps)(TodoList);
```
Luckily we have a selector that does exactly this. We may simply import the selector and use it here.
```
// reducers/selectors.js

export const getTodosState = store => store.todos

export const getTodoList = store =>
  getTodosState(store) ? getTodosState(store).allIds : []

export const getTodoById = (store, id) =>
  getTodosState(store) ? { ...getTodosState(store).byIds[id], id } : {}

export const getTodos = store =>
  getTodoList(store).map(id => getTodoById(store, id))
```

```
// components/TodoList.js

// ...other imports
import { connect } from "react-redux";
import { getTodos } from "../redux/selectors";

const TodoList = // ... UI component implementation

export default connect(state => ({ todos: getTodos(state) }))(TodoList);
```




### Built with

#### Core Stack
* [React](https://github.com/facebook/react)
* [Redux](https://github.com/reduxjs/redux)
* [Webpack](https://github.com/webpack/webpack)
* [SaSS](https://github.com/sass/sass)

Check out [package.json](https://github.com/Jalever/todo-list/blob/master/package.json).

### Links
[React-Redux Getting Started](https://react-redux.js.org/introduction/quick-start)
