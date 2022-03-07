import React from 'react';
import { View, FlatList } from 'react-native';
import PlaylistItem from './playlistItem.component';

function Playlist(props: any) {
	return (
		<View>
			<FlatList
				data={props.data}
				renderItem={({ item }) => <PlaylistItem data={item}></PlaylistItem>}
				keyExtractor={(item) => `PL${item.song_id}`}
			/>
		</View>
	);
}

export default Playlist;
