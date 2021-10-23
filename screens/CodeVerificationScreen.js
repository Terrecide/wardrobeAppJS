import React, { useState } from 'react'
import {
    Text,
    View,
    TextInput,
    Button,
    StyleSheet,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
  } from 'react-native';
import { firebaseConfig } from '../firebase';
import firebase from 'firebase/app'
import routes from '../navigation/routes';

const CodeVerificationScreen = ({ navigation, route }) => {
    const [verificationCode, setVerificationCode] = useState();
    const [message, showMessage] = useState(undefined);

    return (
        <KeyboardAvoidingView>
            <View>
                <Text style={{ marginTop: 20 }}>Verify code for number: {route.params.phoneNumber}</Text>
                <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
                <TextInput
                    style={{ marginVertical: 10, fontSize: 17 }}
                    placeholder="123456"
                    onChangeText={setVerificationCode}
                />
                <Button
                    title="Confirm Verification Code"
                    onPress={async () => {
                        try {
                            const credential = firebase.auth.PhoneAuthProvider.credential(
                                route.params.verificationId,
                                verificationCode
                            );
                            await firebase.auth().currentUser.linkWithCredential(credential);
                            navigation.replace(routes.HOME);
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
  
