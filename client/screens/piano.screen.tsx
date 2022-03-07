import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Audio } from 'expo-av';

interface PianoState {
	colorC: string;
	colorCs: string;
	colorD: string;
	colorDs: string;
	colorE: string;
	colorF: string;
	colorFs: string;
	colorG: string;
	colorGs: string;
	colorA: string;
	colorAs: string;
	colorB: string;
}

export default class Piano extends React.Component<{}, PianoState> {
	constructor(props: any, public sound: any) {
		super(props);

		// backgroundColor
		this.state = {
			colorC: 'white',
			colorCs: 'black',
			colorD: 'white',
			colorDs: 'black',
			colorE: 'white',
			colorF: 'white',
			colorFs: 'black',
			colorG: 'white',
			colorGs: 'black',
			colorA: 'white',
			colorAs: 'black',
			colorB: 'white',
		};

		// preload sounds
		this.sound = {};
	}

	componentDidMount() {
		Audio.setAudioModeAsync({
			allowsRecordingIOS: false,
			interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
			playsInSilentModeIOS: true,
			interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
			shouldDuckAndroid: true,
			staysActiveInBackground: true,
			// playThroughEarpieceAndroid: true,
		});

		this.sound['C'] = new Audio.Sound();
		this.sound['C'].loadAsync(
			require('../audio/C.wav'),
			{ shouldPlay: false },
			false
		);
		this.sound['Cs'] = new Audio.Sound();
		this.sound['Cs'].loadAsync(
			require('../audio/Cs.wav'),
			{ shouldPlay: false },
			false
		);
		this.sound['D'] = new Audio.Sound();
		this.sound['D'].loadAsync(
			require('../audio/D.wav'),
			{ shouldPlay: false },
			false
		);

		this.sound['Ds'] = new Audio.Sound();
		this.sound['Ds'].loadAsync(
			require('../audio/Ds.wav'),
			{ shouldPlay: false },
			false
		);
		this.sound['E'] = new Audio.Sound();
		this.sound['E'].loadAsync(
			require('../audio/E.wav'),
			{ shouldPlay: false },
			false
		);
		this.sound['F'] = new Audio.Sound();
		this.sound['F'].loadAsync(
			require('../audio/F.wav'),
			{ shouldPlay: false },
			false
		);
		this.sound['Fs'] = new Audio.Sound();
		this.sound['Fs'].loadAsync(
			require('../audio/Fs.wav'),
			{ shouldPlay: false },
			false
		);
		this.sound['G'] = new Audio.Sound();
		this.sound['G'].loadAsync(
			require('../audio/G.wav'),
			{ shouldPlay: false },
			false
		);
		this.sound['Gs'] = new Audio.Sound();
		this.sound['Gs'].loadAsync(
			require('../audio/Gs.wav'),
			{ shouldPlay: false },
			false
		);
		this.sound['A'] = new Audio.Sound();
		this.sound['A'].loadAsync(
			require('../audio/A.wav'),
			{ shouldPlay: false },
			false
		);
		this.sound['As'] = new Audio.Sound();
		this.sound['As'].loadAsync(
			require('../audio/As.wav'),
			{ shouldPlay: false },
			false
		);
		this.sound['B'] = new Audio.Sound();
		this.sound['B'].loadAsync(
			require('../audio/B.wav'),
			{ shouldPlay: false },
			false
		);
	}

	render() {
		return (
			<View style={styles.container}>
				<View
					style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}
				>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<View
							style={{
								backgroundColor: 'white',
								height: 100,
								width: 32,
								borderLeftWidth: 1,
								borderTopWidth: 1,
							}}
						></View>

						<View
							onTouchStart={() => this.sound['Cs'].playAsync()}
							onTouchEnd={() => {
								this.setState({ colorCs: 'black' });
								this.sound['Cs'].stopAsync();
							}}
							style={{
								backgroundColor: this.state.colorCs,
								height: 100,
								width: 32,
								borderTopWidth: 1,
								borderLeftWidth: 1,
							}}
						></View>

						<View
							style={{
								backgroundColor: 'white',
								height: 100,
								width: 16,
								borderTopWidth: 1,
							}}
						></View>

						<View
							onTouchStart={() => this.sound['Ds'].playAsync()}
							onTouchEnd={() => {
								this.setState({ colorDs: 'black' });
								this.sound['Ds'].stopAsync();
							}}
							style={{
								backgroundColor: this.state.colorDs,
								height: 100,
								width: 32,
								borderTopWidth: 1,
								borderLeftWidth: 1,
							}}
						></View>

						<View
							style={{
								backgroundColor: 'white',
								height: 100,
								width: 32,
								borderTopWidth: 1,
							}}
						></View>

						<View
							style={{
								backgroundColor: 'white',
								height: 100,
								width: 32,
								borderTopWidth: 1,
								borderLeftWidth: 1,
							}}
						></View>

						<View
							onTouchStart={() => this.sound['Fs'].playAsync()}
							onTouchEnd={() => {
								this.setState({ colorFs: 'black' });
								this.sound['Fs'].stopAsync();
							}}
							style={{
								backgroundColor: this.state.colorFs,
								height: 100,
								width: 32,
								borderTopWidth: 1,
							}}
						></View>

						<View
							style={{
								backgroundColor: 'white',
								height: 100,
								width: 16,
								borderTopWidth: 1,
							}}
						></View>

						<View
							onTouchStart={() => this.sound['Gs'].playAsync()}
							onTouchEnd={() => {
								this.setState({ colorGs: 'black' });
								this.sound['Gs'].stopAsync();
							}}
							style={{
								backgroundColor: this.state.colorGs,
								height: 100,
								width: 32,
								borderTopWidth: 1,
							}}
						></View>

						<View
							style={{
								backgroundColor: 'white',
								height: 100,
								width: 16,
								borderTopWidth: 1,
							}}
						></View>

						<View
							onTouchStart={() => this.sound['As'].playAsync()}
							onTouchEnd={() => {
								this.setState({ colorAs: 'black' });
								this.sound['As'].stopAsync();
							}}
							style={{
								backgroundColor: this.state.colorAs,
								height: 100,
								width: 32,
								borderTopWidth: 1,
							}}
						></View>

						<View
							style={{
								backgroundColor: 'white',
								height: 100,
								width: 32,
								borderRightWidth: 1,
								borderTopWidth: 1,
							}}
						></View>
					</View>

					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<View
							onTouchStart={() => this.sound['C'].playAsync()}
							onTouchEnd={() => {
								this.setState({ colorC: 'white' });
								this.sound['C'].stopAsync();
							}}
							style={{
								backgroundColor: this.state.colorC,
								height: 100,
								width: 48,
								borderBottomWidth: 1,
								borderLeftWidth: 1,
							}}
						></View>

						<View
							onTouchStart={() => this.sound['D'].playAsync()}
							onTouchEnd={() => {
								this.setState({ colorD: 'white' });
								this.sound['D'].stopAsync();
							}}
							style={{
								backgroundColor: this.state.colorD,
								height: 100,
								width: 48,
								borderBottomWidth: 1,
								borderLeftWidth: 1,
							}}
						></View>

						<View
							onTouchStart={() => this.sound['E'].playAsync()}
							onTouchEnd={() => {
								this.setState({ colorE: 'white' });
								this.sound['E'].stopAsync();
							}}
							style={{
								backgroundColor: this.state.colorE,
								height: 100,
								width: 48,
								borderBottomWidth: 1,
								borderLeftWidth: 1,
							}}
						></View>

						<View
							onTouchStart={() => this.sound['F'].playAsync()}
							onTouchEnd={() => {
								this.setState({ colorF: 'white' });
								this.sound['F'].stopAsync();
							}}
							style={{
								backgroundColor: this.state.colorF,
								height: 100,
								width: 48,
								borderBottomWidth: 1,
								borderLeftWidth: 1,
							}}
						></View>

						<View
							onTouchStart={() => this.sound['G'].playAsync()}
							onTouchEnd={() => {
								this.setState({ colorG: 'white' });
								this.sound['G'].stopAsync();
							}}
							style={{
								backgroundColor: this.state.colorG,
								height: 100,
								width: 48,
								borderBottomWidth: 1,
								borderLeftWidth: 1,
							}}
						></View>

						<View
							onTouchStart={() => this.sound['A'].playAsync()}
							onTouchEnd={() => {
								this.setState({ colorA: 'white' });
								this.sound['A'].stopAsync();
							}}
							style={{
								backgroundColor: this.state.colorA,
								height: 100,
								width: 48,
								borderBottomWidth: 1,
								borderLeftWidth: 1,
							}}
						></View>

						<View
							onTouchStart={() => this.sound['B'].playAsync()}
							onTouchEnd={() => {
								this.setState({ colorB: 'white' });
								this.sound['B'].stopAsync();
							}}
							style={{
								backgroundColor: this.state.colorB,
								height: 100,
								width: 48,
								borderBottomWidth: 1,
								borderLeftWidth: 1,
								borderRightWidth: 1,
							}}
						></View>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#0F4C5C',
		flexDirection: 'row',
	},
});
