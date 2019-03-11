import {
	ADD_TODO,
	TOGGLE_TODO
} from "./../actions/actionType.jsx";

const initialState = {
	allIds: [],	//存储todo-item的id
	byIds: {}	
};

//expected output:
// {
// 	allIds: [1,2,3,4],
// 	byIds: {
// 		1: {
// 			content: "111",
// 			completed: false
// 		}
// 		2: {
// 			content: "222",
// 			completed: false
// 		}
// 		3: {
// 			content: "333",
// 			completed: false
// 		}
// 		4: {
// 			content: "444",
// 			completed: false
// 		}
// 	}
// }

export default function(state = initialState, action) {
	switch(action.type) {
		case ADD_TODO:{
			const { id, content } = action.payload;

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
			const { id } = action.payload;

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














