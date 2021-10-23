import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import routes from './routes';

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={routes.WELCOME}>
            <Stack.Screen name={routes.WELCOME} component={WelcomeScreen} />
            <Stack.Screen name={routes.LOGIN} component={LoginScreen} options={{ title: '' }}/>
            <Stack.Screen name={routes.REGISTER} component={RegisterScreen} options={{ title: '' }}/>
        </Stack.Navigator>
    )
}

export default AuthNavigator
