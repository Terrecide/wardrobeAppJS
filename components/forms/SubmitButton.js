import React from "react";
import { useFormikContext } from "formik";

import Button from "../Button";
import { StyleSheet } from "react-native";

function SubmitButton({ title, disabled, styles = [] }) {
  const { handleSubmit } = useFormikContext();

  return <Button title={title} style={[defaultStyles.defaultStyles, ...styles]} disabled={disabled} onPress={handleSubmit} />;
}

const defaultStyles = StyleSheet.create({
  defaultStyles: {
    alignSelf: 'center',
  }
});

export default SubmitButton;
