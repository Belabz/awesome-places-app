import React from 'react';
import { Text, StyleSheet } from 'react-native';

const headingInput = props => (
	<Text
		{ ...props }
		style={ styles.textHeading }
	>
		{ props.children }
	</Text>
);

const styles = StyleSheet.create({
	textHeading: {
		marginBottom: 16,
		color: '#333',
		fontSize: 28,
		fontWeight: 'bold',
		backgroundColor: 'transparent'
	}
});

export default headingInput;
