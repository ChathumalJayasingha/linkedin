import React from 'react';
import {View, Text, ScrollView, Button} from 'react-native';
import {signOut} from '../../utils/auth';

export default function MyNetworkTab() {
  return (
    <View>
      <Text>my network</Text>
      <Button title={'Log out'} onPress={signOut} />
    </View>
  );
}
