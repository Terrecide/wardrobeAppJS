import React, { useContext, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import firebase from 'firebase/app';
import * as Yup from "yup";
import {
    ErrorMessage,
    FormField,
    SubmitButton,
} from "../components/forms";
import AuthContext from '../auth/context';
import { Formik } from "formik";

const AddListingScreen = () => {
    const { user } = useContext(AuthContext);
    const [creationFailed, setCreationFailed] = useState(false);

    const { serverTimestamp } = firebase.firestore.FieldValue;
    const db = firebase.firestore();
    const listingsRef = db.collection('listings');

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Полето е задължително').min(4, 'Въведете минимум 4 символа').label("Name"),
        description: Yup.string().required('Полето е задължително').min(4, 'Въведете минимум 4 символа').label("Description"),
    });

    const handleSignIn = (data, {resetForm}) => {
        setCreationFailed(false);
        data.createdAt = serverTimestamp();

        listingsRef.add(data)
        .then(() => {
            resetForm({})
            setCreationFailed(false);
            alert('Успешно създадохте обява.');
        }).catch(error => {
            console.log(error)
            setCreationFailed(true)
        })
    }

    return (
        <KeyboardAvoidingView style={{padding: 10}}>
            <Formik
                initialValues={{ name: "", description: "", uid: user.uid }}
                onSubmit={handleSignIn}
                validationSchema={validationSchema}
            >
                {props => (
                    <>
                        <FormField
                            autoCorrect={false}
                            icon="grease-pencil"
                            name="name"
                            placeholder="Име"
                            textContentType="emailAddress"
                        />
                        <FormField
                            autoCorrect={false}
                            icon="file-document-edit-outline"
                            name="description"
                            placeholder="Описание"
                            multiline={true}
                            maxLength={140}
                        />
                        <ErrorMessage
                            error="Нещо се обърка моля опитайте по-късно."
                            visible={creationFailed}
                        />
                        <SubmitButton disabled={!(props.dirty && props.isValid)} title="Създай" />
                    </>
                )}
            </Formik>
        </KeyboardAvoidingView>
    )
}

export default AddListingScreen

const styles = StyleSheet.create({})
