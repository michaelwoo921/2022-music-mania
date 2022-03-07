import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { User } from '../user/user';
import { Song } from '../song/song';
import { AppAction } from './actions';
import reducer from './reducer';
import { Playlist } from '../playlist/playlist';

// Define the items that are in our state

export interface UserState {
	user: User;
	loginUser: User;
	locale?: string;
	users: User[];
	userInput: User;
}

export interface SongState {
	songlist: Song[];
	songs: Song[];
	song: Song | Playlist;
	songInput: Song;
	playlist: Song[];
	favorites: Song[];
}

export interface AppState extends UserState, SongState {}
// <> is generics: Generic arguments allow us to define the type of a thing at runtime instead of when we write it,
// creating a reusable object.
const store: Store<AppState, AppAction> = createStore(
	reducer,
	applyMiddleware(thunk)
);

export default store;
