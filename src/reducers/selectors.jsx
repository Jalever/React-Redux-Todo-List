import { VISIBILITY_FILTERS } from "./../constants/constants.jsx";

const getTodosList = store => {
	return store.todos;
};

const getTodosAllIds = store => {
	return getTodosList(store) ? getTodosList(store).allIds : [];
};

const getTodosContent = ( store, id ) => {
	return getTodosList(store) ? { ...getTodosList(store).byIds[id], id } : {};
};

const getAllTodos = (store) => {
	return getTodosAllIds(store).map( (id) => {
		return getTodosContent(store, id);
	} );
};

export const getTodosByVisibilityFilter = (store, visibilityFilter) => {
	const allTodos = getAllTodos(store);

	switch(visibilityFilter) {
		case VISIBILITY_FILTERS.COMPLETED:
			return allTodos.filter( todo => {
				return todo.completed;
			} );

		case VISIBILITY_FILTERS.INCOMPLETE:
			return allTodos.filter( todo => {
				return !todo.completed;
			} );

		case VISIBILITY_FILTERS.ALL:
		default:
			return allTodos;
	}
};

















