import React from 'react';
import { Pressable, Text, View, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { UserState } from '../store/store';
import styles from '../global-styles';

const { create } = require('react-native-pixel-perfect');
const designResolution = {
	width: 1125,
	height: 2436,
}; // what we're designing for
const perfectSize = create(designResolution);

interface Props {
	navigation: any;
}

function PlaylistScreen({ navigation }: Props) {
	const user = useSelector((state: UserState) => state.user);
	console.log(user.playlist);
	return (
		<View style={styles.container}>
			<Text style={styles.header}>{`${user.username}'s Playlists`}</Text>
			{user.playlist &&
				user.playlist.map((list, index) => (
					<Pressable
						key={index}
						onPress={() => {
							navigation.navigate('PlaylistDetail', { playlist: list });
						}}
						style={{
							padding:
								Platform.OS === 'web' ? perfectSize(20) : perfectSize(40),
							margin: Platform.OS === 'web' ? perfectSize(10) : perfectSize(20),
							backgroundColor: '#4BA3C3',

							borderColor: '#b3ffb3',
							borderStyle: 'solid',
							borderWidth:
								Platform.OS === 'web' ? perfectSize(1) : perfectSize(2),
							borderRadius:
								Platform.OS === 'web' ? perfectSize(5) : perfectSize(10),
						}}
					>
						<Text
							style={{ textAlign: 'center', fontSize: 32, color: '#4d243d' }}
						>
							{list}
						</Text>
						<Text style={[styles.url, { textAlign: 'center' }]}>
							Click for more...
						</Text>
					</Pressable>
				))}
		</View>
	);
}

export default PlaylistScreen;
