import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, useColorScheme, View, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export interface ProgressBarProps {
  /** 进度条的样式，如果是渐变颜色，那么放到 colors 数组里面 */
  height?: number;
  width?: number;
  /** 渐变色范围的数组 */
  colors: Array<string | number>;
  /** 进度 */
  progress?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = props => {
  const barSize = {
    height: props.height ?? 4,
    width: props.width ?? 160,
    borderRadius: props.height ?? 4 / 2,
  };
  const animate = useRef(new Animated.Value(0)).current;
  // 当前进度条的长度
  const progressBarWidth = animate.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', `100%`],
  });

  useEffect(() => {
    Animated.spring(animate, {
      velocity: 0, // 附着在弹簧上物体的初始速度 默认: 0
      tension: 1, // 控制速度 默认: 40
      friction: 4, // 控制弹性 / 过冲 默认: 7
      toValue: Math.ceil(props.progress * 100),
      useNativeDriver: false,
    }).start();
    animate.addListener(size => {
      // console.log(size);
    });
    return () => {};
  }, [props.progress]);

  return (
    <View style={[defaultStyles.viewProgressBar, barSize]}>
      <Animated.View
        style={[
          defaultStyles.viewProgressBar,
          barSize,
          {
            width: progressBarWidth,
          },
        ]}>
        <LinearGradient
          style={[
            defaultStyles.viewProgressBar,
            barSize,
            {
              width: `100%`,
            },
          ]}
          colors={props.colors}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
        />
      </Animated.View>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  viewProgressBar: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#d8d8d8',
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
  },
});

export default ProgressBar;
