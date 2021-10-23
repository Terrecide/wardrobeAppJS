import React, { useContext } from 'react'
import { Button, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import AuthContext from '../auth/context';
import { auth } from '../firebase';
import routes from '../navigation/routes';

const HomeScreen = ({ navigation }) => {
    const { user } = useContext(AuthContext);

    return (
        <KeyboardAvoidingView>
            <View>
                <Text>Welcome to the app!</Text>
                <Text>Logged in as user: {user.email}</Text>
                <Button title="Sign Out" onPress={async () => {
                    await auth.signOut()
                }}>Sign in</Button>
            </View>
        </KeyboardAvoidingView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
