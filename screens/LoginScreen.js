import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { auth } from '../firebase';
import routes from '../navigation/routes';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        auth
        .signInWithEmailAndPassword(email, password)
        .catch(error => alert(error.message))
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.inputContainer}>
                <Text>Login to the app</Text>
                <TextInput 
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput 
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleSignIn}
                    style={styles.button}
                >
                    <Text style={styles.text}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.push(routes.REGISTER)}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.textOutline}>Have an account? Sign up!</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: 'blue',
        color: 'white',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        fontWeight: '700',
        fontSize: 16
    },
    buttonOutline: {
        backgroundColor: 'white',
        borderColor: 'blue',
        borderWidth: 2
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    },
    text: {
        color: 'white'
    },
    textOutline: {
        color: 'blue'
    }
})
