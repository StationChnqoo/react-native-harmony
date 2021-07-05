import React, { useEffect } from "react";
import { Closure } from "react-native-harmony";
import { ModalProps } from "react-native-modal";
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
  style: PropTypes.object, // 默认样式
  onPress: PropTypes.func.isRequired, // 按钮的点击事件
  skin: PropTypes.oneOf(["solid", "normal"]), // 皮肤: 立体的 普通的
  text: PropTypes.string.isRequired, // 按钮文字
  textStyle: PropTypes.object, // 文字的样式
  disabled: PropTypes.bool, // 是否禁止点击
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
