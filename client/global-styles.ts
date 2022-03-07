import { StyleSheet, Platform } from 'react-native';

const { create } = require('react-native-pixel-perfect');

const designResolution = {
	width: 1125,
	height: 2436,
}; // what we're designing for
const perfectSize = create(designResolution);

const styles = StyleSheet.create({
	header: {
		textAlign: 'center',
		backgroundColor: '#4BA3C3',
		borderBottomColor: '#4BA3C3',
		borderStyle: 'solid',
		borderBottomWidth:
			Platform.OS === 'web' ? perfectSize(10) : perfectSize(20),
		marginBottom: Platform.OS === 'web' ? perfectSize(40) : perfectSize(80),
		color: '#4d243d',
		padding: Platform.OS === 'web' ? perfectSize(10) : perfectSize(20),
		width: '100%',
		height: perfectSize(160),
		fontSize: perfectSize(110),
		fontWeight: '700',
	},
	input: {
		backgroundColor: '#b3ffb3',
		height: Platform.OS === 'web' ? perfectSize(40) : perfectSize(100),
		width: Platform.OS === 'web' ? perfectSize(300) : perfectSize(500),
		margin: perfectSize(10),
	},
	label: {
		color: '#b3ffb3',
		lineHeight: Platform.OS === 'web' ? perfectSize(80) : perfectSize(200),
		height: Platform.OS === 'web' ? perfectSize(80) : perfectSize(200),
		fontSize: Platform.OS === 'web' ? perfectSize(40) : perfectSize(100),
	},
	container: {
		color: '#b3ffb3',
		backgroundColor: '#0F4C5C',
		alignItems: 'center',
		fontSize: Platform.OS === 'web' ? perfectSize(16) : perfectSize(32),
		fontWeight: '400',
		width: '100%',
		height: '100%',
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'baseline',
	},
	image: {
		width: perfectSize(200),
		height: perfectSize(200),
	},
	url: {
		color: '#fef9ff',
	},
	text: { padding: Platform.OS === 'web' ? perfectSize(10) : perfectSize(20) },
	icon: { padding: Platform.OS === 'web' ? perfectSize(10) : perfectSize(20) },
	list_button: {
		padding: Platform.OS === 'web' ? perfectSize(10) : perfectSize(20),
		margin: Platform.OS === 'web' ? perfectSize(10) : perfectSize(20),
		width: Platform.OS === 'web' ? perfectSize(600) : perfectSize(800),
		fontSize: Platform.OS === 'web' ? perfectSize(40) : perfectSize(100),
		backgroundColor: '#4BA3C3',
		color: '#4d243d',
	},
});

export default styles;
