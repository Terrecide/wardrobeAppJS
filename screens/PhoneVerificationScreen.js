import React, { useState, useRef } from "react";
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
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../firebase';
import firebase from 'firebase/app';
import routes from "../navigation/routes";

export default function PhoneVerificationScreen({ navigation }) {
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState();
  const [message, showMessage] = useState(undefined);
  const attemptInvisibleVerification = false; // expo firebase has bug that if this is true it will break navigation

  return (
    <KeyboardAvoidingView>
      <View style={{ padding: 20, marginTop: 50 }}>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
          attemptInvisibleVerification={attemptInvisibleVerification}
        />
        <Text style={{ marginTop: 20 }}>Enter phone number</Text>
        <TextInput
          style={{ marginVertical: 10, fontSize: 17 }}
          placeholder="+1 999 999 9999"
          autoFocus
          autoCompleteType="tel"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
        />
        <Button
          title="Send Verification Code"
          disabled={!phoneNumber}
          onPress={async () => {
            try {
              const phoneProvider = new firebase.auth.PhoneAuthProvider();
              const verificationId = await phoneProvider.verifyPhoneNumber(
                phoneNumber,
                recaptchaVerifier.current
              );
              navigation.push(routes.CODE_VERIFICATION, { verificationId: verificationId, phoneNumber: phoneNumber })
            } catch (err) {
              console.log(err);
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
        {attemptInvisibleVerification && <FirebaseRecaptchaBanner style={{ display: 'none' }} />}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({})
