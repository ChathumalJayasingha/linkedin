import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {SignInScreen, SignUpScreen, MyProfileScreen} from '../screens';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="MyProfileScreen" component={MyProfileScreen} />
    </Stack.Navigator>
  );
}
