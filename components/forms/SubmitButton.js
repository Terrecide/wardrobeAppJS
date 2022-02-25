import React from "react";
import { useFormikContext } from "formik";

import Button from "../Button";
import { StyleSheet } from "react-native";

function SubmitButton({ title, disabled, style = [] }) {
  const { handleSubmit } = useFormikContext();

  return <Button title={title} style={[defaultStyles.defaultStyles, ...style]} disabled={disabled} onPress={handleSubmit} />;
}

const defaultStyles = StyleSheet.create({
  defaultStyles: {
    alignSelf: 'center',
  }
});

export default SubmitButton;
