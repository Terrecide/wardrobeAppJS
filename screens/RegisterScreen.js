import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import routes from '../navigation/routes';
import firebase from 'firebase/app';

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const createAndLinkUser = async () => {
        try {
            const credential = firebase.auth.EmailAuthProvider.credential(email, password);
            await firebase.auth().currentUser.linkWithCredential(credential);
            navigation.replace(routes.FEED);
        } catch (error) {
            if(error.code === 'auth/requires-recent-login') {
                await firebase.auth().signOut();
                navigation.navigate(routes.PHONE_VERIFICATION, {requiresLogin: true});
                return;
            }
            alert(error.message);
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
        <View style={styles.inputContainer}>
            <Text>За да ползвате приложението ни трябва малко повече информация!</Text>
            <TextInput 
                placeholder="Имейл"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
            />
            <TextInput 
                placeholder="Парола"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
                style={styles.input}
            />
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={createAndLinkUser}
                style={styles.button}
            >
                <Text style={styles.text}>Регистрация</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
    )
}

export default RegisterScreen

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
        marginTop: 40
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
        color: 'blue',
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
})
