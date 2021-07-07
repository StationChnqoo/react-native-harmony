import React, { useEffect } from "react";
import PropTypes from "prop-types";

import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from "react-native";

const Button = (props) => {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={[
        defaultStyles.viewButton,
        props.hasOwnProperty("style") ? props.style : {},
      ]}
      onPress={() => {
        props.onPress();
      }}
    >
      <Text
        style={[
          defaultStyles.text,
          props.hasOwnProperty("textStyle") ? props.textStyle : {},
        ]}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  style: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  skin: PropTypes.oneOf(["solid", "normal"]),
  text: PropTypes.string.isRequired,
  textStyle: PropTypes.object,
  disabled: PropTypes.bool,
};

const defaultStyles = StyleSheet.create({
  viewButton: {
    height: 44,
    width: Dimensions.get("screen").width - 32,
    backgroundColor: "#987123",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  text: {
    fontSize: 16,
    color: "white",
  },
});

export default Button;
