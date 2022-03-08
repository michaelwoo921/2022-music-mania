import * as Actions from './actions';
import { Song } from '../song/song';
import { User } from '../user/user';
import { AppState } from './store';

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

const reducer = (
  state: AppState = initialState,
  action: Actions.AppAction
): AppState => {
  const newState = { ...state };

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
