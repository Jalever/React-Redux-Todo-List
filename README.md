## A Todo List Example

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

### Built with

#### Core Stack
* [React](https://github.com/facebook/react)
* [Redux](https://github.com/reduxjs/redux)
* [Webpack](https://github.com/webpack/webpack)
* [SaSS](https://github.com/sass/sass)

Check out [package.json](https://github.com/Jalever/todo-list/blob/master/package.json).

### Links
[React-Redux Getting Started](https://react-redux.js.org/introduction/quick-start)
