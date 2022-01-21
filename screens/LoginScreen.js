import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import * as Yup from "yup";
import {
    ErrorMessage,
    FormField,
    SubmitButton,
} from "../components/forms";
import { Formik } from "formik";
import { auth } from '../firebase';

export default function LoginScreen({ navigation }) {
    const [loginFailed, setLoginFailed] = useState(false);

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Полето е задължително').email('Въведете валиден Имейл').label("Email"),
        password: Yup.string().required('Полето е задължително').min(4, 'Въведете минимум 4 символа').label("Password"),
    });

    const handleSignIn = ({ email, password }) => {
        console.log(email, password)
        setLoginFailed(false);
        auth
        .signInWithEmailAndPassword(email, password)
        .catch(error => {
            setLoginFailed(true)
        })
    }

    return (
        <KeyboardAvoidingView style={{padding: 10}}>
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={handleSignIn}
                validationSchema={validationSchema}
            >
                {props => (
                    <>
                        <FormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="email"
                            keyboardType="email-address"
                            name="email"
                            placeholder="Имейл"
                            textContentType="emailAddress"
                        />
                        <FormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="lock"
                            name="password"
                            placeholder="Парола"
                            secureTextEntry
                            textContentType="password"
                        />
                        <ErrorMessage
                            error="Неправилен имейл и/или парола."
                            visible={loginFailed}
                        />
                        <SubmitButton disabled={!(props.dirty && props.isValid)}  title="Вход" />
                    </>
                )}
            </Formik>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center'
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
