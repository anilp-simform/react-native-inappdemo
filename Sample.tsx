/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  SafeAreaView,
  StyleProp,
  Text,
  View
} from 'react-native';

enum Types {
  titleOnly = 'titleOnly',
  imageOnly = 'imageOnly',
  userInfo = 'userInfo',
  backButton = 'backButton',
}
type TypeOne = {
  title: string;
  type?: Types.titleOnly;
};

type TypeTwo = {
  image: ImageSourcePropType;
  style: StyleProp<ImageStyle>;
  type: Types.imageOnly;
};

type TypeThree = {
  user: {name: string; image: string};
  type: Types.userInfo;
};

type TypeFour = {
  showBack: boolean;
  type: Types.backButton;
};

type HeaderType = TypeOne | TypeTwo | TypeThree | TypeFour;

const Header = (props: HeaderType) => {
  if (props.type === Types.titleOnly) {
    return (
      <View style={{flexDirection: 'row'}}>
        <Text>{props.title}</Text>
      </View>
    );
  }
  if (props.type === Types.imageOnly) {
    return (
      <View style={{flexDirection: 'row'}}>
        <Image source={props.image} style={props.style} />
      </View>
    );
  }
  if (props.type === Types.userInfo) {
    return (
      <View style={{flexDirection: 'row'}}>
        <Image source={{uri: props.user.image}} />
        <Text>{props.user.name}</Text>
      </View>
    );
  }
  if (props.type === Types.backButton) {
    return (
      <View style={{flexDirection: 'row'}}>
        {/* Back button  <Image source={{uri: props.user.image}} /> */}
      </View>
    );
  }
  // default options for header which user on maximum
  return <View style={{flexDirection: 'row'}} />;
};

function Sample(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
        }}>
        <Header type={Types.backButton} showBack={false} />
      </View>
    </SafeAreaView>
  );
}

export default Sample;
