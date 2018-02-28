import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Animated } from 'react-native';
import { connect } from 'react-redux';
import PlaceList from '../../components/PlaceList/PlaceList';
import { getPlaces } from '../../store/actions';

class FindPlaceScreen extends Component {
	/* -------------------------------------------------------------------------
	   - init the state
	------------------------------------------------------------------------- */
	state = {
		loadStatus: false,
		btnAnimate: new Animated.Value(1),
		itmAnimate: new Animated.Value(0)
	};

	constructor(props) {
		super(props);
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
	}

	componentDidMount() {
		this.props.onGetPlaces()
	}

	onNavigatorEvent = event => {
		if (event.type === 'NavBarButtonPress') {
			if (event.id === 'sideDrawerToggle') {
				this.props.navigator.toggleDrawer({
					side: 'left'
				})
			}
		}
	};

	/* -------------------------------------------------------------------------
	   - item selected handler
	------------------------------------------------------------------------- */
	itemSelectedHandler = key => {
		const selectedPlace = this.props.places.find(place => {
			return place.id === key
		});

		// push the navigation and pass selected place props to place details screen
		this.props.navigator.push({
			screen: 'ap.PlaceDetailScreen',
			title: selectedPlace.placeName,
			passProps: {
				place: selectedPlace
			}
		})
	};

	/* -------------------------------------------------------------------------
	   - places loading handler
	------------------------------------------------------------------------- */
	placesLoadHandler = () => {
		Animated.timing(this.state.itmAnimate, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true
		}).start()
	};

	/* -------------------------------------------------------------------------
	   - places search handler
	------------------------------------------------------------------------- */
	placeSearchHandler = () => {
		Animated.timing(this.state.btnAnimate, {
			toValue: 0,
			duration: 500,
			useNativeDriver: true
		}).start(() => {
			this.setState({ loadStatus: true });
			this.placesLoadHandler()
		})
	};

	render() {
		let content = (
			<Animated.View
				style={{
					opacity: this.state.btnAnimate,
					transform: [
						{
							scale: this.state.btnAnimate.interpolate({
								inputRange: [0, 1],
								outputRange: [12, 1]
							})
						}
					]
				}}
			>
				<TouchableOpacity onPress={ this.placeSearchHandler }>
					<View style={ styles.button }>
						<Text style={ styles.buttonText }>Get Places</Text>
					</View>
				</TouchableOpacity>
			</Animated.View>
		);

		if (this.state.loadStatus) {
			content = (
				<Animated.View
					style={{
						opacity: this.state.itmAnimate,
						// transform: [
						// 	{
						// 		scale: this.state.itmAnimate.interpolate({
						// 			inputRange: [0, 1],
						// 			outputRange: [0, 1]
						// 		})
						// 	}
						// ]
					}}
				>
					<PlaceList places={ this.props.places } onSelectItem={ this.itemSelectedHandler }/>
				</Animated.View>
			)
		}

		return <View style={ this.state.loadStatus ? null : styles.buttonContainer }>{ content }</View>
	}
}

const styles = StyleSheet.create({
	buttonContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},

	button: {
		borderColor: '#2A95E9',
		borderWidth: 5,
		borderRadius: 25,
		padding: 20
	},

	buttonText: {
		color: '#2A95E9',
		fontWeight: 'bold',
		fontSize: 26
	}
});

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
const mapStateToProp = state => {
	return {
		places: state.places.places
	}
};

const mapDispatchToProp = dispatch => {
	return {
		onGetPlaces: () => dispatch(getPlaces())
	}
};

export default connect(mapStateToProp, mapDispatchToProp)(FindPlaceScreen);
