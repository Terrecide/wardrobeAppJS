import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import routes from '../navigation/routes';
import firebase from 'firebase/app';
import { auth } from '../firebase';
import AppText from '../components/Text'
import {
    ErrorMessage,
    FormField,
    SubmitButton,
} from "../components/forms";
import { Formik } from 'formik';
import * as Yup from "yup";
import { spacing, fontSizes } from '../config/styles';

const RegisterScreen = ({ navigation }) => {
    const [loginFailed, setLoginFailed] = useState('');

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Полето е задължително').email('Въведете валиден Имейл').label("Email"),
        password: Yup.string().required('Полето е задължително').min(6, 'Въведете минимум 6 символа').label("Password"),
        passwordConfirmation: Yup.string().required('Полето е задължително').min(6, 'Въведете минимум 6 символа').oneOf([Yup.ref('password'), null], 'Паролите трябва да съвпадат').label("Password"),
    });

    const createAndLinkUser = async ({email, password}) => {
        setLoginFailed('')
        try {
            const credential = firebase.auth.EmailAuthProvider.credential(email, password);
            await auth.currentUser.linkWithCredential(credential);
            navigation.replace(routes.HOME_TABS);
        } catch (error) {
            if(error.code === 'auth/requires-recent-login') {
                await auth.signOut();
                navigation.navigate(routes.PHONE_VERIFICATION, {requiresLogin: true});
                return;
            }
            setLoginFailed(error.message);
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <AppText style={{fontWeight: 'bold', fontSize: fontSizes.regular+1}}>За да ползвате приложението ни трябва малко повече информация!</AppText>
            <Formik
                initialValues={{ email: "", password: "", passwordConfirmation: "" }}
                onSubmit={createAndLinkUser}
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
                        <FormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="lock"
                            name="passwordConfirmation"
                            placeholder="Повторете вашата парола"
                            secureTextEntry
                            textContentType="password"
                        />
                        <ErrorMessage
                            error={loginFailed}
                            visible={loginFailed}
                        />
                        <SubmitButton style={[{marginTop: spacing.small}]} disabled={!(props.dirty && props.isValid)} title="Регистрация" />
                    </>
                )}
            </Formik>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.regular
    }
})
