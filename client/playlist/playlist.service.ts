import axios from 'axios';
import Playlist from './playlist';

// require('dotenv').config()

class PlaylistService {
	private URI: any;
	constructor() {
		// URL of the express server

		this.URI =
			'https://socqhojy48.execute-api.us-west-2.amazonaws.com/dev/playlists';
	}

	getPlaylists(): Promise<Playlist[]> {
		console.log(this.URI);
		return axios
			.get(this.URI)
			.then((result) => {
				console.log('r', result);
				return result.data;
			})
			.catch((err) => {
				console.error(err);
			});
	}

	addPlaylist(p: Playlist): Promise<null> {
		return axios.post(this.URI, p).then((result) => null);
	}
	updatePlaylist(p: Playlist): Promise<null> {
		return axios.put(this.URI, p).then((result) => null);
	}

	deletePlaylist(playlist_id: number): Promise<null> {
		console.log(playlist_id);
		return axios
			.delete(this.URI + '/' + playlist_id, { withCredentials: true })
			.then((result) => null);
	}
} // end of PlaylistService

export default new PlaylistService();
