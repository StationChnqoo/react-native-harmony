import React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

export type ButtonSkin = "normal" | "bolid";
interface ButtonProps {
  style: any;
  /**
   * 点击事件
   */
  onPress: () => void;
  /**
   * Skin 按钮的皮肤
   *
   * - `solid`: 3D 立体的按钮样式，一般在大屏设备或者 iPad 上使用
   * - `normal`: 默认按钮样式
   */
  skin: "normal" | "bolid";
  /**
   * 按钮标题
   */
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  /**
   * 是否禁止按钮点击
   */
  disabled?: boolean;
}

export default class Button extends React.Component<ButtonProps> {}
