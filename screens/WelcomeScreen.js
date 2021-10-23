import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import routes from '../navigation/routes'

const WelcomeScreen = ({ navigation }) => {
    return (
        <View>
            <Text>Welcome to Wardrobe where you can sell your stuff</Text>
            <View>
                <Text>Have an account?</Text>
                <Button title="Sign In" onPress={() => navigation.push(routes.LOGIN)}>Sign in</Button>
            </View>
            <View>
                <Text>New to the platform?</Text>
                <Button title="Sign up" onPress={() => navigation.push(routes.REGISTER)}>Sign up</Button>
            </View>
        </View>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({})
