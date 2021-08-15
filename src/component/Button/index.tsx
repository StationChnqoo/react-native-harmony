import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextStyle,
  StyleProp,
  ViewStyle,
} from 'react-native';

import tinycolor from 'tinycolor2';

export type ButtonSkin = '2d' | '3d';

export interface ButtonProps {
  /** 按钮样式 */
  style?: ViewStyle;
  /** 点击事件 */
  onPress: () => void;
  /**
   * Skin 按钮的皮肤
   *
   * - `solid`: 3D 立体的按钮样式，一般在大屏设备或者 iPad 上使用
   * - `normal`: 默认按钮样式
   */
  skin: ButtonSkin;
  /** 按钮标题 */
  text: string;
  /** 文字标题的样式 */
  textStyle?: StyleProp<TextStyle>;
  /** 是否禁止按钮点击 */
  disabled: boolean;
  /** 3D按钮 弹起的高度 */
  elevation?: number;
}

const Button: React.FC<ButtonProps> = props => {
  const load3dButton = () => {
    return (
      <View
        style={[
          defaultStyles.viewButton,
          {
            backgroundColor: tinycolor(
              props.style?.backgroundColor ?? '#987123',
            )
              .darken()
              .toString(),
          },
          props.style,
          {height: props.style?.height ?? 44 + (props.elevation ?? 4)},
        ]}>
        <View style={defaultStyles.viewButtonContainer}>{load2dButton()}</View>
      </View>
    );
  };

  const load2dButton = () => {
    return (
      <TouchableOpacity
        disabled={props.disabled}
        style={[defaultStyles.viewButton, props.style ?? {}]}
        onPress={() => {
          props.onPress();
        }}>
        <Text style={[defaultStyles.text, props?.textStyle]}>{props.text}</Text>
      </TouchableOpacity>
    );
  };
  return props.skin == '2d'
    ? load2dButton()
    : props.skin == '3d'
    ? load3dButton()
    : null;
};

const defaultStyles = StyleSheet.create({
  viewButton: {
    height: 44,
    width: Dimensions.get('screen').width - 32,
    backgroundColor: '#987123',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    display: 'flex',
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
  viewButtonContainer: {
    position: 'absolute',
    top: 0,
  },
});

export default Button;
