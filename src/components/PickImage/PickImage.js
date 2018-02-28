import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import ButtonUi from '../../components/Ui/Button/ButtonUi';
// import imagePlace from '../../assets/sample.jpg';

class PickImage extends Component {
	componentWillMount() {
		this.initState()
	}

	/* -------------------------------------------------------------------------
	   - reset state method
	------------------------------------------------------------------------- */
	initState = () => {
		this.setState({
			pickedImage: null
		})
	};

	/* -------------------------------------------------------------------------
	   - pick an image handler
	------------------------------------------------------------------------- */
	pickImageHandler = () => {
		// in case to no need to keep data base 64 we can turn it off by
		// configuring the image picker and set/add "noData: true" this will
		// improve the performance a bit because converting the image to base 64
		// takes a bit of time but this's better if we want to take it advantage
		// to transfer and store the image to a server
		// maxWidth and maxHeight will specify the image size and shrink the original one
		ImagePicker.showImagePicker({ title: 'Pick and Image', maxWidth: 800, maxHeight: 600 }, response => {
			if (response.didCancel) {
				console.log('Action canceled by the user!');
			} else if (response.error) {
				console.log('Error: ', error)
			} else {
				this.setState({
					pickedImage: { uri: response.uri }
				});

				// data is a property provided by the response object which will
				// hold the image as base 64 data
				this.props.onPickImage({ uri: response.uri, base64: response.data })
			}
		})
	};

	render() {
		return (
			<View style={ styles.container }>
				<View style={ styles.placeHolder }>
					<Image source={ this.state.pickedImage } style={ styles.imagePreview } />
				</View>

				<ButtonUi
					bgColor="#2A95E9"
					txtColor="white"
					onPress={ this.pickImageHandler }
				>
					PICK AN IMAGE
				</ButtonUi>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%'
	},

	placeHolder: {
		width: '100%',
		height: 200,
		backgroundColor: '#eee',
		borderRadius: 3
	},

	imagePreview: {
		width: '100%',
		height: '100%',
		borderRadius: 3
	}
});

export default PickImage;
