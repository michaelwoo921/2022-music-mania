import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, Text, StyleSheet, Button, Image, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { changeSong } from '../store/actions';
import images from '../images';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Song } from './song';
import { Playlist } from '../playlist/playlist';

const { create } = require('react-native-pixel-perfect');

const designResolution = {
	width: 1125,
	height: 2436,
}; // what we're designing for
const perfectSize = create(designResolution);

interface SongProps {
	data: Song | Playlist;
}

function SongComponent({ data }: SongProps) {
	const nav = useNavigation();
	const dispatch = useDispatch();

	function handlePlay() {
		dispatch(changeSong(data));
	}
	const goToSong = () => {
		nav.navigate('SongDetail', {
			song_id: data.song_id,
			title: data.title,
			artist: data.artist,
			year: data.year,
			web_url: data.web_url,
			img_url: data.img_url,
			clicks: data.clicks,
			price: data.price,
		});
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={goToSong}>
				<Image
					source={{ uri: data.artist && images[data.artist.length % 10] }}
					style={styles.image}
				/>
			</TouchableOpacity>
			<Text style={styles.title}>{data.title}</Text>
			<Text style={styles.artist}>{data.artist}</Text>
			<View style={styles.buttons}>
				<Button title="Play" onPress={handlePlay} />
				<Text> </Text>
				<Button title="Details" onPress={goToSong} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		margin: Platform.OS === 'web' ? perfectSize(10) : perfectSize(20),
		textAlign: 'center',
		borderColor: '#4BA3C3',
		borderStyle: 'solid',
		borderWidth: Platform.OS === 'web' ? perfectSize(1) : perfectSize(2),
		backgroundColor: '#0F4C5C',
		padding: Platform.OS === 'web' ? perfectSize(10) : perfectSize(20),
		fontWeight: '400',
		width: Platform.OS === 'web' ? perfectSize(800) : perfectSize(1000),
	},
	title: {
		color: '#b3ffb3',
		textAlign: 'center',
		margin: Platform.OS === 'web' ? perfectSize(10) : perfectSize(20),
		fontSize: Platform.OS === 'web' ? perfectSize(56) : perfectSize(112),
	},
	artist: {
		textAlign: 'center',
		fontStyle: 'italic',
		margin: Platform.OS === 'web' ? perfectSize(10) : perfectSize(20),
		fontSize: Platform.OS === 'web' ? perfectSize(48) : perfectSize(96),
		fontWeight: '700',
		color: '#b3ffb3',
	},
	image: {
		height: Platform.OS === 'web' ? perfectSize(200) : perfectSize(400),
		width: Platform.OS === 'web' ? perfectSize(200) : perfectSize(400),
	},
	buttons: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
});

export default SongComponent;
