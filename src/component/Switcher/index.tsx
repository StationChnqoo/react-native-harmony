import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import {StyleSheet, TouchableOpacity, Animated} from 'react-native';
import {useState} from 'react';

export interface ButtonProps {
  /** 选中的状态的颜色 默认白色 */
  activeColor?: string;
  /** 未选中状态的颜色 默认 #f0f0f0 */
  inactiveColor?: string;
  /** 按钮的大小 */
  size?: number;
  /** 选中的状态 */
  status: boolean;
  /** 状态更改时的回调 */
  onStatusChange: (status: boolean) => void;
}

const Switcher: React.FC<ButtonProps> = props => {
  const size = props.size ?? 24;
  const [select, setSelect] = useState(false);
  const [slider, setSlider] = useState(
    new Animated.ValueXY({x: props.status ? size + 1 : 1, y: 0}),
  );

  useEffect(() => {
    if (props.status !== select) {
      setSelect(!select);
    }
    return () => {};
  }, [props.status]);

  return (
    <TouchableOpacity
      style={[
        defaultStyles.viewSwitcher,
        {
          height: size,
          width: size * 2,
          backgroundColor: select
            ? props.activeColor ?? '#987124'
            : props.inactiveColor ?? '#d8d8d8',
          borderRadius: size / 2,
        },
      ]}
      onPress={() => {
        let _status = !select;
        setSelect(_status);
        Animated.spring(slider, {
          toValue: {x: select ? 1 : size + 1, y: 0}, // 目标值
          velocity: 0, // 附着在弹簧上物体的初始速度 默认: 0
          tension: 1, // 控制速度 默认: 40
          friction: 4, // 控制弹性 / 过冲 默认: 7
          useNativeDriver: true,
        }).start();
        props.onStatusChange(_status);
      }}>
      <Animated.View
        style={{
          position: 'absolute',
          height: size - 2,
          width: size - 2,
          backgroundColor: 'white',
          borderRadius: size / 2 - 1,
          transform: [{translateX: slider.x}],
        }}
      />
    </TouchableOpacity>
  );
};

const defaultStyles = StyleSheet.create({
  viewSwitcher: {
    height: 24,
    width: 48,
    borderRadius: 24,
    padding: 1,
    backgroundColor: '#987123',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    display: 'flex',
  },
});

export default Switcher;
