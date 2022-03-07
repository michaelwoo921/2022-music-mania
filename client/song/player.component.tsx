import React, { useEffect, useRef, useState } from 'react';
import {
	Animated,
	Text,
	Pressable,
	View,
	Image,
	StyleSheet,
	Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changeSong, getSongs } from '../store/actions';
import { SongState } from '../store/store';
import { Song } from './song';
import songService from './song.service';
import Playlist from '../playlist/playlist.component';

const { create } = require('react-native-pixel-perfect');
const designResolution = {
	width: 1125,
	height: 2436,
}; // what we're designing for
const perfectSize = create(designResolution);

function PlayerComponent() {
	const [error, setError] = useState({ message: '' });
	const [isPlaying, setPlay] = useState(false);
	const [isStopped, setStop] = useState(false);
	const [volume, setVolume] = useState(true);
	const [playlistIndex, setIndex] = useState(0);
	const [showPlaylist, setShowPlaylist] = useState(false);
	const selectSong = (state: SongState) => state.song;
	const song = useSelector(selectSong);
	const selectPlaylist = (state: SongState) => state.playlist;
	const playlist = useSelector(selectPlaylist);
	const dispatch = useDispatch();

	//set up display animation

	const flickerAnimation = useRef(new Animated.Value(0)).current;

	// Will change blink display value to 1 in 3 seconds continuously

	useEffect(() => {
		Animated.loop(
			Animated.timing(flickerAnimation, {
				toValue: 5,
				duration: 1000,
				delay: 1000,
				useNativeDriver: Platform.OS === 'web' ? false : true,
			}),
			{ iterations: -1 }
		).start();
	}, [flickerAnimation]);

	const addClick = async () => {
		let { clicks } = song;
		let newClicks;
		if (clicks) newClicks = { clicks: clicks + 1 };

		if (song.song_id && newClicks) {
			await songService
				.updateClicks(song.song_id, newClicks)
				.catch((err) => setError({ message: err.message }));
			await songService.getSongs().then((res) => {
				dispatch(getSongs(res));
			});
		}
	};

	useEffect(() => {
		if (song.title !== '') {
			addClick();
			setPlay(true);
		}
	}, [song]);

	const play = () => {
		setPlay(false);
		if (playlist.length === 0 || isStopped) {
			dispatch(changeSong(new Song()));
		}
		if (playlist.length) {
			handleNext();
		}
	};

	let playTO: NodeJS.Timeout;

	useEffect(() => {
		if (isPlaying === true && song.title !== '') {
			playTO = setTimeout(() => play(), 15000);
		} else {
			clearTimeout(playTO);
		}
	}, [isPlaying]);

	const handlePrevious = () => {
		if (playlist.length) {
			if (playlistIndex === 0) {
				dispatch(changeSong(playlist[playlist.length - 1]));
				setIndex(playlist.length - 1);
			} else {
				dispatch(changeSong(playlist[playlistIndex - 1]));
				setIndex(playlistIndex - 1);
			}
		}
	};

	const handleNext = () => {
		if (playlist.length) {
			if (playlistIndex === playlist.length - 1) {
				dispatch(changeSong(playlist[0]));
				setIndex(0);
			} else {
				dispatch(changeSong(playlist[playlistIndex + 1]));
				setIndex(playlistIndex + 1);
			}
		}
	};

	return (
		<View style={styles.border}>
			{error && error.message !== '' && (
				<Text
					style={{
						color: 'red',
						fontSize: Platform.OS === 'web' ? perfectSize(16) : perfectSize(32),
					}}
				>
					Something went wrong. Refresh the page.
				</Text>
			)}
			{song.title !== '' ? (
				<Animated.Text
					style={[
						styles.display,
						{
							opacity: flickerAnimation,
						},
					]}
				>
					{`Playing: ${song.title} by ${song.artist}`}
				</Animated.Text>
			) : (
				<Text style={styles.nosong}>Music Mania Player</Text>
			)}
			<View style={styles.container}>
				{isPlaying === false && (
					<Pressable
						onPress={() => {
							if (song.title !== '') {
								setPlay(true);
								setStop(false);
							}
						}}
					>
						<Image
							style={styles.stretch}
							source={require('../assets/play.png')}
							accessibilityLabel="Play"
						/>
					</Pressable>
				)}
				{isPlaying && (
					<Pressable
						onPress={() => {
							clearTimeout(playTO);
							setPlay(false);
						}}
					>
						<Image
							style={styles.stretch}
							source={require('../assets/pause.png')}
							accessibilityLabel="Pause"
						/>
					</Pressable>
				)}
				<Pressable
					onPress={() => {
						clearTimeout(playTO);
						setStop(true);
						setPlay(false);
						dispatch(changeSong(new Song()));
					}}
				>
					<Image
						style={styles.stretch}
						source={require('../assets/stop.png')}
						accessibilityLabel="Stop"
					/>
				</Pressable>
				<Pressable onPress={handlePrevious}>
					<Image
						style={styles.stretch}
						source={require('../assets/previous.png')}
						accessibilityLabel="Previous Song"
					/>
				</Pressable>
				<Pressable onPress={handleNext}>
					<Image
						style={styles.stretch}
						source={require('../assets/next.png')}
						accessibilityLabel="Next Song"
					/>
				</Pressable>
				<Pressable onPress={() => setShowPlaylist(!showPlaylist)}>
					<Image
						style={styles.stretch}
						source={require('../assets/playlist.png')}
						accessibilityLabel="Show/Hide Playlist"
					/>
				</Pressable>
				{volume && (
					<Pressable onPress={() => setVolume(false)}>
						<Image
							style={styles.stretch}
							source={require('../assets/volume.png')}
							accessibilityLabel="Click to mute"
						/>
					</Pressable>
				)}
				{volume === false && (
					<Pressable onPress={() => setVolume(true)}>
						<Image
							style={styles.stretch}
							source={require('../assets/mute.png')}
							accessibilityLabel="Click to turn on volume"
						/>
					</Pressable>
				)}
			</View>
			{showPlaylist && <Playlist data={playlist} />}
		</View>
	);
}

const styles = StyleSheet.create({
	border: {
		borderColor: '#b3ffb3',
		borderStyle: 'solid',
		borderWidth: Platform.OS === 'web' ? perfectSize(1) : perfectSize(2),
		margin: Platform.OS === 'web' ? perfectSize(50) : 0,
		width: Platform.OS === 'web' ? perfectSize(900) : perfectSize(1125),
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		backgroundColor: '#4BA3C3',
		padding: Platform.OS === 'web' ? perfectSize(20) : perfectSize(40),
	},
	display: {
		backgroundColor: '#4d243d',
		color: '#b3ffb3',
		fontStyle: 'italic',
		fontWeight: '500',
		borderBottomColor: '#b3ffb3',
		borderStyle: 'solid',
		borderWidth: Platform.OS === 'web' ? perfectSize(1) : perfectSize(2),
		fontSize: Platform.OS === 'web' ? perfectSize(60) : perfectSize(120),
		padding: Platform.OS === 'web' ? perfectSize(40) : perfectSize(80),
	},
	nosong: {
		textAlign: 'center',
		backgroundColor: '#4d243d',
		color: '#b3ffb3',
		borderBottomColor: '#b3ffb3',
		borderStyle: 'solid',
		borderWidth: Platform.OS === 'web' ? perfectSize(1) : perfectSize(2),
		fontSize: Platform.OS === 'web' ? perfectSize(72) : perfectSize(154),
		padding: Platform.OS === 'web' ? perfectSize(40) : perfectSize(80),
	},
	stretch: {
		width: Platform.OS === 'web' ? perfectSize(100) : perfectSize(150),
		height: Platform.OS === 'web' ? perfectSize(100) : perfectSize(150),
	},
});

export default PlayerComponent;
