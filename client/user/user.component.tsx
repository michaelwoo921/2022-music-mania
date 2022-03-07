import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { thunkGetUsers } from '../store/thunks';
import { User } from './user';
import userService from './user.service';

interface UserProps {
	data: User;
}

function UserComponent({ data }: UserProps) {
	const nav = useNavigation();

	const dispatch = useDispatch();

	function handleDelete() {
		if (data.username) {
			userService.deleteByUsername(data.username).then(() => {
				dispatch(thunkGetUsers());
				nav.navigate('Home');
			});
		}
	}

	return (
		<View>
			<Text>{data.username}</Text>
			<Text>Role: {data.role}</Text>
			<Text>Credits: {data.credits}</Text>
			<Button title="Delete User" onPress={handleDelete} />
		</View>
	);
}

export default UserComponent;
