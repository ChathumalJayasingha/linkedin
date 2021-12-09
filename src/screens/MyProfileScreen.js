import React from 'react';
import {View, Text, Image ,SafeAreaView,StatusBar} from 'react-native';
import {COLORS} from '../constants/theme';

const MyProfileScreen = () => {
  return (
    <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: COLORS.background,
      position: 'relative',
    }}>

        <Image style={{width:450,height:100}} source={require("../assets/background_image.png")}/>
    

    <Text>Chathu</Text>

  </SafeAreaView>
  );
};

export default MyProfileScreen;
