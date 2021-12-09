import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Image, SafeAreaView, TouchableOpacity} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {COLORS} from '../../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native-paper';



export default function NotificationTab(props) {
  const [notification, setNotification] = useState({
    title: 'No notification here !',
    body: '',
    image: undefined,
  });

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('.........................: ', token);
  };

  useEffect(() => {
    getToken();
    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      setNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        image: remoteMessage.notification.android.imageUrl,
      });
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('onNotificationOpenedApp: ', JSON.stringify(remoteMessage));
      setNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        image: remoteMessage.notification.android.imageUrl,
      });
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            JSON.stringify(remoteMessage),
          );
          setNotification({
            title: remoteMessage.notification.title,
            body: remoteMessage.notification.body,
            image: remoteMessage.notification.android.imageUrl,
          });
        }
      });
  }, []);

  return (

    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        position: 'relative',
      }}>


<View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: COLORS.white,
          elevation: 4,
          paddingBottom:10,
          //paddingHorizontal: 20,
        }}>
       
      <TouchableOpacity onPress={()=>{
            props.navigation.navigate('MyProfileScreen');
      }} >
          
      <Image
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 100,
                  marginLeft:20,
                  marginRight:20
                }}
                source={require('../../assets/person.png')}
              />
          
          </TouchableOpacity> 
        
     

        <TextInput 
        outlineColor={"gray"} 
        activeOutlineColor={"gray"} 
        mode={"outlined"}
         style={{width:250,height:30,borderRadius:10}} 
         label={ <FontAwesome name={"search"}  size={15} color={"gray"} />  }/>
        <FontAwesome style={{
            marginLeft:20,
            marginRight:20
          }}
        name={"commenting"}  size={25} color={"black"} /> 
      </View>

      <View
        style={{
            //borderWidth:1,
           alignItems: 'center',
        //   justifyContent: 'center',
        borderRadius:10,
          backgroundColor: COLORS.white,
          elevation: 4,
          paddingHorizontal: 10,
          paddingVertical: 10,
          marginHorizontal: 10,
          marginVertical: 10,
          }}>
        <Text
          style={{
            fontSize: 20,
            justifyContent: 'center',
            color: COLORS.black,
          }}>{` ${notification?.title}`}</Text>
              <Text>{` ${notification?.body}`}</Text>
              <Image source={{uri: notification?.image}} width={300} height={300} />
          </View>
    </SafeAreaView>
  );
}
