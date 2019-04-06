import {
	ADD_TODO,
	TOGGLE_TODO
} from "../actions/actionTypes.jsx";

const initialState = {
	allIds: [],
	byIds: {}
};

export default function(state = initialState, action) {
	switch(action.type) {
		case ADD_TODO:{
			let { id, content } = action.payload;
			return {
				...state,
				allIds: [...state.allIds, id],
				byIds: {
					...state.byIds,
					[id]: {
						content,
						completed: false
					}
				}
			};
		}
		case TOGGLE_TODO: {
			let { id } = action.payload;
			return {
				...state,
				byIds: {
					...state.byIds,
					[id]: {
						...state.byIds[id],
						completed: !state.byIds[id].completed
					}
				}
			};
		}
		default: 
			return state;
	}
}

