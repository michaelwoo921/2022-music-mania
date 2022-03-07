import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import {
	Button,
	Image,
	Linking,
	Text,
	View,
	StyleSheet,
	Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changeSong } from '../store/actions';
import { UserState } from '../store/store';
import { thunkGetSongs } from '../store/thunks';
import { Song } from '../song/song';
import songService from '../song/song.service';
import userService from '../user/user.service';

const { create } = require('react-native-pixel-perfect');
const designResolution = {
	width: 1125,
	height: 2436,
}; // what we're designing for
const perfectSize = create(designResolution);

interface Props {
	data: Song;
	route: any;
	navigation: any;
}

function SongDetail({ data, route, navigation }: Props) {
	const [error, setError] = useState({ message: '' });

	const nav = useNavigation();
	const {
		song_id,
		artist,
		title,
		year,
		web_url,
		img_url,
		clicks,
		price,
	} = route.params;

	const user = useSelector((state: UserState) => state.user);
	const dispatch = useDispatch();

	const openURL = (url: string) => {
		Linking.openURL(url).catch((err) =>
			console.error('An error occurred', err)
		);
	};

	const addFavorite = async () => {
		let found;
		if (user.favorites)
			found = user.favorites.find((fav) => fav.song_id === song_id);
		if (!found) {
			let updatedUser = user;
			if (updatedUser.favorites) {
				updatedUser.favorites.push(
					new Song(
						title,
						artist,
						year,
						web_url,
						img_url,
						clicks,
						price,
						song_id
					)
				);
			}
			await userService
				.updateUser(updatedUser)
				.then(() => {
					setError({ message: `Song favorited` });
				})
				.catch(() => {
					setError({ message: `Song not favorited` });
				});
		}
	};

	const buySong = () => {
		let updatedUser = user;
		if (updatedUser.credits) {
			updatedUser.credits -= price;
		} else {
			setError({ message: 'No credits' });
			return;
		}
		if (updatedUser.credits < 0) {
			setError({ message: 'Not enough credits' });
			return;
		}
		if (updatedUser.credits && updatedUser.bought) {
			updatedUser.bought.push(
				new Song(title, artist, year, web_url, img_url, clicks, price, song_id)
			);
		} else if (updatedUser.credits) {
			updatedUser.bought = [];
			updatedUser.bought.push(
				new Song(title, artist, year, web_url, img_url, clicks, price, song_id)
			);
		}

		userService.updateUser(updatedUser).then(() => {
			setError({ message: `Song bought for ${price} credits` });
		});
	};

	function handleDelete() {
		if (song_id) {
			songService.deleteSong(song_id).then(() => {
				dispatch(changeSong(new Song()));
				dispatch(thunkGetSongs());
				nav.navigate('Home');
			});
		}
	}

	return (
		<View style={styles.container}>
			{error.message !== '' && (
				<Text style={{ color: 'red' }}>{error.message}</Text>
			)}
			<Image source={{ uri: img_url }} accessibilityLabel={`${artist} Image`} />
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.artist}>{artist}</Text>
			<Text style={styles.year}>{year}</Text>
			<Text style={styles.year}>Clicks: {clicks}</Text>
			<Text style={styles.year}>{price}Credit(s)</Text>
			<Text
				style={styles.url}
				onPress={() => {
					openURL(web_url);
				}}
			>
				Learn More
			</Text>
			<View style={styles.buttons}>
				<Button title="Favorite" onPress={addFavorite} />
				<Text> </Text>
				<Button
					title="Add to Playlist"
					onPress={() =>
						nav.navigate('AddToPlaylist', {
							song_id,
							artist,
							title,
							year,
							web_url,
							img_url,
							clicks,
							price,
						})
					}
				/>
				<Text> </Text>
				<Button title="Buy Song" onPress={buySong} />
				{user.role === 'employee' && (
					<>
						<Text> </Text>
						<Button onPress={handleDelete} title="Delete Song" />
					</>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-evenly',
		backgroundColor: '#0F4C5C',
		textAlign: 'center',
		padding: Platform.OS === 'web' ? perfectSize(10) : perfectSize(20),
	},
	title: {
		color: '#b3ffb3',
		textAlign: 'center',
		margin: Platform.OS === 'web' ? perfectSize(20) : perfectSize(40),
		fontSize: Platform.OS === 'web' ? perfectSize(96) : perfectSize(168),
		fontWeight: '500',
	},
	artist: {
		textAlign: 'center',
		margin: Platform.OS === 'web' ? perfectSize(20) : perfectSize(40),
		fontSize: Platform.OS === 'web' ? perfectSize(72) : perfectSize(96),
		fontWeight: '700',
		color: '#b3ffb3',
	},
	year: {
		margin: Platform.OS === 'web' ? perfectSize(20) : perfectSize(40),
		fontSize: Platform.OS === 'web' ? perfectSize(48) : perfectSize(72),
		color: '#b3ffb3',
	},
	url: {
		margin: Platform.OS === 'web' ? perfectSize(5) : perfectSize(10),
		fontSize: Platform.OS === 'web' ? perfectSize(36) : perfectSize(72),
		fontStyle: 'italic',
		color: '#fef9ff',
	},
	buttons: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
});

export default SongDetail;
