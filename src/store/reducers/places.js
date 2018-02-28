import { ADD_PLACE, DELETE_PLACE, SET_PLACES, REMOVE_PLACE } from '../actions/actionTypes';

const initialState = {
	places: [],
	// selectedPlace: null
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_PLACES:
			return {
				...state,
				places: action.places
			};

		case ADD_PLACE:
			return {
				...state,
				places: state.places.concat({
					id: action.id,
					placeName: action.placeName,
					location: action.location,
					image: { uri: action.image.uri },
				})
			};

		case REMOVE_PLACE:
			return {
				...state,
				places: state.places.filter(place => {
					return place.id !== action.placeKey
				}),
				// selectedPlace: null
			};

		// case DELETE_PLACE:
		// 	return {
		// 		...state,
		// 		places: state.places.filter(place => {
		// 			return place.key !== action.placeKey
		// 		}),
		// 		// selectedPlace: null
		// 	};

		// case SELECT_PLACE:
		// 	return {
		// 		...state,
		// 		selectedPlace: state.places.find(place => {
		// 			return place.key === action.placeKey
		// 		})
		// 	};
		//
		// case DESELECT_PLACE:
		// 	return {
		// 		...state,
		// 		selectedPlace: null
		// 	};

		default:
			return state
	}
};

export default reducer;
