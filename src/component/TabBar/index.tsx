import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Image,
  ImageStyle,
} from 'react-native';
import iPhone11 from '../../x/iPhone11';
import LinearGradient from 'react-native-linear-gradient';
import {TextStyle} from 'react-native';

interface TabBarProps {
  /** 是否有返回的按钮 */
  isHaveBackButton: boolean;
  /** 背景颜色，传一个数组，如果数组里面有一个元素，则填充，如果是多个，则为渐变背景色 */
  backgroundColors: Array<string>;
  /** 返回按钮的样式 */
  backButtonStyle?: ImageStyle;
  /** 返回的按钮的点击事件 */
  onBackButtonPress?: () => void;
  /** 标题 */
  title: string;
  /** 标题的样式 */
  textStyle: TextStyle;
}

const TabBar: React.FC<TabBarProps> = props => {
  return (
    <LinearGradient
      colors={
        props.backgroundColors.length == 1
          ? [props.backgroundColors[0], props.backgroundColors[0]]
          : props.backgroundColors
      }
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={[
        defaultStyles.viewTabBar,
        {backgroundColor: props.backgroundColors[0]},
        {justifyContent: props.isHaveBackButton ? 'space-between' : 'center'},
      ]}>
      {props.isHaveBackButton ? (
        <TouchableOpacity onPress={() => {}}>
          <Image
            source={require('../../images/tab_bar_back.png')}
            style={[defaultStyles.imageBack, props?.backButtonStyle]}
          />
        </TouchableOpacity>
      ) : null}
      <Text style={[defaultStyles.textTitle, props?.textStyle]}>
        {props.title}
      </Text>
      {props.isHaveBackButton ? (
        <View
          style={[
            defaultStyles.imageBack,
            props.hasOwnProperty('backButtonStyle')
              ? props.backButtonStyle
              : {
                  height: props.backButtonStyle.height,
                  width: props.backButtonStyle.width,
                },
          ]}
        />
      ) : null}
    </LinearGradient>
  );
};

const defaultStyles = StyleSheet.create({
  viewTabBar: {
    paddingTop: iPhone11.getStatusBarHeight(),
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 44 + iPhone11.getStatusBarHeight(),
  },
  imageBack: {
    height: 24,
    width: 24,
  },
  textTitle: {
    fontSize: 18,
  },
});

export default TabBar;
