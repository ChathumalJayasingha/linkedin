import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  HomeScreen,
  AddQuestionScreen,
  CreateQuizScreen,
  PlayQuizScreen,
  MyProfileScreen,
} from '../screens';

const Stack = createStackNavigator();

export default function AppStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      {/* <Stack.Screen name="AddQuestionScreen" component={AddQuestionScreen} />
      <Stack.Screen name="CreateQuizScreen" component={CreateQuizScreen} />
      <Stack.Screen name="PlayQuizScreen" component={PlayQuizScreen} /> */}
      <Stack.Screen options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitle: 'Your Profile',
      }} name="MyProfileScreen" component={MyProfileScreen} />
    </Stack.Navigator>
  );
}
