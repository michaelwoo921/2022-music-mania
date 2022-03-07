import React, { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '../store/store';
import styles from '../global-styles';
import { thunkGetUsers } from '../store/thunks';
import UserComponent from './user.component';

function ViewAllUsersComponent() {
	const selectUsers = (state: UserState) => state.users;
	const users = useSelector(selectUsers);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(thunkGetUsers());
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Welcome to Music Mania</Text>
			{users && users.length ? (
				<FlatList
					data={users}
					renderItem={({ item }) => <UserComponent data={item}></UserComponent>}
					keyExtractor={(item) => `${item.username}`}
				/>
			) : (
				<Text>Loading</Text>
			)}
		</View>
	);
}

export default ViewAllUsersComponent;
