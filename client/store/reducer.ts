import * as Actions from './actions';
import { Song } from '../song/song';
import { User } from '../user/user';
import { AppState } from './store';

// We need to define the initial state of the application and that
// state should include everything that the application might keep track of.

export const initialState: AppState = {
	user: new User(),
	users: [],
	loginUser: new User(),
	userInput: new User(),
	songlist: [],
	songs: [],
	song: new Song(),
	songInput: new Song(),
	playlist: [],
	favorites: [],
};

// Make sure that the reducer has a default argument of the initial state or it will not work.
const reducer = (
	state: AppState = initialState,
	action: Actions.AppAction
): AppState => {
	// We want to call setState. (redux will do that when we return a new state object from the reducer)
	const newState = { ...state }; // If we return this, it will re render the application. (call setState)

	switch (action.type) {
		case Actions.UserActions.GetUser:
			newState.user = action.payload as User;
			newState.loginUser = new User();
			return newState;
		case Actions.UserActions.LoginChange:
			newState.loginUser = action.payload as User;
			return newState;
		case Actions.UserActions.GetAllUsers:
			newState.users = action.payload as User[];
			return newState;
		case Actions.UserActions.AddUser:
			newState.userInput = action.payload as User;
			return newState;
		case Actions.SongActions.GetSongs:
			newState.songlist = action.payload as Song[];
			console.log(newState);
			return newState;
		case Actions.SongActions.SongChange:
			newState.song = action.payload as Song;
			return newState;
		case Actions.SongActions.SongInputAction:
			newState.songInput = action.payload as Song;
			return newState;
		case Actions.SongActions.PlaylistChange:
			newState.playlist = action.payload as Song[];
			return newState;
		case Actions.SongActions.FavoritesChange:
			newState.favorites = action.payload as Song[];
			return newState;
		default:
			return state;
	}
};

export default reducer;
