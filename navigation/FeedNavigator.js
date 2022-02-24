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
            <Stack.Screen name={routes.LISTING_DETAILS} component={ListingDetailsScreen}
                options={{title: false}}
                /* how to set name as route header options={({route}) => ({ title: route.params.listingData.name})} */ 
            />
        </Stack.Navigator>
    )
};
