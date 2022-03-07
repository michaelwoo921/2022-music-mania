import React, { useState } from 'react';
import { Text, View, Image, Pressable, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch } from 'react-redux';
import styles from '../global-styles';
import TableComponent from '../song/table.component';
import PlayerComponent from '../song/player.component';
import { TextInput } from 'react-native-gesture-handler';
import songService from '../song/song.service';
import { getSongs } from '../store/actions';

const { create } = require('react-native-pixel-perfect');
const designResolution = {
	width: 1125,
	height: 2436,
}; // what we're designing for
const perfectSize = create(designResolution);

interface Search {
	query?: string;
	searchType?: string | null;
	text?: string;
	search?: string;
}

const HomeScreen = () => {
	const [error, setError] = useState({ message: '' });
	const [query, setQuery] = useState('');
	const [searchType, setSearch] = useState(null);

	// Get access to the dispatcher. Feed the dispatcher Actions for your Reducer.
	const dispatch = useDispatch();

	const handleSearch = () => {
		let search: any = {};
		search[searchType as any] = query;
		songService
			.searchSongs(search)
			.then((res: any) => {
				dispatch(getSongs(res));
				setQuery('');
				setSearch(null);
			})
			.catch((err: any) => setError({ message: err.stack }));
	};

	return (
		<View style={styles.container}>
			{error && error.message !== '' && <Text>error</Text>}
			<Text style={styles.header}>Welcome to Music Mania</Text>
			{Platform.OS === 'web' && (
				<View
					style={[
						styles.row,
						{ zIndex: 2, justifyContent: 'center' },
						{
							width: perfectSize(1125),
							height:
								Platform.OS === 'web' ? perfectSize(60) : perfectSize(120),
						},
					]}
				>
					<Text style={styles.label}>Search </Text>
					<TextInput
						style={[
							styles.input,
							{
								width:
									Platform.OS === 'web' ? perfectSize(500) : perfectSize(800),
								height:
									Platform.OS === 'web' ? perfectSize(60) : perfectSize(160),
							},
						]}
						placeholder="Enter an artist or song title"
						onChangeText={(text) => setQuery(text)}
						value={query}
					/>
					<Text> </Text>
					<DropDownPicker
						items={[
							{
								label: 'Artist',
								value: 'artist',
							},
							{
								label: 'Title',
								value: 'title',
							},
						]}
						defaultValue={searchType}
						placeholder="Select an type"
						containerStyle={{
							height:
								Platform.OS === 'web' ? perfectSize(60) : perfectSize(160),
							width:
								Platform.OS === 'web' ? perfectSize(300) : perfectSize(600),
							borderColor: '#4BA3C3',
							borderWidth: perfectSize(1),
							borderStyle: 'solid',
							borderRadius: perfectSize(5),
						}}
						style={{
							backgroundColor: '#4BA3C3',
						}}
						itemStyle={{
							justifyContent: 'flex-start',
						}}
						labelStyle={[
							styles.label,
							{
								lineHeight: 40,
								fontSize:
									Platform.OS === 'web' ? perfectSize(32) : perfectSize(72),
							},
						]}
						selectedLabelStyle={{
							color: '#fef9ff',
						}}
						dropDownStyle={{ backgroundColor: '#4BA3C3' }}
						onChangeItem={(item) => setSearch(item.value)}
					/>
					<Text> </Text>
					<Pressable
						style={{
							alignSelf: 'center',
							marginLeft:
								Platform.OS === 'web' ? perfectSize(10) : perfectSize(20),
							marginTop:
								Platform.OS === 'web' ? perfectSize(8) : perfectSize(16),
						}}
						onPress={() => handleSearch()}
					>
						<Image
							style={{
								height:
									Platform.OS === 'web' ? perfectSize(60) : perfectSize(160),
								width:
									Platform.OS === 'web' ? perfectSize(60) : perfectSize(160),
								backgroundColor: 'rgb(0, 151, 240)',
								borderRadius: perfectSize(5),
							}}
							accessibilityLabel="Submit Search"
							source={require('../assets/search_icon.png')}
						/>
					</Pressable>
				</View>
			)}
			<PlayerComponent />
			<TableComponent />
		</View>
	);
};

export default HomeScreen;
