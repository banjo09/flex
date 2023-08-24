import * as React from "react";
import { Text } from "react-native";

export function CustomText(props) {
  return (
    <Text
      {...props}
      style={[
        { fontFamily: 'regular' },
        props.style,
      ]}
    >
      {props.children}
    </Text>
  );
}
