import React from 'react'

import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createAppContainer } from 'react-navigation'

import CategoriesScreen from "../screens/CategoriesScreen"
import CategoryMealsScreen from "../screens/CategoryMealsScreen"
import FavoritesScreen from '../screens/FavoritesScreen'
import FilterScreen from '../screens/FiltersScreen'
import MealDetailsScreen from "../screens/MealDetailsScreen"

import { Ionicons } from '@expo/vector-icons'
import Colors from '../constants/Colors/light'
import { Platform } from 'react-native';

const MealsNavigator = createStackNavigator({
	Categories: CategoriesScreen,
	CategoryMeals: CategoryMealsScreen,
	MealDetails: MealDetailsScreen
})

const FavNavigator = createStackNavigator({
	Favorites: FavoritesScreen,
	MealDetails: MealDetailsScreen
})

const bottomNavBar = {
	Meals: {
		screen: MealsNavigator,
		navigationOptions: {
			tabBarIcon: (tabInfo) => {
				return <Ionicons name="ios-restaurant" size={24} color={tabInfo.tintColor} />
			},
			tabBarColor: Colors.secondary
		}
	},
	Favorites: {
		screen: FavNavigator,
		navigationOptions: {
			tabBarIcon: (tabInfo) => {
				return <Ionicons name="ios-star" size={24} color={tabInfo.tintColor} />
			},
			tabBarColor: Colors.secondary
		}
	}
}

const MealFavTabNavigator = Platform.OS === 'android' ?
	createMaterialBottomTabNavigator(
		bottomNavBar,
		{
			activeColor: Colors.blackDark,
			shifting: true,
			barStyle: { backgroundColor: Colors.white },
			labelStyle: {
				fontFamily: 'lato-regular'
			}
		})
	: createBottomTabNavigator(
		bottomNavBar,
		{
			tabBarOptions: {
				activeTintColor: Colors.primary,
				labelStyle: {
					fontFamily: 'lato-regular'
				}
			}
		}
	)

const FiltersNavigator = createStackNavigator({
		Filters: FilterScreen
	}, {
		defaultNavigationOptions: {
			tabBarColor: Colors.secondary,
		}
})

const drawerNavigator = createDrawerNavigator({
		MealsFavs: {screen: MealFavTabNavigator, navigationOptions: {drawerLabel: 'Meals'}},
		Filters: FiltersNavigator
	}, {
		contentOptions: {
			activeTintColor: Colors.primary,
			labelStyle: {
				fontFamily: 'lato-regular'
			}
		}
	}
)

export default createAppContainer(drawerNavigator)