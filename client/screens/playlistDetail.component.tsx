import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import SongComponent from '../song/song.component';
import styles from '../global-styles';
import { FlatList } from 'react-native-gesture-handler';
import PlayerComponent from '../song/player.component';
import songService from '../song/song.service';
import { useDispatch, useSelector } from 'react-redux';
import { SongState } from '../store/store';
import { playlistChange } from '../store/actions';

interface Props {
	route: any;
}
function PlaylistDetail({ route }: Props) {
	const playlistResponse = useSelector((state: SongState) => state.playlist);
	const dispatch = useDispatch();

	const { playlist } = route.params;
	useEffect(() => {
		songService.getPlaylist(playlist).then((res) => {
			dispatch(playlistChange(res));
		});
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.header}>{playlist}</Text>
			{playlistResponse.length ? (
				<>
					<PlayerComponent />
					<FlatList
						data={playlistResponse}
						renderItem={({ item }) => (
							<SongComponent data={item}></SongComponent>
						)}
						keyExtractor={(item) => `PL-item${item.song_id}`}
					/>
				</>
			) : (
				<Text style={styles.label}>Looking for songs...</Text>
			)}
		</View>
	);
}

export default PlaylistDetail;
