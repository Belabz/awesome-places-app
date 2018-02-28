import { Navigation } from 'react-native-navigation';

// redux imports
import { Provider } from 'react-redux';
import storeConfig from './src/store/storeConfig';

import AuthScreen from './src/screens/Auth/Auth';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';

// init the redux store
const store = storeConfig();

// register screen
Navigation.registerComponent('ap.AuthScreen', () => AuthScreen, store, Provider);
Navigation.registerComponent('ap.FindPlaceScreen', () => FindPlaceScreen, store, Provider);
Navigation.registerComponent('ap.SharePlaceScreen', () => SharePlaceScreen, store, Provider);
Navigation.registerComponent('ap.PlaceDetailScreen', () =>  PlaceDetailScreen, store, Provider);
Navigation.registerComponent('ap.SideDrawer', () => SideDrawer, store, Provider);

// start the app
export default () => Navigation.startSingleScreenApp({
	screen: {
		screen: 'ap.AuthScreen',
		title: 'Login'
	}
});

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

// import React from 'react';
// import { View, StyleSheet } from 'react-native';
//
// import { connect } from 'react-redux';
// import { addPlace, deletePlace, selectPlace, deselectPlace } from './src/store/actions';
//
// import PlaceInput from './src/containers/PlaceInput/PlaceInput';
// import PlaceList from './src/components/PlaceList/PlaceList';
// import PlaceDetailModal from './src/components/PlaceDetailModal/PlaceDetailModal';
//
// // import placeImage from './src/assets/sample.jpg';
//
// class App extends React.Component {
// 	/* -------------------------------------------------------------------------
// 	   - init a state
// 	------------------------------------------------------------------------- */
// 	// state = {
// 	// 	places: [],
// 	// 	selectedPlace: null
// 	// };
//
// 	/* -------------------------------------------------------------------------
// 	   - place add handler
// 	   - handler used for a simple rendering
// 	------------------------------------------------------------------------- */
// 	// placeAddHandler = placeName => {
// 	// 	// update the places array in the state in an immutable way
// 	// 	// concat automatically generate a new copy of array
// 	// 	this.setState(prevState => {
// 	// 		return {
// 	// 			places: prevState.places.concat(placeName)
// 	// 		}
// 	// 	})
// 	// };
//
// 	/* -------------------------------------------------------------------------
// 	   - some adaptation for this add a place function to be useful
// 	   - in use with a FlatList component
// 	------------------------------------------------------------------------- */
// 	addPlaceHandler = placeName => {
// 		// dispatch the function to the redux store
// 		this.props.onAddPlace(placeName)
//
// 		// update the places array in the state in an immutable way
// 		// concat automatically generate a new copy of array
// 		// this.setState(prevState => {
// 		// 	return {
// 		// 		places: prevState.places.concat({
// 		// 			key: Math.random(),
// 		// 			name: placeName,
// 		// 			// image: placeImage
// 		// 			// grab image from the web using uri
// 		// 			image: {
// 		// 				uri: "https://www.north-island.com/wp-content/uploads/2017/10/north-island-relais-chateaux-4-1.jpg"
// 		// 			}
// 		// 		})
// 		// 	}
// 		// })
// 	};
//
// 	/* -------------------------------------------------------------------------
// 	   - place delete item handler
// 	   - handler used for a simple rendering
// 	------------------------------------------------------------------------- */
// 	// placeDeleteItemHandler = index => {
// 	// 	this.setState(prevState => {
// 	// 		return {
// 	// 			places: prevState.places.filter((place, i) => {
// 	// 				return index !== i
// 	// 			})
// 	// 		}
// 	// 	})
// 	// };
//
// 	/* -------------------------------------------------------------------------
// 	   - delete place handler
// 	------------------------------------------------------------------------- */
// 	deletePlaceHandler = () => {
// 		// dispatch the function to the redux store
// 		this.props.onDeletePlace()
//
// 		// this.setState(prevState => {
// 		// 	return {
// 		// 		places: prevState.places.filter(place => {
// 		// 			return place.key !== prevState.selectedPlace.key
// 		// 		}),
// 		// 		selectedPlace: null
// 		// 	}
// 		// })
// 	};
//
// 	/* -------------------------------------------------------------------------
// 	   - some adaptation for this delete function to be useful
// 	   - in use with a FlatList component
// 	------------------------------------------------------------------------- */
// 	selectItemHandler = key => {
// 		// dispatch the function to the redux store
// 		this.props.onSelectPlace(key)
//
// 		// this.setState(prevState => {
// 		// 	return {
// 		// 		selectedPlace: prevState.places.find(place => {
// 		// 			return place.key === key
// 		// 		})
// 		// 	}
// 		// })
// 	};
//
// 	/* -------------------------------------------------------------------------
// 	   - close the modal handler
// 	------------------------------------------------------------------------- */
// 	closeModalHandler = () => {
// 		// dispatch the function to the redux store
// 		this.props.onDeselectPlace()
//
// 		// this.setState({ selectedPlace: null })
// 	};
//
// 	////////////////////////////////////////////////////////////////////////////
// 	////////////////////////////////////////////////////////////////////////////
// 	////////////////////////////////////////////////////////////////////////////
//
// 	render() {
// 		return (
// 			<View style={ styles.container }>
// 				<PlaceDetailModal
// 					selectedPlace={ this.props.selectedPlace }
// 					onDeletingPlace={ this.deletePlaceHandler }
// 					onCloseModal={ this.closeModalHandler }
// 				/>
//
// 				<PlaceInput onAddingPlace={ this.addPlaceHandler }/>
//
// 				<PlaceList
// 					places={ this.props.places }
// 					onSelectItem={ this.selectItemHandler }
// 				/>
// 			</View>
// 		);
// 	}
// }
//
// /* -------------------------------------------------------------------------
//    - set a style
// ------------------------------------------------------------------------- */
// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		paddingTop: 30,
// 		backgroundColor: '#fff',
// 		alignItems: 'center',
// 		justifyContent: 'flex-start',
// 	}
// });
//
// ////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////
//
// const mapStateToProp = state => {
// 	return {
// 		places: state.places.places,
// 		selectedPlace: state.places.selectedPlace
// 	}
// };
//
// const mapDispatchToProp = dispatch => {
// 	return {
// 		onAddPlace: placeName => dispatch(addPlace(placeName)),
// 		onDeletePlace: () => dispatch(deletePlace()),
// 		onSelectPlace: placeKey => dispatch(selectPlace(placeKey)),
// 		onDeselectPlace: () => dispatch(deselectPlace())
// 	}
// };
//
// export default connect(mapStateToProp, mapDispatchToProp)(App);
