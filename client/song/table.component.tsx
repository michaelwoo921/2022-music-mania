import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SongState } from '../store/store';
import { FlatList } from 'react-native-gesture-handler';
import SongComponent from './song.component';
import { thunkGetSongs } from '../store/thunks';
import { Platform, Text } from 'react-native';

const { create } = require('react-native-pixel-perfect');
const designResolution = {
	width: 1125,
	height: 2436,
}; // what we're designing for
const perfectSize = create(designResolution);

export default function TableComponent() {
	// Create a constant that is of the type of state.restaurants
	const selectSong = (state: SongState) => state.songlist;
	// Retrieve the restaurants array from redux.
	const songs = useSelector(selectSong);

	const dispatch = useDispatch();

	// retrieve the initial state  from the server
	useEffect(() => {
		dispatch(thunkGetSongs());
	}, [dispatch]);

	// FlatList is a list of objects that will render only when they're on screen.
	/* 
        data - The array of data we wish to render
        renderItem- a callback function we use to render each item in the list
        keyExtractor - a callback function that assigns a key to each item in the list    
    */
	return (
		<>
			{songs && songs.length ? (
				<FlatList
					data={songs}
					renderItem={({ item }) => <SongComponent data={item}></SongComponent>}
					keyExtractor={(item) => `${item.song_id}`}
				/>
			) : (
				<Text
					style={{
						fontSize: Platform.OS === 'web' ? perfectSize(24) : perfectSize(48),
						color: '#b3ffb3',
					}}
				>
					Nothing to see
				</Text>
			)}
		</>
	);
}
