import React from 'react';
import { TouchableOpacity, TouchableNativeFeedback, View, Text, StyleSheet, Platform } from 'react-native';

const buttonUi = props => {
	const btnContent = (
		<View style={[ styles.button, { backgroundColor: props.bgColor }, props.disabled ? styles.disabled : null ]}>
			<Text style={[ styles.buttonText, { color: props.txtColor }, props.disabled ? styles.disabledText : null ]}>
				{ props.children }
			</Text>
		</View>
	);

	/* -------------------------------------------------------------------------
	   - return the disabled button content
	------------------------------------------------------------------------- */
	if (props.disabled) {
		return btnContent
	}

	/* -------------------------------------------------------------------------
	   - return android pattern using platform api
	------------------------------------------------------------------------- */
	if (Platform.OS === 'android') {
		return <TouchableNativeFeedback onPress={ props.onPress}>
			{ btnContent }
		</TouchableNativeFeedback>
	}

	return (
		<TouchableOpacity onPress={ props.onPress}>
			{ btnContent }
		</TouchableOpacity>
	)
};

const styles = StyleSheet.create({
	button: {
		padding: 10,
		marginTop: 10,
		marginBottom: 10,
		borderRadius: 3
	},

	buttonText: {
		textAlign: 'center',
		fontWeight: 'bold'
	},

	disabled: {
		backgroundColor: '#eee',
	},

	disabledText: {
		color: '#333'
	}
});

export default buttonUi;
