import React, { useState } from 'react'
import {
    Text,
    View,
    TextInput,
    Button,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
  } from 'react-native';
import firebase from 'firebase/app'

const CodeVerificationScreen = ({ route }) => {
    const [verificationCode, setVerificationCode] = useState();
    const [message, showMessage] = useState(undefined);

    return (
        <KeyboardAvoidingView>
            <View>
                <Text style={{ marginTop: 20 }}>Потвърди код за номер: {route.params.phoneNumber}</Text>
                <Text style={{ marginTop: 20 }}>Код за потвърждение</Text>
                <TextInput
                    style={{ marginVertical: 10, fontSize: 17 }}
                    placeholder="123456"
                    onChangeText={setVerificationCode}
                />
                <Button
                    title="Потвърди код"
                    onPress={async () => {
                        try {
                            const credential = firebase.auth.PhoneAuthProvider.credential(
                                route.params.verificationId,
                                verificationCode
                            );
                            await firebase.auth().signInWithCredential(credential);
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
  
