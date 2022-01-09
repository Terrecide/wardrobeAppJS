import React from "react";
import { Text } from "react-native";

import { defaultText } from "../config/styles";

function AppText({ children, style, ...otherProps }) {
  return (
    <Text style={[defaultText, style]} {...otherProps}>
      {children}
    </Text>
  );
}

export default AppText;
