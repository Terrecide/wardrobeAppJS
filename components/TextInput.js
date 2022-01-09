import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors, defaultText } from "../config/styles";

function AppTextInput({ icon, width = "100%", ...otherProps }) {
  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={colors.grey}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={colors.grey}
        style={defaultText}
        width={width}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
