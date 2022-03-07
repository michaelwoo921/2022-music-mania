import React from 'react';
import { UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Image, Button } from 'react-native';
import songService from './song.service';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { changeSong } from '../store/actions';
import { Song } from './song';
import { StackParams } from '../router/router.component';
import styles from '../global-styles';
import { thunkGetSongs } from '../store/thunks';

interface Props {
    route: RouteProp<StackParams, 'SongDetail'>;
}
export default function SongDetailComponent(props: Props) {
    const nav = useNavigation();
    // Utilize redux to retrieve the value
    // const songSelector = (state: SongState) => state.song;
    // const song = useSelector(songSelector);
    const userContext = useSelector((state: UserState) => state.user);
    const dispatch = useDispatch();

    // retrieve the value from the navigator.
    const song = props.route.params;

    function handleDelete() {
        songService.deleteSong(song.song_id).then(() => {
            dispatch(changeSong(new Song()));
            dispatch(thunkGetSongs());
            nav.navigate('Songs');
        });
    }

    return (
        <View style={styles.container}>
         
            <Text> {song.title}</Text>
            <Text >{song.clicks}</Text>
            
            <View>
                <Text>Song Item:</Text>
                {song.clicks }
                <Image source={{uri: song.img_url}} />
            </View>
            {userContext.role === 'employee' && (
                <>
                    <Button onPress={handleDelete} title='Delete Song' />
                </>
            )}
        </View>
    );
}