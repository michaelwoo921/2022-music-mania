/* @jest-environment jsdom */
import 'jsdom-global/register';
import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native';
import 'jest-enzyme';
import '@testing-library/jest-dom';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Song } from '../song/song';
import SongComponent from '../song/song.component';
export const add = (a: number, b: number) => a + b;

// Create a fake dom to host our react app so that Enzyme can mount things
const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
global.document = jsdom.window.document;
global.window = jsdom.window;

Enzyme.configure({ adapter: new Adapter() });

describe('add', () => {
	it('should add two numbers', () => {
		expect(add(1, 1)).toEqual(2);
	});
});

beforeAll(() => {
	useNavigation = jest.fn().mockReturnValue({ navigate: jest.fn() });
});

test('the name displays correctly', () => {
	const song = new Song();
	song.title = 'test';
	const wrapper = mount(
		<NavigationContainer>
			<SongComponent data={song}></SongComponent>
		</NavigationContainer>
	);

	expect(wrapper.props().data.title).to.equal('test');
});
