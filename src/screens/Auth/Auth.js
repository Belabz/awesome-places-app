import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	ImageBackground,
	Dimensions,
	KeyboardAvoidingView,
	Keyboard,
	TouchableWithoutFeedback,
	ActivityIndicator } from 'react-native';

import { connect } from 'react-redux';
// import startTabs from '../MainTabs/StartMainTabs';
import { tryAuth, authAutoSignIn } from '../../store/actions'
import InputUi from '../../components/Ui/Input/Input';
import ButtonUi from '../../components/Ui/Button/ButtonUi';
import HeadingText from '../../components/Ui/HeadingText/HeadingText';
import formValidation from '../../utility/formValidation';
import backgroundImage from '../../assets/bg.jpg';

class AuthScreen extends Component {
	// init the state for view mode: portrait or landscape
	state = {
		viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
		authMode: 'login',
		controls: {
			email: { value: '', valid: false, rules: { isEmail: true }, touched: false },
			password: { value: '', valid: false, rules: { minLength: 6 }, touched: false },
			confirmPassword: { value: '', valid: false, rules: { equalTo: 'password' }, touched: false }
		}
	};

	constructor(props) {
		super(props);
		Dimensions.addEventListener('change', this.switchModeView)
	}

	// unmount the event listener to not create a memory leak
	componentWillUnmount() {
		Dimensions.removeEventListener('change', this.switchModeView)
	}

	// execute this function while the app is mounting
	componentWillMount() {
		this.props.onAutoSignIn()
	}

	// switch mode method
	switchModeView = dims => {
		this.setState({ viewMode: dims.window.height > 500 ? 'portrait' : 'landscape' })
	};

	/* -------------------------------------------------------------------------
	   - switch auth mode handler
	------------------------------------------------------------------------- */
	authModeHandler = () => {
		this.setState(prevState => {
			return {
				authMode: prevState.authMode === 'login' ? 'signup' : 'login'
			}
		})
	};

	/* -------------------------------------------------------------------------
	   - auth (login / sign up) handler
	------------------------------------------------------------------------- */
	authHandler = () => {
		const authData = {
			email: this.state.controls.email.value,
			password: this.state.controls.password.value
		};
		this.props.onAuth(authData, this.state.authMode);

		// startTabs()
	};

	/* -------------------------------------------------------------------------
	   - controls and validation handler
	------------------------------------------------------------------------- */
	inputChangeState = (key, value) => {
		// list the connected value
		let connectedValue = {};

		if (this.state.controls[key].rules.equalTo) {
			// get the equal to value (the connected property)
			const equalToControl = this.state.controls[key].rules.equalTo;

			// the the value of the equaled to property's value
			const equalToValue = this.state.controls[equalToControl].value;

			connectedValue = {
				...connectedValue,
				equalTo: equalToValue
			}
		}

		// TODO: (code part 1/2) recheck this code to make it simpler for password checking rule
		if (key === 'password') {
			connectedValue = {
				...connectedValue,
				equalTo: value
			}
		}

		// update the previous state immutably
		this.setState(prevState => {
			return {
				controls: {
					...prevState.controls,

					// TODO: (code part 2/2) recheck this code to make it simpler for password checking rule
					confirmPassword: {
						...prevState.controls.confirmPassword,
						valid:
							key === 'password' ? formValidation(
								prevState.controls.confirmPassword.value,
								prevState.controls.confirmPassword.rules,
								connectedValue
							) : prevState.controls.confirmPassword.valid
					},

					[key]: {
						...prevState.controls[key],
						value: value,
						valid: formValidation(value, prevState.controls[key].rules, connectedValue),
						touched: true
					}
				}
			}
		})
	};

	render() {
		let headingText = null;
		let confirmPasswordControl = null;

		if (this.state.viewMode === 'portrait') {
			headingText = (
				<HeadingText>Please { this.state.authMode === 'login' ? 'Login' : 'Sign up' }</HeadingText>
			)
		}

		if (this.state.authMode === 'signup') {
			confirmPasswordControl = (
				<View style={ this.state.viewMode === 'portrait' ? styles.prtPassWrapper : styles.lsPassWrapper }>
					<InputUi
						secureTextEntry
						placeholder="Repeat Password"
						style={ styles.input }
						value={ this.state.controls.confirmPassword.value }
						onChangeText={ (value) => this.inputChangeState('confirmPassword', value) }
						valid={ this.state.controls.confirmPassword.valid }
						touched={ this.state.controls.confirmPassword.touched }
					/>
				</View>
			)
		}

		/* -------------------------------------------------------------------------
		   - submit button condition
		------------------------------------------------------------------------- */
		let submitButton = (
			<ButtonUi
				bgColor="#2A95E9"
				txtColor="white"
				onPress={ this.authHandler }
				disabled={
					!this.state.controls.email.valid ||
					!this.state.controls.password.valid ||
					!this.state.controls.confirmPassword.valid && this.state.authMode === 'signup'
				}
			>
				LOGIN
			</ButtonUi>
		);

		// show loader activity indicator if loading is true
		if (this.props.isLoading) {
			submitButton = <ActivityIndicator />
		}

		return (
			<ImageBackground source={ backgroundImage } style={ styles.bgImage }>
				<KeyboardAvoidingView behavior="padding" style={ styles.container }>
					{ headingText }

					<ButtonUi
						bgColor="#2A95E9"
						txtColor="white"
						onPress={ this.authModeHandler }
					>
						SWITCH TO { this.state.authMode === 'login' ? 'SIGN UP' : 'LOGIN' }
					</ButtonUi>

					<TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
						<View style={ styles.inputContainer }>
							<InputUi
								autoCapitalize="none"
								autoCorrect={ false }
								keyboardType="email-address"
								placeholder="your@email.com"
								style={ styles.input }
								value={ this.state.controls.email.value }
								onChangeText={ (value) => this.inputChangeState('email', value) }
								valid={ this.state.controls.email.valid }
								touched={ this.state.controls.email.touched }
							/>

							<View style={ this.state.viewMode === 'portrait' || this.state.authMode === 'login' ? styles.prtPassContainer : styles.lsPassContainer }>
								<View style={ this.state.viewMode === 'portrait' || this.state.authMode === 'login' ? styles.prtPassWrapper : styles.lsPassWrapper }>
									<InputUi
										secureTextEntry
										placeholder="Password"
										style={ styles.input }
										value={ this.state.controls.password.value }
										onChangeText={ (value) => this.inputChangeState('password', value) }
										valid={ this.state.controls.password.valid }
										touched={ this.state.controls.password.touched }
									/>
								</View>

								{ confirmPasswordControl }
							</View>
						</View>
					</TouchableWithoutFeedback>

					{ submitButton }

					{/* a small hack for android, this height allow the text field to stick a bit
					 with a margin from the keyboard */}
					<View style={{ height: 20 }} />
				</KeyboardAvoidingView>
			</ImageBackground>
		)
	}
}

const styles = StyleSheet.create({
	bgImage: {
		flex: 1
	},

	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20
	},

	inputContainer: {
		width: '100%'
	},

	input: {
		backgroundColor: 'white'
	},

	// landscape style
	lsPassContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},

	// portrait style
	prtPassContainer: {
		flexDirection: 'column',
		justifyContent: 'flex-start'
	},

	// landscape style
	lsPassWrapper: {
		width: '48%'
	},

	// portrait style
	prtPassWrapper: {
		width: '100%'
	}
});

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
const mapStateToProps = state => {
	return {
		isLoading: state.ui.isLoading
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
		onAutoSignIn: () => dispatch(authAutoSignIn())
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
