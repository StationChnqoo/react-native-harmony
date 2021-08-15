import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  PanResponder,
  GestureResponderEvent,
} from 'react-native';

import {useState, MutableRefObject} from 'react';

export interface SeekBarProps {
  /** 按钮的大小 */
  dotSize: number;
  /** 按钮的颜色 */
  dotColor?: string;
  /** 进度条的总长度 */
  barWidth: number;
  /** 进度条的高度 */
  barHeight: number;
  /**
   * 进度改变时候的回调，返回 0 ~ 1 之间的小数
   * - `progress`: 0 ~ 100
   */
  onProgressChange: (progress: number) => void;
  /** 进度 */
  progress?: number;
  /** 已完成进度的颜色 */
  activeColor?: string;
  /** 未完成的进度的颜色 */
  inactiveColor?: string;
}

const SeekBar: React.FC<SeekBarProps> = props => {
  var bar: MutableRefObject<View> = useRef();
  const [x, setX] = useState(1);
  const dotSize = props.dotSize ?? 32;
  const responseHandlers = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
  });
  // 滑动过程中
  const onMove = (e: GestureResponderEvent) => {
    setX(onReachLimit(e.nativeEvent.pageX - dotSize + 2));
  };
  // 滑动结束
  const onComplete = (e: GestureResponderEvent) => {
    setX(onReachLimit(e.nativeEvent.pageX - dotSize + 2));
    props.onProgressChange(
      (e.nativeEvent.pageX - dotSize + 2) / (props.barWidth - dotSize + 2),
    );
  };

  // 边界处理
  const onReachLimit = (position: number) => {
    let length = props.barWidth - dotSize + 2;
    return position < 1 ? 1 : position > length ? length - 1 : position;
  };

  return (
    <View
      style={[
        defaultStyles.viewSeekBar,
        {
          width: props.barWidth,
          height: props.barHeight,
          borderRadius: dotSize / 2,
        },
      ]}>
      <View
        style={{
          width: x + dotSize - 2,
          backgroundColor: props.activeColor ?? 'white',
          borderRadius: dotSize / 2 - 1,
          height: Math.min(props.barHeight, dotSize)-2,
        }}
      />
      <View
        ref={bar}
        {...responseHandlers.panHandlers}
        style={[
          defaultStyles.viewDot,
          {
            height: dotSize - 2,
            width: dotSize - 2,
            backgroundColor: props.dotColor ?? 'white',
            borderRadius: dotSize / 2 - 1,
            left: x,
          },
        ]}
        onResponderMove={e => onMove(e)}
        onResponderRelease={e => onComplete(e)}
      />
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  viewSeekBarContainer: {},
  viewSeekBar: {
    backgroundColor: '#f0f0f0',
    position: 'relative',
    padding: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#d8d8d8',
  },
  viewDot: {
    position: 'absolute',
    elevation: 1,
    borderWidth: 1,
    borderColor: '#d8d8d8',
  },
});

export default SeekBar;
