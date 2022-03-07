import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types';
import { useDispatch } from 'react-redux';
import { getUser } from '../store/actions';
import { Song } from '../song/song';
import userService from '../user/user.service';
import NavBarComponent from './navbar.component';
import LoginComponent from '../user/login.component';
import RegisterComponent from '../user/register.component';
import HomeScreen from '../screens/home.screen';
import LogoutComponent from '../user/logout.component';
import SongDetail from '../screens/songDetail.screen';
import AddToPlaylist from '../playlist/AddToPlaylist';
import PlaylistScreen from '../screens/playlist.screen';
import PlaylistDetail from '../screens/playlistDetail.component';
import AddDeleteUserComponent from '../user/add.delete.component';
import Piano from '../screens/piano.screen';

/* Parameter list for RouteProp requires a field for the route that we're on. */
export type StackParams = {
	Login: undefined;
	GetUsers: undefined;
	SongDetail: Song;
	Songs: undefined;
	EditUser: undefined;
	Home: undefined;
	Register: undefined;
	AddToPlaylist: undefined;
	ViewPlaylists: undefined;
	PlaylistDetail: undefined;
	Piano: undefined;
	ViewUsers: undefined;
	Logout: undefined;
};

const Stack = createStackNavigator<StackParams>();
const headerOptions: StackHeaderOptions = {
	headerTitle: () => <Text>Music Mania</Text>,
	headerRight: () => <NavBarComponent />,
};
function RouterComponent(props: any) {
	const dispatch = useDispatch();
	useEffect(() => {
		userService
			.getLogin()
			.then((user) => {
				console.log(user);
				dispatch(getUser(user));
			})
			.catch((error) => console.log(error));
	}, [dispatch, props.navigation]);
	return (
		<Stack.Navigator initialRouteName="Login">
			<Stack.Screen
				name="Login"
				component={LoginComponent}
				options={headerOptions}
			/>
			<Stack.Screen
				name="EditUser"
				component={AddDeleteUserComponent}
				options={headerOptions}
			/>
			<Stack.Screen
				name="Home"
				component={HomeScreen}
				options={headerOptions}
			/>
			<Stack.Screen
				name="SongDetail"
				component={SongDetail}
				options={headerOptions}
			/>
			<Stack.Screen
				name="Register"
				component={RegisterComponent}
				options={headerOptions}
			/>
			<Stack.Screen
				name="AddToPlaylist"
				component={AddToPlaylist}
				options={headerOptions}
			/>
			<Stack.Screen
				name="ViewPlaylists"
				component={PlaylistScreen}
				options={headerOptions}
			/>
			<Stack.Screen
				name="PlaylistDetail"
				component={PlaylistDetail}
				options={headerOptions}
			/>
			<Stack.Screen name="Piano" component={Piano} options={headerOptions} />
			<Stack.Screen
				name="Logout"
				component={LogoutComponent}
				options={headerOptions}
			/>
		</Stack.Navigator>
	);
}

export default RouterComponent;
