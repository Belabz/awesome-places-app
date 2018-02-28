import React from 'react';
import { View, StyleSheet } from 'react-native';
import InputUi from '../../components/Ui/Input/Input';

const placeInput = props => {

	/* -------------------------------------------------------------------------
	   - submit place name handler
	------------------------------------------------------------------------- */
	// submitPlaceHandler = () => {
	// 	// prevent to concat or add empty submitted value
	// 	if (this.state.placeName.trim() === '') {
	// 		return
	// 	}
	//
	// 	// fire the add place method trough props
	// 	this.props.onAddingPlace(this.state.placeName);
	//
	// 	// clear the text input
	// 	this.setState({ placeName: '' })
	// };

	////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////

		return (
			<View style={ styles.container }>
				<InputUi
					placeholder="Place Name"
					value={ props.placeData.value }
					valid={ props.placeData.valid }
					touched={ props.placeData.touched }
					onChangeText={ props.onChangeText }
				/>

				{/*<TextInput
					style={ styles.input }
					placeholder="Awesome Place Name"
					value={ this.state.placeName }
					onChangeText={ this.inputChangeHandler }
				/>*/}

				{/*<Button
					title="Add"
					style={ styles.button }
					onPress={ this.submitPlaceHandler }
				/>*/}
			</View>
		)
};

/* -------------------------------------------------------------------------
   - set a style
------------------------------------------------------------------------- */
const styles = StyleSheet.create({
	container: {
		width: '100%',
	},

	input: {
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: '#eee'
	},
});

export default placeInput;
