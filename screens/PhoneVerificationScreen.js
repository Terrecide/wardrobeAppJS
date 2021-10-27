import React, { useState, useRef } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../firebase';
import firebase from 'firebase/app';
import routes from "../navigation/routes";
import { Picker } from "@react-native-picker/picker";

export default function PhoneVerificationScreen({ navigation, route }) {
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState();
  const [selectedCode, setSelectedCode] = useState("+359");
  const [message, showMessage] = useState(undefined);
  const attemptInvisibleVerification = false; // expo firebase has bug that if this is true it will break navigation

  return (
    <KeyboardAvoidingView>
      <View >
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
          attemptInvisibleVerification={attemptInvisibleVerification}
        />
        <Text >Въведете телефонният си номер!</Text>
        <Text >За да създадем вашият акаунт, ни е нужно да потвърдим вашият телефонен номер. Ние никога няма да направим тази информация публична!</Text>
        <View >
          <Picker
            selectedValue={selectedCode}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedCode(itemValue)
            }
            enabled={false}>
            <Picker.Item label="+359" value="+359" />
          </Picker>
          <TextInput
            style={{ marginVertical: 10, fontSize: 17 }}
            placeholder="99999999"
            autoFocus
            autoCompleteType="tel"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
          />
        </View>
        <Button
          title="Изпрати ми код"
          disabled={!phoneNumber}
          onPress={async () => {
            try {
              const phoneProvider = new firebase.auth.PhoneAuthProvider();
              const verificationId = await phoneProvider.verifyPhoneNumber(
                selectedCode+phoneNumber,
                recaptchaVerifier.current
              );
              const params = { 
                verificationId: verificationId, 
                phoneNumber: selectedCode+phoneNumber
              };
              navigation.push(routes.CODE_VERIFICATION, params);
            } catch (err) {
              console.log(err);
              showMessage({ text: `Error: ${err.message}`, color: 'red' });
            }
          }}
        />

        {route.params && route.params.requiresLogin ? (
          <Text
            style={{
              color: 'blue',
              fontSize: 17,
              textAlign: 'center',
              margin: 20,
            }}>
            Моля потвърдете отново вашият телефон.
          </Text>
        ): (
            undefined
        )}
        
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
