import React, { useContext, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import AuthContext from '../auth/context';
import { auth } from '../firebase'
import routes from '../navigation/routes';

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(AuthContext);

    const handleSignUp = async () => {
        try {
            await auth.createUserWithEmailAndPassword(email, password);
            await auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
        <View style={styles.inputContainer}>
            <Text>Register for the app!</Text>
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
                secureTextEntry
                style={styles.input}
            />
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={handleSignUp}
                style={styles.button}
            >
                <Text style={styles.text}>Register</Text>
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
