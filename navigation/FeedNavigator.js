import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import routes from "./routes";

const Stack = createStackNavigator();

export default function FeedNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name={routes.HOME} options={{headerTitle: "Най-скорошни публикации"}} component={HomeScreen} />
        </Stack.Navigator>
    )
};
