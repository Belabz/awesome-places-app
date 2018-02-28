import { ADD_PLACE, SET_PLACES, REMOVE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from './index';

export const addPlace = (placeName, location, image) => {
	return dispatch => {
		// set a global token variable
		let authToken;

		// start loading function
		dispatch(uiStartLoading());

		dispatch(authGetToken())
			.catch(() => {
				alert('No valid token found!')
			})
			.then(token => {
				// re-assign the token
				authToken = token;

				// call the cloud function to store the image
				return fetch('https://us-central1-awesome-places-1518203085771.cloudfunctions.net/storeImage', {
					method: 'POST',
					body: JSON.stringify({
						image: image.base64
					}),
					// check headers pattern in the functions/index.js
					headers: {
						'Authorization': 'Bearer ' +  authToken
					}
				})
			})
			// catch the error related request sending
			// .catch(error => {
			// 	console.log(error);
			// 	alert('Something went wrong!');
			// 	dispatch(uiStopLoading())
			// })
			.then(response => response.json())
			.then(parsedRes => {
				// set the place data object
				const placeData = {
					placeName: placeName,
					location: location,
					image: parsedRes.imageUrl
				};

				// post data to the firebase database
				return fetch('https://awesome-places-1518203085771.firebaseio.com/places.json?auth=' + authToken, {
					method: 'POST',
					body: JSON.stringify(placeData)
				})
			})
			.then(response => response.json())
			.then(parsedRes => {
				console.log(parsedRes);
				dispatch(addNewPlace(parsedRes.name, placeName, location, image));
				dispatch(uiStopLoading())
			})
			// catch any error
			.catch(error => {
				console.log(error);
				alert('Something went wrong!');
				dispatch(uiStopLoading())
			})
	}
};

const addNewPlace = (id, placeName, location, image) => {
	return {
		type: ADD_PLACE,
		id: id,
		placeName: placeName,
		location: location,
		image: image
		// image: { uri: image }
	}
};

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

export const getPlaces = () => {
	return dispatch => {
		// return (dispatch, getState) => {
		// get the token
		// const token = getState().auth.token;

		// statement prevention
		// if (!token) {
		// 	return
		// }

		// fetch('https://awesome-places-1518203085771.firebaseio.com/places.json?auth=' + token)

		dispatch(authGetToken())
			.catch(() => {
				alert('No valid token found!')
			})
			.then(token => {
				return fetch('https://awesome-places-1518203085771.firebaseio.com/places.json?auth=' + token)
			})
			// catch the error from the sending of the request
			// .catch(error => {
			// 	alert('Something went wrong!');
			// 	console.log(error)
			// })
			.then(response => response.json())
			.then(parsedRes => {
				const places = [];

				for (let key in parsedRes) {
					places.push({
						...parsedRes[key],
						id: key,
						image: { uri: parsedRes[key].image }
					})
				}
				dispatch(setPlaces(places))
			})
			// catch any errors
			.catch(error => {
				alert('Something went wrong!');
				console.log(error)
			})
	}
};

const setPlaces = places => {
	return {
		type: SET_PLACES,
		places: places
	}
};

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

export const deletePlace = id => {
	return dispatch => {
		dispatch(authGetToken())
			.catch(() => {
				alert('No token found!')
			})
			.then(token => {
				return fetch('https://awesome-places-1518203085771.firebaseio.com/places/' + id + '.json?auth=' + token, {
					method: 'DELETE'
				})
			})
			// .catch(error => {
			// 	console.log(error);
			// 	alert('Something went wrong!');
			// })
			.then(response => response.json())
			.then(parsedRes => {
				console.log('Deletion done!');
				dispatch(removePlace(id))
			})
			.catch(error => {
				console.log(error);
				alert('Something went wrong!');
			})
	}
};

const removePlace = id => {
	return {
		type: REMOVE_PLACE,
		placeKey: id
	}
};

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

// export const selectPlace = key => {
// 	return {
// 		type: SELECT_PLACE,
// 		placeKey: key
// 	}
// };

// export const deselectPlace = () => {
// 	return {
// 		type: DESELECT_PLACE
// 	}
// };
