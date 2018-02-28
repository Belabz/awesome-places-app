// Middleware is the suggested way to extend Redux with custom functionality.
// Middleware lets you wrap the store's dispatch method for fun and profit.
// The key feature of middleware is that it is composable.
// Multiple middleware can be combined together, where each middleware requires
// no knowledge of what comes before or after it in the chain.
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
// redux-thunk lets the action creators invert control by dispatching functions.
// They would receive dispatch as an argument and may call it asynchronously.
// Such functions are called thunks.
import thunk from 'redux-thunk';
import placeReducer from './reducers/places';
import uiReducer from './reducers/ui';
import authReducer from './reducers/auth';

/* -------------------------------------------------------------------------
   - connect redux devtool
------------------------------------------------------------------------- */
let composeEnhancer = compose;

// set redux devtool if environment is in dev mode
if (__DEV__) {
	composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

const rootReducer = combineReducers({
	places: placeReducer,
	ui: uiReducer,
	auth: authReducer
});

const configureStore = () => {
	return createStore(rootReducer, composeEnhancer(
		applyMiddleware(thunk)
	))
};

export default configureStore;
