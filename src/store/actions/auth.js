import { AsyncStorage } from 'react-native';
import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from './actionTypes';
import authPage from '../../../App';
import startTabs from '../../screens/MainTabs/StartMainTabs';
import { uiStartLoading, uiStopLoading } from './index';

const API_KEY = 'AIzaSyAssYvggSemmY2hDGUp78c8OxzC-uSuExg';

export const tryAuth = (authData, authMode) => {
	return dispatch => {
		// introduce the loading state
		dispatch(uiStartLoading());

		let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + API_KEY;

		if (authMode === 'signup') {
			url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + API_KEY
		}

		fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				email: authData.email,
				password: authData.password,
				returnSecureToken: true
			}),
			headers: { 'Content-Type': 'application/json' }
		})
			.catch(error => {
				console.log(error);
				dispatch(uiStopLoading());
				alert('Authentication failed, please try again!');
			})
			.then(response => response.json())
			.then(parsedRes => {
				dispatch(uiStopLoading());
				console.log(parsedRes.error);
				if (!parsedRes.idToken) {
					alert(parsedRes.error.message);
				} else {
					dispatch(
						authStoreToken(
							parsedRes.idToken,
							parsedRes.expiresIn,
							parsedRes.refreshToken
						)
					);

					startTabs()
				}
			})
	}
};

const authStoreToken = (token, expiresIn, refreshToken) => {
	return dispatch => {
		const now = new Date();
		const expiryDate = now.getTime() + expiresIn * 1000;

		dispatch(authSetToken(token, expiryDate));
		AsyncStorage.setItem('ap:auth:token', token);
		AsyncStorage.setItem('ap:auth:expiryDate', expiryDate.toString());
		AsyncStorage.setItem('ap:auth:refreshToken', refreshToken)
	}
};

const authSetToken = (token, expiryDate) => {
	return {
		type: AUTH_SET_TOKEN,
		token: token,
		expiryDate: expiryDate
	}
};

/* -------------------------------------------------------------------------
   - helper function to get the token
------------------------------------------------------------------------- */
export const authGetToken = () => {
	return (dispatch, getState) => {
		// create our own promise
		const promise = new Promise((resolve, reject) => {
			// get the token from the store
			const token = getState().auth.token;
			const expiryDate = getState().auth.expiryDate;

			if (!token || new Date(expiryDate) <= new Date()) {
				// set a local variable
				let fetchedToken;

				AsyncStorage.getItem('ap:auth:token')
					.catch(error => reject())
					.then(tokenFromStorage => {
						// set a local variable
						fetchedToken = tokenFromStorage;

						if (!tokenFromStorage) {
							reject();
							return
						}

						return AsyncStorage.getItem('ap:auth:expiryDate')
					})
					.then(expiryDate => {
						// const parsedExpiryDate = Date.parse(expiryDate);
						const parsedExpiryDate = new Date(parseInt(expiryDate));
						const now = new Date();

						// console.log(parsedExpiryDate >= now);

						if (parsedExpiryDate > now) {
							dispatch(authSetToken(fetchedToken));
							resolve(fetchedToken)
						} else {
							reject()
						}
					})
					.catch(error => reject())
			} else {
				resolve(token)
			}
		});

		// catch any error from the promise
		return promise
			.catch(error => {
				return AsyncStorage.getItem('ap:auth:refreshToken')
					.then(refreshToken => {
						return fetch('https://securetoken.googleapis.com/v1/token?key=' + API_KEY, {
							method: "POST",
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded'
							},
							body: 'grant_type=refresh_token&refresh_token=' + refreshToken
						})
					})
					.then(response => response.json())
					.then(parsedRes => {
						if (parsedRes.id_token) {
							console.log('Refresh token worked!');
							dispatch(
								authStoreToken(
									parsedRes.id_token,
									parsedRes.expires_in,
									parsedRes.refresh_token
								)
							);

							return parsedRes.id_token
						} else {
							dispatch(authClearStorage())
						}
					})
			})
			.then(token => {
				if (!token) {
					throw new Error()
				} else {
					return token
				}
			})
	}
};

/* -------------------------------------------------------------------------
   - auth auto signin
------------------------------------------------------------------------- */
export const authAutoSignIn = () => {
	return dispatch => {
		dispatch(authGetToken())
			.then(token => {
				startTabs()
			})
			.catch(error => console.log('Failed to fetch token!'))
	}
};

/* -------------------------------------------------------------------------
   - clear the storage function
------------------------------------------------------------------------- */
const authClearStorage = () => {
	return dispatch => {
		AsyncStorage.removeItem('ap:auth:token');
		AsyncStorage.removeItem('ap:auth:expiryDate');
		return AsyncStorage.removeItem('ap:auth:refreshToken');
	}
};

/* -------------------------------------------------------------------------
   - auth logout
------------------------------------------------------------------------- */
export const authLogout = () => {
	return dispatch => {
		dispatch(authClearStorage())
			.then(() => authPage());

		dispatch(authRemoveToken())
	}
};

const authRemoveToken = () => {
	return {
		type: AUTH_REMOVE_TOKEN
	}
};
