// import React from 'react';
// import { View, Image, Text, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';
//
// // import the icons
// import Icon from 'react-native-vector-icons/Ionicons'
//
// const placeDetailModal = props => {
// 	let modalContent = null;
//
// 	if (props.selectedPlace) {
// 		modalContent = (
// 			<View>
// 				<Image source={ props.selectedPlace.image } style={ styles.placeImage } />
// 				<Text style={ styles.placeName }>{ props.selectedPlace.name } </Text>
// 			</View>
// 		)
// 	}
//
// 	/* -------------------------------------------------------------------------
// 	   - the onRequestClose callback is called when the user taps the hardware
// 	   back button on android or the menu button on apple Tv
// 	------------------------------------------------------------------------- */
// 	return (
// 		<Modal
// 			visible={ props.selectedPlace !== null }
// 			onRequestClose={ props.onCloseModal }
// 			animationType="slide">
// 			<View style={ styles.modalContainer }>
// 				{ modalContent }
//
// 				<View style={ styles.buttonsBlock }>
// 					{/*<Button
// 						title="Delete"
// 						onPress={ props.onDeletingPlace }
// 						color="red"
// 					/>*/}
//
// 					<TouchableOpacity onPress={ props.onDeletingPlace }>
// 						<Icon size={ 30 } name="ios-trash-outline" color='red' />
// 					</TouchableOpacity>
//
// 					<Button
// 						title="Close"
// 						onPress={ props.onCloseModal }
// 					/>
// 				</View>
// 			</View>
// 		</Modal>
// 	)
// };
//
// const styles = StyleSheet.create({
// 	modalContainer: {
// 		margin: 20
// 	},
//
// 	placeImage: {
// 		width: '100%',
// 		height: 200,
// 		marginTop: 20,
// 		marginBottom: 20
// 	},
//
// 	placeName: {
// 		fontWeight: 'bold',
// 		textAlign: 'center',
// 		fontSize: 30,
// 		marginBottom: 20
// 	},
//
// 	buttonsBlock: {
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 	}
// });
//
// export default placeDetailModal;
