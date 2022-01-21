import React, { useContext, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Alert } from 'react-native'
import * as Yup from "yup";
import {
    ErrorMessage,
    FormField,
    SubmitButton,
} from "../components/forms";
import AuthContext from '../auth/context';
import { Formik } from "formik";
import FormImagePicker from '../components/forms/FormImagePicker';
import { db, serverTimestamp } from '../firebase';

const AddListingScreen = () => {
    const { user } = useContext(AuthContext);
    const [creationFailed, setCreationFailed] = useState(false);

    const validationSchema = Yup.object().shape({
        images: Yup.array().min(1, "Моля изберете поне една снимка."),
        name: Yup.string().required('Полето е задължително').min(4, 'Въведете минимум 4 символа').label("Name"),
        description: Yup.string().required('Полето е задължително').min(4, 'Въведете минимум 4 символа').label("Description"),
    });

    const handleSignIn = async (data, {resetForm}) => {
        try {
            setCreationFailed(false);

            data.createdAt = serverTimestamp();
            await db.collection('listings').add(data);
            
            resetForm({ images: [], name: "", description: "", uid: user.uid });
            alert('Успешно създадохте обява.');
        } catch (error) {
            setCreationFailed(true)
            console.log("Error creating document: ", error);
            
        }
    }

    return (
        <KeyboardAvoidingView style={{padding: 10}}>
            <Formik
                initialValues={{ images: [], name: "", description: "", uid: user.uid }}
                onSubmit={handleSignIn}
                validationSchema={validationSchema}
            >
                {props => (
                    <>
                        <FormImagePicker name="images" />
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
