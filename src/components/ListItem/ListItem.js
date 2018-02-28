import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ItemList = (props) => (
	<TouchableOpacity onPress={ props.onItemPressed }>
		<View style={ styles.listItem }>
			<Image resizeMode="cover" source={ props.placeImage } style={ styles.placeImage } />
			<Text>{ props.placeName }</Text>
		</View>
	</TouchableOpacity>
);

/* -------------------------------------------------------------------------
   - set a list item style
------------------------------------------------------------------------- */
const styles = StyleSheet.create({
	listItem: {
		width: '100%',
		marginBottom: 5,
		padding: 10,
		borderRadius: 5,
		backgroundColor: '#eee',
		flexDirection: 'row',
		alignItems: 'center'
	},

	placeImage: {
		borderRadius: 3,
		marginRight: 10,
		height: 60,
		width: 60
	}
});

export default ItemList;
