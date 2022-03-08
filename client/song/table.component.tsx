import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SongState } from '../store/store';
import { FlatList } from 'react-native-gesture-handler';
import SongComponent from './song.component';
import { thunkGetSongs } from '../store/thunks';
import { Platform, Text } from 'react-native';

const { create } = require('react-native-pixel-perfect');
const designResolution = {
  width: 1125,
  height: 2436,
};
const perfectSize = create(designResolution);

export default function TableComponent() {
  const selectSong = (state: SongState) => state.songlist;
  const songs = useSelector(selectSong);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetSongs());
  }, [dispatch]);

  return (
    <>
      {songs && songs.length ? (
        <FlatList
          data={songs}
          renderItem={({ item }) => <SongComponent data={item}></SongComponent>}
          keyExtractor={(item) => `${item.song_id}`}
        />
      ) : (
        <Text
          style={{
            fontSize: Platform.OS === 'web' ? perfectSize(24) : perfectSize(48),
            color: '#b3ffb3',
          }}
        >
          Nothing to see
        </Text>
      )}
    </>
  );
}
