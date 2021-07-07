import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

const TabNavigator = props => {
  const [index, setIndex] = useState(0);
  const loadTabs = () => {
    let array = [];
    let active = props.hasOwnProperty('activeColor')
      ? props.activeColor
      : '#987123';
    let inactive = props.hasOwnProperty('inactiveColor')
      ? props.inactiveColor
      : 'grey';
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
            source={tab.image}
            style={[
              defaultStyles.image,
              props.hasOwnProperty('imageStyle') ? props.imageStyle : {},
              {
                tintColor: i === index ? active : inactive,
              },
            ]}
          />
          <View style={{height: 4}} />
          <Text
            style={[
              defaultStyles.text,
              props.hasOwnProperty('textStyle') ? props.textStyle : {},
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
    <View
      style={[
        defaultStyles.viewTabNavigator,
        props.hasOwnProperty('style') ? props.style : {},
      ]}>
      {loadTabs()}
    </View>
  );
};

TabNavigator.propTypes = {
  style: PropTypes.object,
  imageStyle: PropTypes.object,
  textStyle: PropTypes.object,
  onTabPress: PropTypes.func.isRequired,
  tabs: PropTypes.array,
  activeColor: PropTypes.string,
  inactiveColor: PropTypes.string,
};

const defaultStyles = StyleSheet.create({
  viewTabNavigator: {
    paddingVertical: 6,
    backgroundColor: '#f1f1f1',
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
