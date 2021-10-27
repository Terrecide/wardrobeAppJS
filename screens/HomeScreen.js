import React, { useContext } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import AuthContext from '../auth/context';
import firebase from 'firebase/app';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
    const { user } = useContext(AuthContext);

    return (
        <SafeAreaView>
            <View>
                <Text>Добре дошли в Wardrobe!</Text>
                <Text>Усер: {user.email}</Text>
                <Button title="Изход" onPress={async () => {
                    await firebase.auth().signOut()
                }}>Изход от профил</Button>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
