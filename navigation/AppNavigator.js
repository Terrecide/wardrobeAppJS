import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import PhoneVerificationScreen from '../screens/PhoneVerificationScreen';
import CodeVerificationScreen from '../screens/CodeVerificationScreen';
import HomeScreen from '../screens/HomeScreen';
import firebase from 'firebase/app';
import routes from './routes';

const Stack = createStackNavigator();

const AppNavigator = () => {
    let initialRoute = firebase.auth().currentUser.providerData.some(provider => provider.providerId === 'phone') ? routes.HOME : routes.PHONE_VERIFICATION;

    return (
        <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen name={routes.PHONE_VERIFICATION} component={PhoneVerificationScreen}/>
            <Stack.Screen name={routes.CODE_VERIFICATION} component={CodeVerificationScreen}  options={{ title: '' }}/>
            <Stack.Screen name={routes.HOME} component={HomeScreen}  options={{ title: '' }}/>
        </Stack.Navigator>
    )
}

export default AppNavigator
