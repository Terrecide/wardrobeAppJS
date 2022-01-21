import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import routes from "./routes";

const Stack = createStackNavigator();

export default function FeedNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name={routes.HOME} component={HomeScreen} />
            <Stack.Screen name={routes.LISTING_DETAILS} component={ListingDetailsScreen} />
        </Stack.Navigator>
    )
};
