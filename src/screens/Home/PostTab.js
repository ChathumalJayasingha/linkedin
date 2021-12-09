import React, {useState} from 'react';
import {View, Text, ToastAndroid, SafeAreaView, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {signOut} from '../../utils/auth';
import {createPost} from '../../utils/database';
import FormInput from '../../components/shared/FormInput';
import FormButton from '../../components/shared/FormButton';
import {COLORS} from '../../constants/theme';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import {createQuestion} from '../utils/database';
import {launchImageLibrary} from 'react-native-image-picker';

const PostTab = ({navigation}) => {
  const [username, setUsername] = useState('udara');
  const [usernameDesc, setUsernameDesc] = useState('Marine officer');
  const [postDesc, setPostDesc] = useState(
    'This is Docker lorelm lorem lorem lorel',
  );
  const [imageUri, setImageUri] = useState('');

  const handleQuizSave = async () => {
    const currentQuizId = Math.floor(100000 + Math.random() * 9000).toString();
    let currentQuestionId = Math.floor(
      100000 + Math.random() * 9000,
    ).toString();

    // Upload Image
    let imageUrl = '';

    if (imageUri != '') {
      const reference = storage().ref(
        `/images/posts/${currentQuizId}_${currentQuestionId}`,
      );
      await reference.putFile(imageUri).then(() => {
        console.log('Image Uploaded');
        ToastAndroid.show('Image uploaded', ToastAndroid.SHORT);
      });
      imageUrl = await reference.getDownloadURL();
    }

    // Save to firestore
    await createPost(currentQuizId, username, usernameDesc, postDesc, imageUrl);
    ToastAndroid.show('Post Saved', ToastAndroid.SHORT);
  };

  const selectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        //mediaType: 'video',
      },
      ({assets}) => {
        if (assets && assets.length > 0) {
          setImageUri(assets[0].uri);
        }
      },
    );
  };

  return (
    <SafeAreaView style={styles.main_wrap}>
      <View style={styles.header}>
        <Text style={styles.header_text}>Quiz App</Text>
        <Text style={styles.header_logout} onPress={signOut}>
          Logout
        </Text>
      </View>
      <Text style={styles.create_post_text}>Create Post</Text>

      <TextInput
        label={'username'}
        onChangeText={value => setUsername(value)}
      />
      <TextInput
        label={'User Description'}
        onChangeText={value => setUsernameDesc(value)}
      />
      <TextInput
        label={'About Post '}
        onChangeText={value => setPostDesc(value)}
      />

      <Button onPress={selectImage}>Select Image</Button>
      <Button onPress={handleQuizSave}>Create Post</Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main_wrap: {
    flex: 1,
    backgroundColor: COLORS.white,
    //padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    elevation: 4,
    paddingHorizontal: 20,
  },
  header_text: {
    fontSize: 20,
    color: COLORS.black,
  },
  header_logout: {
    fontSize: 20,
    padding: 10,
    color: COLORS.error,
  },
  create_post_text: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  },
});

export default PostTab;
