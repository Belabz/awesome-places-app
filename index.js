import React from 'react';
import { AppRegistry } from 'react-native';
// redux imports
import { Provider } from 'react-redux';
import storeConfig from './src/store/storeConfig';

import App from './App';

// init the store
const store = storeConfig();

const RNRedux = () => (
	<Provider store={ store }>
		<App />
	</Provider>
);

AppRegistry.registerComponent('awesomeplaces', () => RNRedux);
