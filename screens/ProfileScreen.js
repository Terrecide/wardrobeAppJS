import React, { useContext } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import AuthContext from '../auth/context';
import firebase from 'firebase/app';

const ProfileScreen = () => {
    const { user } = useContext(AuthContext);

    return (
        <View>
            <Text>Profile Screen</Text>
            <Text>Усер: {user.email}</Text>
            <Button title="Изход" onPress={async () => {
                await firebase.auth().signOut()
            }}>Изход от профил</Button>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})
