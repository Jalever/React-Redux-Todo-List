import { VISIBILITY_FILTER } from "./../constants/index.jsx";
import { SET_FILTER } from "./../actions/actionTypes.jsx";

const initialState = VISIBILITY_FILTER.ALL;

const visibilityFilter = (state = initialState, action) => {
	switch(action.type) {
		case SET_FILTER: {
			// return action.payload.filter;
			let { filter } = action.payload;
			return filter;
		}
		default: 
			return state;
	}
};


export default visibilityFilter;
