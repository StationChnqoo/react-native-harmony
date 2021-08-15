import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';

import {useState} from 'react';

export type CheckBoxsSkin =
  | 'onlyTrue'
  | 'squareFill'
  | 'squareBorder'
  | 'circleFill'
  | 'circleBorder';
export interface CheckBoxProps {
  /** 按钮大小 */
  size?: number;
  /** 皮肤: 所有的选中状态中间都有一个对号
   *
   * - `onlyTrue`: 没有边框
   * - `squareFill`: 正方 & 填充颜色 & 边框无颜色
   * - `squareBorder`: 正方形 & 无填充颜色 & 边框有颜色
   * - `circleFill`: 圆形 & 填充颜色 & 边框无颜色
   * - `circleBorder`: 圆形 & 无填充颜色 & 边框有颜色
   */
  skin?: CheckBoxsSkin;
  /** 状态 */
  status: boolean;
  /** 点击事件 */
  onStatusChange: (status: boolean) => void;
  /** 选中状态的颜色 */
  activeColor?: string;
  /** 未选中按钮的颜色 */
  inactiveColor?: string;
}

const CheckBox: React.FC<CheckBoxProps> = props => {
  const [select, setSelect] = useState(false);
  const checkBoxImages = {
    onlyTrue: {
      yes: require('../../images/check_box_only_true.png'),
      no: require('../../images/check_box_only_true.png'),
    },
    squareFill: {
      yes: require('../../images/check_box_square_fill.png'),
      no: require('../../images/check_box_square_fill.png'),
    },
    squareBorder: {
      yes: require('../../images/check_box_square_border.png'),
      no: require('../../images/check_box_square_empty.png'),
    },
    circleFill: {
      yes: require('../../images/check_box_circle_fill.png'),
      no: require('../../images/check_box_circle_fill.png'),
    },
    circleBorder: {
      yes: require('../../images/check_box_circle_border.png'),
      no: require('../../images/check_box_circle_empty.png'),
    },
  };
  useEffect(() => {
    if (props.status !== select) {
      setSelect(!select);
    }
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
            ? checkBoxImages[props.skin ?? 'onlyTrue'].yes
            : checkBoxImages[props.skin ?? 'onlyTrue'].no
        }
        style={[
          defaultStyles.checkBox,
          {
            height: props.size ?? 24,
            width: props.size ?? 24,
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
  checkBox: {
    height: 24,
    width: 24,
    tintColor: '#987123',
  },
});

export default CheckBox;
