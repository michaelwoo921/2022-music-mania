import React from 'react';
import userService from './user.service';
import { useDispatch } from 'react-redux';
import { getUser } from '../store/actions';
import { Button, Text, View, Platform } from 'react-native';
import styles from '../global-styles';
import { User } from './user';

const { create } = require('react-native-pixel-perfect');
const designResolution = {
	width: 1125,
	height: 2436,
}; // what we're designing for
const perfectSize = create(designResolution);

// Function Component
interface LogoutProp {
	navigation: any;
}

function LogoutComponent({ navigation }: LogoutProp) {
	const dispatch = useDispatch();

	function submitForm() {
		userService.logout().then((res) => {
			console.log(`user: ${res}`);
			navigation.navigate('Login');
		});
		console.log('Logged out');
		dispatch(getUser(new User()));
	}

	function stayLoggedIn() {
		navigation.navigate('Home');
	}

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Are you sure you want to log out?</Text>
			<View
				style={{
					margin: Platform.OS === 'web' ? perfectSize(40) : perfectSize(80),
				}}
			>
				<Button onPress={submitForm} title="Logout" />
			</View>
			<View
				style={{
					margin: Platform.OS === 'web' ? perfectSize(40) : perfectSize(80),
					marginTop: 0,
				}}
			>
				<Button onPress={stayLoggedIn} title="Cancel" />
			</View>
		</View>
	);
}

export default LogoutComponent;
