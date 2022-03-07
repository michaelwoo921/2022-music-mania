import React, { useState } from 'react';
import { Button, Text, View, Platform, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store/store';
import { thunkGetSongs } from '../store/thunks';
import { TouchableHighlight } from 'react-native-gesture-handler';
import styles from '../global-styles';

const { create } = require('react-native-pixel-perfect');

const designResolution = {
	width: 1125,
	height: 2436,
}; // what we're designing for
const perfectSize = create(designResolution);

function NavBarComponent() {
	const nav = useNavigation();
	const [modalVisible, setModalVisible] = useState(false);
	const user = useSelector((state: AppState) => state.user);
	const dispatch = useDispatch();
	return (
		<>
			{Platform.OS === 'web' ? (
				<View style={{ flex: 1, flexDirection: 'row' }}>
					{user && (user.role === 'employee' || user.role === 'admin') && (
						<Button
							onPress={() => {
								nav.navigate('EditUser');
							}}
							title="Manage Users"
						/>
					)}
					{user && user.username !== '' && (
						<>
							<Button
								onPress={() => {
									dispatch(thunkGetSongs);
									nav.navigate('Home');
								}}
								title="Songs"
							/>
							<Button
								onPress={() => {
									nav.navigate('ViewPlaylists');
								}}
								title="Playlists"
							/>
							<Button
								onPress={() => {
									nav.navigate('Logout');
								}}
								title="Logout"
							/>
						</>
					)}
				</View>
			) : (
				<View>
					<Modal
						animationType="slide"
						transparent={true}
						visible={modalVisible}
						onRequestClose={() => {
							setModalVisible(false);
						}}
						style={styles.container}
					>
						{user && (user.role === 'employee' || user.role === 'admin') && (
							<Button
								onPress={() => {
									nav.navigate('EditUser');
								}}
								title="Manage Users"
							/>
						)}
						{user && user.username !== '' && (
							<>
								<Button
									onPress={() => {
										dispatch(thunkGetSongs);
										nav.navigate('Home');
									}}
									title="Songs"
								/>
								<Button
									onPress={() => {
										nav.navigate('ViewPlaylists');
									}}
									title="Playlists"
								/>
								<Button
									onPress={() => {
										nav.navigate('Piano');
									}}
									title="Piano"
								/>
								<Button
									onPress={() => {
										nav.navigate('Logout');
									}}
									title="Logout"
								/>
							</>
						)}
						<Button
							onPress={() => {
								setModalVisible(!modalVisible);
							}}
							title="Hide Menu"
						/>
					</Modal>
					{user && user.username !== '' && (
						<TouchableHighlight
							style={{
								backgroundColor: 'rgb(0, 151, 240)',
								borderRadius: 20,
								padding: perfectSize(20),
								elevation: 2,
							}}
							onPress={() => {
								setModalVisible(true);
							}}
						>
							<Text
								style={[
									styles.url,
									{ textAlign: 'center', fontSize: perfectSize(50) },
								]}
							>
								Show Menu
							</Text>
						</TouchableHighlight>
					)}
				</View>
			)}
		</>
	);
}

export default NavBarComponent;
