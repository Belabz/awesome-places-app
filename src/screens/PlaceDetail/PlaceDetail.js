import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import { deletePlace } from '../../store/actions';
// import the icons
import Icon from 'react-native-vector-icons/Ionicons'

class PlaceDetail extends Component {
	state = {
		// init the state for view mode: portrait or landscape
		viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
	};

	constructor(props) {
		super(props);
		Dimensions.addEventListener('change', this.switchModeView)
	}

	// unmount the event listener to not create a memory leak
	componentWillUnmount() {
		Dimensions.removeEventListener('change', this.switchModeView)
	}

	// switch mode method
	switchModeView = dims => {
		this.setState({ viewMode: dims.window.height > 500 ? 'portrait' : 'landscape' })
	};

	/* -------------------------------------------------------------------------
	   - delete place handler
	------------------------------------------------------------------------- */
	deletePlaceHandler = () => {
		this.props.onDeletePlace(this.props.place.id);

		// navigate to the root page by removing all the screens
		this.props.navigator.pop();
	};

	render() {
		return (
			<View style={[styles.container, this.state.viewMode === 'portrait' ? styles.prtContainer : styles.lsContainer]}>
				<View style={ styles.subContainer }>
					<Image source={ this.props.place.image } style={ styles.placeImage } />
				</View>

				{/*<View>
					<Text style={ styles.placeName }>{ this.props.place.name } </Text>
				</View>*/}

				<View style={ styles.subContainer }>
					<MapView
						initialRegion={{
							...this.props.place.location,
							latitudeDelta: 0.0122,
							longitudeDelta:
								Dimensions.get('window').width /
								Dimensions.get('window').height *
								0.0122
						}}
						style={ styles.mapView }
					>
						<MapView.Marker coordinate={ this.props.place.location } />
					</MapView>
				</View>

				<View style={ styles.subContainer }>
					<View style={ styles.buttonsBlock }>
						<TouchableOpacity onPress={ this.deletePlaceHandler }>
							<Icon size={ 30 } name={ Platform.OS === 'android' ? 'md-trash' : 'ios-trash-outline' } color='red' />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		// margin: 20,
		flex: 1,
		padding: 20
	},

	// landscape style
	lsContainer: {
		flexDirection: 'row'
	},

	// portrait style
	prtContainer: {
		flexDirection: 'column'
	},

	subContainer: {
		flex: 1,
		// padding: 20
	},

	placeImage: {
		width: '100%',
		height: '100%',
		borderRadius: 3
		// marginTop: 10,
		// marginBottom: 10
	},

	mapView: {
		...StyleSheet.absoluteFillObject
	},

	placeName: {
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 30,
		marginBottom: 20
	},

	buttonsBlock: {
		// flexDirection: 'row',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
const mapDispatchToProp = dispatch => {
	return {
		onDeletePlace: key => dispatch(deletePlace(key))
	}
};

export default connect(null, mapDispatchToProp)(PlaceDetail);
