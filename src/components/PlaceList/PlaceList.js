import React from 'react';
import { ScrollView, FlatList, StyleSheet } from 'react-native';
import ItemList from '../ListItem/ListItem';

const PlaceList = props => {
	// map the places array passed through the props
	// const placesOutput = props.places.map((place, index) =>
	// 	<ItemList
	// 		key={ index }
	// 		placeName={ place }
	// 		onItemPressed={ () => props.onDeleteItem(index) }
	// 	/>);

	return (
		// rendering ScrollView for a generic scrolling container
		// that can host multiple components and views
		// <ScrollView style={ styles.listContainer }>
		// 	{ placesOutput }
		// </ScrollView>

		// rendering FlatList, more efficient for dynamic list
		// and more powerful than ScrollView
		// TODO: solve the "Warning
		// Each child in an array or iterator should have a unique "key" prop."
		// TODO: adding new item with condition
		// when adding a new item to the list. avoid any item to be added at any error.
		<FlatList
			keyExtractor={ item => item.id }
			style={ styles.listContainer }
			data={ props.places }
			renderItem={ data => (
				<ItemList
					placeImage={ data.item.image }
					placeName={ data.item.placeName }
					onItemPressed={ () => props.onSelectItem(data.item.id) }
				/>
			)}
		/>
	)
};

/* -------------------------------------------------------------------------
   - set a style
------------------------------------------------------------------------- */
const styles = StyleSheet.create({
	listContainer: {
		width: '100%',
		padding: 10
	}
});

export default PlaceList;
