import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { addPlace } from '../../store/actions';
import formValidation from '../../utility/formValidation';
import PlaceInput from '../../containers/PlaceInput/PlaceInput';
import ButtonUi from '../../components/Ui/Button/ButtonUi';
// import HeadingText from '../../components/Ui/HeadingText/HeadingText';
import PickImage from "../../components/PickImage/PickImage";
import PickLocation from "../../components/PickLocation/PickLocation";

class SharePlaceScreen extends Component {
	// set a color style for the drawer button
	// use static keyword to access the var without being instantiated
	// this style can be used start tab config for global styling
	// static navigatorStyle = {
	// 	navBarButtonColor: '#2A95E9'
	// };

	/* -------------------------------------------------------------------------
	   - init a state
	------------------------------------------------------------------------- */
	initState = () => {
		this.setState({
			controls: {
				placeName: {
					value: "",
					valid: false,
					touched: false,
					rules: {
						notEmpty: true
					}
				},

				location: {
					coords: null,
					valid: false
				},

				image: {
					uri: null,
					valid: false
				}
			}
		})
	};

	constructor(props) {
		super(props);
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
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
	   - set the state on component will mount
	------------------------------------------------------------------------- */
	componentWillMount() {
		this.initState();
	}

	/* -------------------------------------------------------------------------
	   - input change handler
	------------------------------------------------------------------------- */
	inputChangeHandler = value => {
		this.setState(prevState => {
			return {
				controls: {
					...prevState.controls,
					placeName: {
						...prevState.controls.placeName,
						value: value,
						valid: formValidation(value, prevState.controls.placeName.rules),
						touched: true
					}
				}
			}
		})
	};

	/* -------------------------------------------------------------------------
	   - add place handler
	------------------------------------------------------------------------- */
	addPlaceHandler = () => {
		// avoid submit action if text field is empty
		// if (this.state.placeName.trim() !== '') {
		this.props.onAddPlace(
			this.state.controls.placeName.value,
			this.state.controls.location.coords,
			this.state.controls.image.uri
		);

		this.initState();
		this.imagePicker.reset();
		this.locationPicker.reset()

		// }

		// clear the text input
		// this.setState(prevState => {
		// 	return {
		// 		controls: {
		// 			...prevState.controls,
		// 			placeName: {
		// 				...prevState.controls.placeName,
		// 				value: '',
		// 				valid: false,
		// 				touched: false,
		// 			}
		// 		}
		// 	}
		// })
	};

	/* -------------------------------------------------------------------------
	   - location pick handler
	------------------------------------------------------------------------- */
	locationPickHandler = location => {
		this.setState(prevState => {
			return {
				controls: {
					...prevState.controls,
					location: {
						coords: location,
						valid: true
					}
				}
			}
		})
	};

	/* -------------------------------------------------------------------------
	   - image pick handler
	------------------------------------------------------------------------- */
	imagePickHandler = image => {
		this.setState(prevState => {
			return {
				controls: {
					...prevState.controls,
					image: {
						uri: image,
						valid: true
					}
				}
			}
		})
	};

	render() {
		/* -------------------------------------------------------------------------
		   - switch between the button and the loading ui
		------------------------------------------------------------------------- */
		let submitButton = (
			<ButtonUi
				bgColor="#2A95E9"
				txtColor="white"
				onPress={ this.addPlaceHandler }
				disabled={
					!this.state.controls.placeName.valid ||
					!this.state.controls.location.valid ||
					!this.state.controls.image.valid
				}
			>
				SHARE THE PLACE
			</ButtonUi>
		);

		if (this.props.isLoading) {
			submitButton = <ActivityIndicator />
		}

		/* -------------------------------------------------------------------------
		   - set common content
		------------------------------------------------------------------------- */
		const content = (
			<ScrollView>
				<View style={ styles.container }>
					{/*<HeadingText>Share your place</HeadingText>*/}

					<PickImage
						onPickImage={ this.imagePickHandler }
						ref={ ref => (this.imagePicker = ref) }
					/>

					<PickLocation
						onPickLocation={ this.locationPickHandler }
						ref={ ref => (this.locationPicker = ref) }
					/>

					<PlaceInput
						placeData={ this.state.controls.placeName }
						onChangeText={ this.inputChangeHandler }
					/>

					{ submitButton }
				</View>
			</ScrollView>
		);

		// android keyboard view hack
		// the keyboardVerticalOffset -500 remove the strange white
		// element before the input text
		if (Platform.OS === 'android') {
			return (
				<KeyboardAvoidingView behavior="position" keyboardVerticalOffset={ -500 }>
					{ content }
				</KeyboardAvoidingView>
			)
		}

		// return the ios keyboard view params
		return (
			<KeyboardAvoidingView behavior="position">
				{ content }
			</KeyboardAvoidingView>
		)
	}
}

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
const mapStateToProp = state => {
	return {
		isLoading: state.ui.isLoading
	}
};


const mapDispatchToProp = dispatch => {
	return {
		onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image))
	}
};

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		padding: 20
	},

	placeHolder: {
		width: '100%',
		backgroundColor: '#eee',
		height: 200,
		borderRadius: 2
	}
});

export default connect(mapStateToProp, mapDispatchToProp)(SharePlaceScreen);
