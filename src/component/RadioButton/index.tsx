import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import {StyleSheet, TouchableOpacity, Image} from 'react-native';

import {useState} from 'react';

export type RadioButtonSkin = 'centerFill' | 'centerHalf' | 'centerEmpty';

export interface RadioButtonProps {
  /** 按钮大小 */
  size?: number;
  /** 点击事件 */
  onStatusChange: (status: boolean) => void;
  /**
   * Skin 单选按钮的皮肤，命名方式以中间的实心圆圈大小命名，默认为 centerFill
   *
   * - `centerFill`: 中间的圆圈很大
   * - `centerHalf`: 中间大圆圈一半大
   * - `centerEmpty`: 中间的圆圈是白的，其余的地方是实心的
   */
  skin?: RadioButtonSkin;
  /** 按钮的选中状态 */
  status: boolean;
  /** 按钮选中的颜色 */
  activeColor?: string;
  /** 按钮未选中的颜色 */
  inactiveColor?: string;
}

const RadioButton: React.FC<RadioButtonProps> = props => {
  const size = props.size ?? 24;
  const statusImages = {
    centerFill: require('../../images/radio_button_center_fill.png'),
    centerHalf: require('../../images/radio_button_center_half.png'),
    centerEmpty: require('../../images/radio-button_center_white.png'),
  };
  const [select, setSelect] = useState(false);
  useEffect(() => {
    if (props.status != select) {
      setSelect(props.status);
    }
    return () => {};
  }, [props.status]);

  return (
    <TouchableOpacity
      onPress={() => {
        let _status = !select;
        setSelect(_status);
        props.onStatusChange(_status);
      }}>
      <Image
        source={
          select
            ? statusImages[props.skin ?? 'centerFill']
            : require('../../images/radio_button_no.png')
        }
        style={[
          defaultStyles.viewRadioButton,
          {height: size, width: size},
          {
            tintColor: select
              ? props.activeColor ?? '#987123'
              : props.inactiveColor ?? '#d8d8d8',
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const defaultStyles = StyleSheet.create({
  viewRadioButton: {
    height: 24,
    width: 24,
  },
});

export default RadioButton;
