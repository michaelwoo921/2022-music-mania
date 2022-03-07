import React, { useState } from 'react';
import userService from './user.service';
import { UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, loginAction } from '../store/actions';
import { Button, TextInput, Text, View, Platform } from 'react-native';
import styles from '../global-styles';
import {User} from '../user/user';

const { create } = require('react-native-pixel-perfect');
const designResolution = {
	width: 1125,
	height: 2436,
}; // what we're designing for
const perfectSize = create(designResolution);

// Function Component
interface LoginProp {
	navigation: any;
}
function LoginComponent({ navigation }: LoginProp) {
	const [error, setError] = useState({ message: '' });

	const userSelector = (state: UserState) => state.loginUser;
	const user = useSelector(userSelector);

	const dispatch = useDispatch();

	function submitForm() {
		if (user.username !== '' && user.password !== ''){
			userService
			.login(user)
			.then((res) => {
				console.log(res);
				/*
                When logged in, a new user with the same credentials is created. 
                That way, when we click the back to the home page, the previous user is no longer logged in.
            */

				dispatch(getUser(res));
				dispatch(loginAction(new User()));
				navigation.navigate('Home');
			})
			.catch((err) => setError({ message: 'Username or Password is incorrect!'}));
		}else {
			setError({message: 'Enter login credentials'});
		}


		
	}

	function registerForm() {
		navigation.navigate('Register');
	}

	return (
		<View style={styles.container}>
			{error.message !== '' && (
				<Text style={{ color: 'red' }}>{error.message}</Text>
			)}
			<Text style={styles.label}>Username: </Text>
			<TextInput
				placeholder="Username"
				style={styles.input}
				onChangeText={(value: any) =>
					dispatch(loginAction({ ...user, username: value }))
				}
				value={user.username}
			/>
			<Text style={styles.label}>Password: </Text>
			<TextInput
				placeholder="Password"
				secureTextEntry={true}
				style={styles.input}
				onChangeText={(value: any) =>
					dispatch(loginAction({ ...user, password: value }))
				}
				value={user.password}
			/>
			<View
				style={{
					margin: Platform.OS === 'web' ? perfectSize(40) : perfectSize(80),
				}}
			>
				<Button onPress={submitForm} title="Login" />
			</View>
			<View
				style={{
					margin: Platform.OS === 'web' ? perfectSize(40) : perfectSize(80),
					marginTop: 0,
				}}
			>
				<Button onPress={registerForm} title="Register" />
			</View>
		</View>
	);
}

export default LoginComponent;
