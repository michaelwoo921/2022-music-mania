import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { UserState } from '../store/store';
import styles from '../global-styles';
import songService from '../song/song.service';
import { Playlist } from './playlist';
import userService from '../user/user.service';

interface Props {
	route: any;
	navigation: any;
}

function AddToPlaylist({ route, navigation }: Props) {
	const [error, setError] = useState({ message: '' });
	const [selection, setSelection] = useState<unknown>(null);
	const [textInput, setTextInput] = useState('');
	const user = useSelector((state: UserState) => state.user);

	const { song_id } = route.params;

	const handleSubmit = () => {
		let playlist_name: any;

		if (selection && selection === 'createnew') {
			playlist_name = textInput;
		} else {
			playlist_name = selection;
		}

		let newPlaylist: Playlist = {
			song_id,
			playlist_name,
		};

		//add call to API
		songService
			.addToPlaylist(newPlaylist)
			.catch((err) => setError({ message: err.message }));

		if (error.message === '' && selection === 'createnew') {
			let updatedUser = user;
			if (updatedUser.playlist) updatedUser.playlist.push(playlist_name);
			userService
				.updateUser(updatedUser)
				.then(() => {
					setError({ message: `Playlist ${playlist_name} added` });
				})
				.catch(() =>
					setError({ message: `Playlist ${playlist_name} not added` })
				);
		}

		//in .then use to go back to home
		navigation.navigate('ViewPlaylists');
	};

	return (
		<View style={styles.container}>
			{error.message !== '' && (
				<Text style={{ color: 'red' }}>{error.message}</Text>
			)}
			<Text style={styles.label}>Pick playlist: </Text>
			<View
				style={{
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Text
					style={styles.list_button}
					onPress={() => {
						setSelection('createnew');
					}}
				>
					Create new playlist
				</Text>
				{user.playlist &&
					user.playlist.map((list, index) => (
						<Text
							key={index}
							style={styles.list_button}
							onPress={() => {
								setSelection(list);
							}}
						>
							{list}
						</Text>
					))}
			</View>
			{selection === 'createnew' && (
				<View style={styles.row}>
					<Text style={styles.label}>Playlist Name: </Text>
					<TextInput
						style={styles.input}
						value={textInput}
						onChangeText={(text) => setTextInput(text)}
						placeholder="Playlist Name"
					/>
				</View>
			)}
			{selection === 'createnew' ? (
				<Text style={styles.label}>Create and add to {textInput}</Text>
			) : (
				<Text style={styles.label}>Add to {selection}</Text>
			)}
			<Button title="Submit" onPress={handleSubmit} />
		</View>
	);
}

export default AddToPlaylist;
