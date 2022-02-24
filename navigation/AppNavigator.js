import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';
import RegisterScreen from '../screens/RegisterScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotificationsScreen from '../screens/NotificationsScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddListingScreen from '../screens/AddListingScreen';
import { Ionicons } from '@expo/vector-icons';
import FeedNavigator from './FeedNavigator';
import { auth } from '../firebase'
import { colors } from '../config/styles';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
    return (
      <Tab.Navigator screenOptions={{tabBarShowLabel: false, tabBarInactiveTintColor: colors.black }}>
        <Tab.Screen options={{tabBarIcon: ({size, color}) => <Ionicons name="home-outline" size={size} color={color} />, headerShown: false}} name={routes.FEED} component={FeedNavigator} />
        <Tab.Screen options={{tabBarIcon: ({size, color}) => <Ionicons name="search-outline" size={size} color={color} />}} name={routes.SEARCH} component={SearchScreen} />
        <Tab.Screen options={{tabBarIcon: ({size, color}) => <Ionicons name="add-circle" size={size*2} color={color} />}} name={routes.ADD_LISTING} component={AddListingScreen} />
        <Tab.Screen options={{tabBarIcon: ({size, color}) => <Ionicons name="mail-outline" size={size} color={color} />}} name={routes.NOTIFICATIONS} component={NotificationsScreen} />
        <Tab.Screen options={{tabBarIcon: ({size, color}) => <Ionicons name="person-outline" size={size} color={color} />}} name={routes.PROFILE} component={ProfileScreen} />
      </Tab.Navigator>
    );
}

const AppNavigator = () => {
    let initialRoute = auth.currentUser.providerData.some(provider => provider.providerId === 'password') ? routes.HOME_TABS : routes.REGISTER;

    return (
        <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={routes.REGISTER} component={RegisterScreen}/>
            <Stack.Screen name={routes.HOME_TABS} component={HomeTabs}/>
        </Stack.Navigator>
    )
}

export default AppNavigator
