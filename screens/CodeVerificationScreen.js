import React, { useState } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
  } from 'react-native';
import firebase from 'firebase/app';
import { auth } from '../firebase';
import AppText from "../components/Text";
import TextInput from "../components/TextInput";
import AppButton from '../components/Button';

const CodeVerificationScreen = ({ route }) => {
    const [verificationCode, setVerificationCode] = useState();
    const [message, showMessage] = useState(undefined);

    return (
        <KeyboardAvoidingView style={{padding: 10}}>
            <View style={{alignItems: 'center'}}>
                <AppText style={{ fontWeight: 'bold' }}>Кодът е изпратен на номер: {route.params.phoneNumber}</AppText>
                <TextInput
                    placeholder="123456"
                    onChangeText={setVerificationCode}
                />
                <AppButton
                    disabled={!verificationCode}
                    title="Потвърди код"
                    onPress={async () => {
                        try {
                            const credential = firebase.auth.PhoneAuthProvider.credential(
                                route.params.verificationId,
                                verificationCode
                            );
                            await auth.signInWithCredential(credential);
                        } catch (err) {
                            showMessage({ text: `Error: ${err.message}`, color: 'red' });
                        }
                    }}
                />
                {message ? (
                    <TouchableOpacity
                    style={[
                        StyleSheet.absoluteFill,
                        { backgroundColor: 0xffffffee, justifyContent: 'center' },
                    ]}
                    onPress={() => showMessage(undefined)}>
                    <Text
                        style={{
                        color: message.color || 'blue',
                        fontSize: 17,
                        textAlign: 'center',
                        margin: 20,
                        }}>
                        {message.text}
                    </Text>
                    </TouchableOpacity>
                ) : (
                    undefined
                )}
            </View>
        </KeyboardAvoidingView>
    )
}

export default CodeVerificationScreen

const styles = StyleSheet.create({})
  
