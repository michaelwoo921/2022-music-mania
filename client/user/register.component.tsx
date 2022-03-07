import React, { useState } from 'react';
import userService from './user.service';
import { UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextInput, Text, View } from 'react-native';
import style from '../global-styles';
import { addUser } from '../store/actions';

interface RegisterProp {
	navigation: any;
}
function RegisterComponent({ navigation }: RegisterProp) {
	const [error, setError] = useState({ message: '' });
	const userSelector = (state: UserState) => state.userInput;
	const user = useSelector(userSelector);
	const dispatch = useDispatch();

	const registrationForm = () => {
		userService
			.addUser({ username: user.username, password: user.password })
			.then((res) => navigation.navigate('Login'))
			.catch((err) => setError({ message: err.message }));
	};

	return (
		<View style={style.container}>
			{error.message !== '' && (
				<Text style={{ color: 'red' }}>{error.message}</Text>
			)}
			<Text style={style.label}>Username: </Text>
			<TextInput
				placeholder="Enter Username"
				style={style.input}
				onChangeText={(value: any) =>
					dispatch(addUser({ ...user, username: value }))
				}
				value={user.username}
			/>
			<Text style={style.label}>Password: </Text>
			<TextInput
				placeholder="Enter Password"
				secureTextEntry={true}
				style={style.input}
				onChangeText={(value: any) =>
					dispatch(addUser({ ...user, password: value }))
				}
				value={user.password}
			/>
			<Button onPress={registrationForm} title="Submit" />
		</View>
	);
}

export default RegisterComponent;
