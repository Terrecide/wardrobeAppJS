import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from 'expo-app-loading';

import navigationTheme from "./navigation/navigationTheme";
import AppNavigator from "./navigation/AppNavigator";
import AuthNavigator from "./navigation/AuthNavigator";
import AuthContext from "./auth/context";
import { navigationRef } from "./navigation/rootNavigation";
import useFonts from "./hooks/useFonts";
import { auth } from './firebase';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
    setLoading(false);
  }

  const loadFonts = () => {
    useFonts();
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    loadFonts();
    return subscriber;
   }, []);

  if (loading) {
    return <AppLoading />;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}