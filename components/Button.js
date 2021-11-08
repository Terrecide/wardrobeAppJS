import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { colors, fontSizes, paddings } from "../config/styles";

function AppButton({ style, title, onPress, type = "primary" }) {
  return (
    <TouchableOpacity
      style={[type === "primary" ? styles.buttonPrimary : styles.buttonSecondary, style]}
      onPress={onPress}
    >
      <Text style={[type === "primary" ? styles.buttonPrimaryText : styles.buttonSecondaryText, style]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    buttonPrimary: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        paddingVertical: paddings.small,
        borderColor: colors.primary,
        borderWidth: 1,
        borderRadius: 2
    },
    buttonPrimaryText: {
        color: colors.darkgrey,
        fontSize: fontSizes.large,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    buttonSecondary: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.darkgrey,
        paddingVertical: paddings.small,
        borderColor: colors.black,
        borderWidth: 1,
        borderRadius: 2
    },
    buttonSecondaryText: {
        color: colors.primary,
        fontSize: fontSizes.large,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
});

export default AppButton;