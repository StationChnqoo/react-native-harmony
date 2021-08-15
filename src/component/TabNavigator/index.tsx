import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  ImageStyle,
  TextStyle,
  ImageRequireSource,
  ImageURISource,
} from 'react-native';

export interface Tab {
  /** Menu 默认的图标: 未选中状态 */
  image: ImageRequireSource | ImageURISource;
  /** Menu 被激活的时候的图标: 如果不配置，则按照 activeColor 对默认图标填充颜色 */
  activeImage?: ImageRequireSource | ImageURISource;
  text: string;
  page: View | React.FC | React.Component | any;
}

export interface TabNavigatorProps {
  /** Tab Navigator 的样式 */
  style?: StyleProp<ViewStyle>;
  /** 图标的样式 */
  imageStyle?: StyleProp<ImageStyle>;
  /** 按钮的样式 */
  textStyle?: StyleProp<TextStyle>;
  /** Tab 的点击事件 */
  onTabPress: (tab: Tab | any) => void;
  /**
   * Tabs 数组
   *
   * - `image`: 图标
   * - `text`: 文字
   * - `page`: 每个 Tab 对应的视图
   */
  tabs: Array<Tab>;
  /** Tab 选中时图标和按钮的颜色 */
  activeColor?: string;
  /** Tab 默认状态下的图标和按钮的颜色 */
  inactiveColor?: string;
}

const TabNavigator: React.FC<TabNavigatorProps> = props => {
  const [index, setIndex] = useState(0);
  const loadTabs = () => {
    let array = [];
    let active = props.activeColor ?? '#987123';
    let inactive = props.inactiveColor ?? 'grey';
    for (let i = 0; i < props.tabs.length; i++) {
      let tab = props.tabs[i];
      array.push(
        <TouchableOpacity
          key={i}
          style={defaultStyles.viewTab}
          onPress={() => {
            setIndex(i);
            props.onTabPress(tab);
          }}>
          <Image
            source={
              tab.activeImage === undefined
                ? tab.image
                : i === index
                ? tab.activeImage
                : tab.image
            }
            style={[
              defaultStyles.image,
              props?.imageStyle,
              tab.activeImage === undefined
                ? {
                    tintColor: i === index ? active : inactive,
                  }
                : {},
            ]}
          />
          <View style={{height: 4}} />
          <Text
            style={[
              defaultStyles.text,
              props?.textStyle,
              {
                color: i === index ? active : inactive,
              },
            ]}>
            {tab.text}
          </Text>
        </TouchableOpacity>,
      );
    }
    return array;
  };

  return (
    <View style={[defaultStyles.viewTabNavigator, props?.style]}>
      {loadTabs()}
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  viewTabNavigator: {
    paddingVertical: 6,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
  },
  text: {
    fontSize: 10,
  },
  image: {
    height: 22,
    width: 22,
  },
  viewTab: {
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
    flex: 1,
  },
});

export default TabNavigator;
