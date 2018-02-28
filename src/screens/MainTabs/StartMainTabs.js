import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
	Promise.all([
		Icon.getImageSource(Platform.OS === 'android' ? 'md-map' : 'ios-map', 30),
		Icon.getImageSource(Platform.OS === 'android' ? 'md-share' : 'ios-share', 30),
		Icon.getImageSource(Platform.OS === 'android' ? 'md-menu' : 'ios-menu', 30)
	]).then(source => {
		Navigation.startTabBasedApp({
			tabs: [
				{
					screen: 'ap.FindPlaceScreen',
					label: 'Find Place',
					title: 'Find Place',
					icon: source[0],
					navigatorButtons: {
						leftButtons: [
							{
								icon: source[2],
								title: 'Menu',
								id: 'sideDrawerToggle'
							}
						]
					},
					// top bar button color
					navigatorStyle: {
						navBarButtonColor: '#2A95E9'
					}
				},
				{
					screen: 'ap.SharePlaceScreen',
					label: 'Share Place',
					title: 'Share Place',
					icon: source[1],
					navigatorButtons: {
						leftButtons: [
							{
								icon: source[2],
								title: 'Menu',
								id: 'sideDrawerToggle'
							}
						]
					}
				},
			],
			drawer: {
				left: {
					screen: 'ap.SideDrawer'
				}
			},
			// tabs bar styling for ios
			tabsStyle: {
				tabBarBackgroundColor: 'white',
				tabBarSelectedButtonColor: '#2A95E9'
			},
			// tabs bar styling for android
			appStyle: {
				tabBarSelectedButtonColor: '#2A95E9'
			}
		})
	})
};

export default startTabs;
