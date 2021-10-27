import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from "../screens/LoginScreen";
import PhoneVerificationScreen from '../screens/PhoneVerificationScreen';
import CodeVerificationScreen from '../screens/CodeVerificationScreen';
import WelcomeScreen from "../screens/WelcomeScreen";
import routes from './routes';

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={routes.WELCOME}>
            <Stack.Screen name={routes.WELCOME} component={WelcomeScreen} options={{headerShown: false}} />
            <Stack.Screen name={routes.LOGIN} component={LoginScreen} options={{ title: '' }}/>
            <Stack.Screen name={routes.PHONE_VERIFICATION} component={PhoneVerificationScreen} options={{ title: '' }}/>
            <Stack.Screen name={routes.CODE_VERIFICATION} component={CodeVerificationScreen}  options={{ title: '' }}/>
        </Stack.Navigator>
    )
}

export default AuthNavigator
