import React, {useEffect, useState} from 'react';
import {View, Text, Image, SafeAreaView, StatusBar} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {COLORS} from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createUser, getUserById} from '../utils/database';

const MyProfileScreen = props => {
  const [fname, setFname] = useState('');
  const [email, setEmail] = useState('');
  const [lname, setLname] = useState('');
  const [currentPosition, seCurrentPossition] = useState('');
  const [education, setEducation] = useState('');

  const getEmailInAsync = async () => {
    try {
      const value = await AsyncStorage.getItem('email');
      if (value !== null) {
        setEmail(value);
      }
    } catch (e) {
      console.log('email set error in myprofilescreen');
    }
  };

  useEffect(() => {
    getEmailInAsync();
    //getUser();
  }, []);

  const getUser = async () => {
    //console.log(await (await getUserById(email)).id);
    // setFname(await (await getUserById(email)).data().fname);
    // setLname(await (await getUserById(email)).data().lname);
    // setEducation(await (await getUserById(email)).data().education);
    // seCurrentPossition(await (await getUserById(email)).data().position);
  };

  const save = async () => {
    await createUser(email, fname, lname, currentPosition, education);
    await props.navigation.navigate('HomeScreen');

    try {
      await AsyncStorage.setItem('fname', fname);
      await AsyncStorage.setItem('lname', lname);
      await AsyncStorage.setItem('position', currentPosition);
      await AsyncStorage.setItem('education', education);
    } catch (e) {
      console.info("Async save error my profile 54");
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        position: 'relative',
      }}>
      <Image
        style={{width: 450, height: 100}}
        source={require('../assets/background_image.png')}
      />
      <View style={{paddingHorizontal: 7, paddingVertical: 7}}>
        <TextInput
          //style={{}}
          disabled={true}
          outlineColor={'gray'}
          activeOutlineColor={'gray'}
          mode={'outlined'}
          label={email}
        />
        <TextInput
          //style={{}}
          value={fname}
          outlineColor={'gray'}
          activeOutlineColor={'gray'}
          mode={'outlined'}
          label={'enter first name'}
          onChangeText={e => {
            setFname(e);
          }}
        />
        <TextInput
          value={lname}
          outlineColor={'gray'}
          activeOutlineColor={'gray'}
          mode={'outlined'}
          label={'enter last name'}
          onChangeText={e => {
            setLname(e);
          }}
        />
        <TextInput
          value={currentPosition}
          outlineColor={'gray'}
          activeOutlineColor={'gray'}
          mode={'outlined'}
          label={'enter current postition'}
          onChangeText={e => {
            seCurrentPossition(e);
          }}
        />
        <TextInput
          value={education}
          outlineColor={'gray'}
          activeOutlineColor={'gray'}
          mode={'outlined'}
          label={'enter current education'}
          onChangeText={e => {
            setEducation(e);
          }}
        />
        <Button
          onPress={() => {
            save();
          }}
          style={{margin: 10}}
          color={'gray'}
          outlineColor={'gray'}
          activeOutlineColor={'gray'}
          mode={'outlined'}>
          <FontAwesome name={'save'} size={20} color={'black'} />
          save
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default MyProfileScreen;
