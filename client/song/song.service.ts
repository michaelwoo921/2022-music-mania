import axios from 'axios';
import { Playlist } from '../playlist/playlist';
import { Song } from './song';

interface Query {
	artist?: string;
	title?: string;
}

interface Clicks {
	clicks: number;
}

class SongService {
	private URI: any;
	constructor() {
		// URL of the express server
		this.URI = 'https://socqhojy48.execute-api.us-west-2.amazonaws.com/dev/';
	}

	getSongs(): Promise<Song[]> {
		return axios
			.get(this.URI + 'songs')
			.then((result) => {
				return result.data;
			})
			.catch((err) => {
				console.error(err);
			});
	}

	// addSong(s: Song): Promise<null> {
	// 	return axios.post(this.URI + 'songs', s).then((result) => null);
	// }

	// updateSong(s: Song): Promise<null> {
	// 	return axios.put(this.URI + 'songs', s).then((result) => null);
	// }

	deleteSong(song_id: number): Promise<null> {
		return axios
			.delete(this.URI + 'songs' + '/' + song_id)
			.then((result) => null);
	}

	searchSongs(query: Query): Promise<Song[]> {
		return axios
			.post(
				'https://1bt2tfiy3m.execute-api.us-west-2.amazonaws.com/dev/search/',
				query
			)
			.then((result) => result.data);
	}

	updateClicks(song_id: number, clicks: Clicks): Promise<null> {
		return axios
			.put(this.URI + `clicks/${song_id}`, clicks)
			.then((result) => null);
	}

	getPlaylist(playlist_name: string): Promise<any> {
		let encoded_playlist_name = encodeURIComponent(playlist_name);
		return axios
			.get(this.URI + `playlists/${encoded_playlist_name}`)
			.then((result) => {
				return result.data;
			})
			.catch((err) => {
				console.error(err);
			});
	}

	//for endpoint that adds playlist item to database
	addToPlaylist(playlist: Playlist): Promise<null> {
		return axios.post(this.URI + 'playlists', playlist).then((res) => null);
	}
} // end of SongService

export default new SongService();
