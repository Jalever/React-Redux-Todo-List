import { VISIBILITY_FILTERS } from "./../constants/constants.jsx";

const getTodosList = store => {
	return store.todos;
};

//expected output:
// {
// 	todos: {
// 		allIds: [1],
// 		byIds: {
// 			1: {
// 				content: "111",
// 				completed: false
// 			}
// 		}
// 	},
// 	visibilityFilter: "all"
// }

const getTodosAllIds = store => {
	return getTodosList(store) ? getTodosList(store).allIds : [];
};

const getTodosContent = ( store, id ) => {
	return getTodosList(store) ? { ...getTodosList(store).byIds[id], id } : {};
};
//expeted output:
// {
// 	content: "111",
// 	completed: false,
// 	id: 1
// }

const getAllTodos = (store) => {
	return getTodosAllIds(store).map( (id) => {
		return getTodosContent(store, id);
	} );
};
//expeted output:
// [{
// 	content: "111",
// 	completed: false,
// 	id: 1
// },{
// 	content: "222",
// 	completed: false,
// 	id: 2
// }]

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

















