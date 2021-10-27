import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import firebase from 'firebase/app';
import routes from './routes';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    let initialRoute = firebase.auth().currentUser.providerData.some(provider => provider.providerId === 'password') ? routes.HOME : routes.REGISTER;

    return (
        <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen name={routes.REGISTER} component={RegisterScreen} options={{ headerShown: false }}/>
            <Stack.Screen name={routes.HOME} component={HomeScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
}

export default AppNavigator
