import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import ButtonUi from '../../components/Ui/Button/ButtonUi';

class PickLocation extends Component {
	componentWillMount() {
		this.initState()
	}

	/* -------------------------------------------------------------------------
	   - reset state function
	------------------------------------------------------------------------- */
	initState = () => {
		this.setState({
			focusedLocation: {
				latitude: 37.7900352,
				longitude: -122.4013726,
				latitudeDelta: 0.0122,
				longitudeDelta:
				Dimensions.get('window').width /
				Dimensions.get('window').height *
				0.0122
			},

			locationChosen: false
		})
	};

	/* -------------------------------------------------------------------------
	   - pick a location handler
	------------------------------------------------------------------------- */
	pickLocationHandler = event => {
		// set the location coordination
		const coords = event.nativeEvent.coordinate;

		// animate to location
		this.map.animateToRegion({
			...this.state.focusedLocation,
			latitude: coords.latitude,
			longitude: coords.longitude
		});

		this.setState(prevState => {
			return {
				focusedLocation: {
					...prevState.focusedLocation,
					latitude: coords.latitude,
					longitude: coords.longitude
				},

				locationChosen: true
			}
		});

		// distribute the coords over props to he parent component
		this.props.onPickLocation({
			latitude: coords.latitude,
			longitude: coords.longitude
		})
	};

	/* -------------------------------------------------------------------------
	   - get the geolocation automatically
	------------------------------------------------------------------------- */
	geolocationHandler = () => {
		navigator.geolocation.getCurrentPosition(position => {
			const coordsEvent = {
				nativeEvent: {
					coordinate: {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude
					}
				}
			};

			this.pickLocationHandler(coordsEvent)
		}, error => {
			console.log(error);
			alert('Fetching the position failed!')
		})
	};

	render() {
		/* -------------------------------------------------------------------------
		   - init the marker
		------------------------------------------------------------------------- */
		let marker = null;

		if (this.state.locationChosen) {
			marker = <MapView.Marker coordinate={ this.state.focusedLocation } />
		}
		return (
			<View style={ styles.container }>
				<View style={ styles.placeHolder }>
					<MapView
						initialRegion={ this.state.focusedLocation }
						region={ !this.state.locationChosen ? this.state.focusedLocation : null }
						style={ styles.mapView }
						onPress={ this.pickLocationHandler }
						ref={ ref => this.map = ref }
					>
						{ marker }
					</MapView>
				</View>

				<ButtonUi
					bgColor="#2A95E9"
					txtColor="white"
					onPress={ this.geolocationHandler }
				>
					LOCATE ME
				</ButtonUi>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		// alignItems: 'center'
	},

	mapView: {
		width: '100%',
		height: 200,
		borderRadius: 3
	},

	imagePreview: {
		width: '100%',
		height: '100%',
		borderRadius: 3
	}
});

export default PickLocation;
