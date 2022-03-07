import React from 'react';
import { Button, Text, View, StyleSheet, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { changeSong } from '../store/actions';

const { create } = require('react-native-pixel-perfect');
const designResolution = {
	width: 1125,
	height: 2436,
}; // what we're designing for
const perfectSize = create(designResolution);

function PlaylistItem(props: any) {
	const dispatch = useDispatch();

	return (
		<View style={styles.container}>
			<Text style={styles.description}>
				{props.data.title} by {props.data.artist}
			</Text>
			<Button title="Play" onPress={() => dispatch(changeSong(props.data))} />
		</View>
	);
}

export default PlaylistItem;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: 'rgba(77, 36, 61, 0.5)',
	},
	description: {
		margin: Platform.OS === 'web' ? perfectSize(2) : perfectSize(4),
		fontSize: Platform.OS === 'web' ? perfectSize(16) : perfectSize(36),
		color: '#b3ffb3',
	},
});
