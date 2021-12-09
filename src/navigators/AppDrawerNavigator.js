import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AppStackNavigator from './AppStackNavigator';

const Drawer = createDrawerNavigator();

const AppDrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="AppStackNavigator"
        component={AppStackNavigator}
        //options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default AppDrawerNavigator;
