import {object, string} from 'prop-types';
import React from 'react';
import {Image, ImageStyle, StyleProp, TextStyle, View, ViewStyle} from 'react-native';

interface Tab {
  image: Image;
  text: string;
  page: View;
}

interface TabNavigatorProps {
  /** Tab Navigator 的样式 */
  style: StyleProp<ViewStyle>;
  /** 图标的样式 */
  imageStyle: StyleProp<ImageStyle>;
  /** 按钮的样式 */
  textStyle: StyleProp<TextStyle>;
  /** Tab 的点击事件 */
  onTabPress: (tab: Tab) => void;
  /**
   * Tabs 数组
   *
   * `image`: 图标
   *
   * `text`: 文字
   *
   * `page`: 每个 Tab 对应的视图
   */
  tabs: Array<Tab>;
  /** Tab 选中时图标和按钮的颜色 */
  activeColor: string;
  /** Tab 默认状态下的图标和按钮的颜色 */
  inactiveColor: string;
}

export default class extends React.Component<TabNavigatorProps> {}
