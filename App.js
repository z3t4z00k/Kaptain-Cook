import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens'

import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import MealsNavigator from "./navigation/MealsNavigation"

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import mealsReducer from './state/meals/reducers'

enableScreens()

const rootReducer = combineReducers({
	'meals': mealsReducer
})

const store = createStore(rootReducer)

let fonts = {
	'lato-black': require('./assets/Fonts/Lato-Black.ttf'),
	'lato-bold': require('./assets/Fonts/Lato-Bold.ttf'),
	'lato-italic': require('./assets/Fonts/Lato-Italic.ttf'),
	'lato-light': require('./assets/Fonts/Lato-Light.ttf'),
	'lato-regular': require('./assets/Fonts/Lato-Regular.ttf'),
	'lato-semi-bold': require('./assets/Fonts/Lato-Thin.ttf')
};

export default function App() {

	const [dataLoaded, setDataLoaded] = useState(false)

	const loadFonts = async () => {
		await Font.loadAsync(fonts)
		setDataLoaded(true)
	}

	useEffect(() => {
		loadFonts()
	}, [])

	return (
		(dataLoaded
			?
			<Provider store={store}><MealsNavigator /></Provider>
			:
			<AppLoading />
		)
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
