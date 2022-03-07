import { User } from './../user/user';
import { Song } from './../song/song';
import { Playlist } from '../playlist/playlist';

export enum UserActions {
	GetUser = 'GET_USER',
	LoginChange = 'CHANGE_LOGIN',
	GetAllUsers = 'GET_ALL_USERS',
	AddUser = 'ADD_USER',
}

export enum SongActions {
	GetSongs = 'GET_SONGS',
	SongChange = 'CHANGE_SONG',
	SongInputAction = 'SONG_INPUT_ACTION',
	PlaylistChange = 'PLAYLIST_CHANGE',
	FavoritesChange = 'FAVORITES_CHANGE',
}

export interface AppAction {
	type: string;
	payload: any;
}

export interface UserAction extends AppAction {
	type: UserActions;
	payload: User | User[];
}

export interface SongAction extends AppAction {
	type: SongActions;
	payload: Song | Song[] | Playlist | Playlist[][];
}

export function getUser(user: User): UserAction {
	const action: UserAction = {
		type: UserActions.GetUser,
		payload: user,
	};
	return action;
}

export function addUser(user: User): UserAction {
	const action: UserAction = {
		type: UserActions.AddUser,
		payload: user,
	};
	return action;
}

export function loginAction(user: User): UserAction {
	const action: UserAction = {
		type: UserActions.LoginChange,
		payload: user,
	};
	return action;
}

export function getAllUsers(users: User[]): UserAction {
	const action: UserAction = {
		type: UserActions.GetAllUsers,
		payload: users,
	};
	return action;
}

export function getSongs(songs: Song[]): SongAction {
	const action: SongAction = {
		type: SongActions.GetSongs,
		payload: songs,
	};
	return action;
}

export function changeSong(song: Song | Playlist): SongAction {
	const action: SongAction = {
		type: SongActions.SongChange,
		payload: song,
	};
	return action;
}

export function songInputAction(song: Song): SongAction {
	const action: SongAction = {
		type: SongActions.SongInputAction,
		payload: song,
	};
	return action;
}

export function playlistChange(songs: Song[]): SongAction {
	const action: SongAction = {
		type: SongActions.PlaylistChange,
		payload: songs,
	};
	return action;
}

export function favoritesChange(songs: Song[]): SongAction {
	const action: SongAction = {
		type: SongActions.FavoritesChange,
		payload: songs,
	};
	return action;
}
