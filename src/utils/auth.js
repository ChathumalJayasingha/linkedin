import auth from '@react-native-firebase/auth';
import {ToastAndroid} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const signIn = (email, password) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      ToastAndroid.show('Logged in', ToastAndroid.SHORT);
    })
    .catch(err => {
      if (err.code === 'auth/network-request-failed') {
        ToastAndroid.show(
          'Please check your network connection !',
          ToastAndroid.SHORT,
        );
        return;
      }
      if (err.code === 'auth/user-not-found') {
        ToastAndroid.show(
          'Please check your email and password \n\n user not found !',
          ToastAndroid.SHORT,
        );
        return;
      }

      if (err.code === 'auth/invalid-email') {
        ToastAndroid.show(
          'Please check your email \n\n invalid email !',
          ToastAndroid.SHORT,
        );
        return;
      }
      console.log(err);
      ToastAndroid.show('Error \n' + err, ToastAndroid.SHORT);
    });
};

export const signUp = (email, password) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      ToastAndroid.show('Signed up', ToastAndroid.SHORT);
    })
    .catch(err => {
      if (err.code === 'auth/email-already-in-use') {
        ToastAndroid.show(
          'That email address is already in use!',
          ToastAndroid.SHORT,
        );
        return;
      }

      if (err.code === 'auth/invalid-email') {
        ToastAndroid.show(
          'Please check your email \n\n invalid email !',
          ToastAndroid.SHORT,
        );
        return;
      }
      if (err.code === 'auth/network-request-failed') {
        ToastAndroid.show(
          'Please check your network connection !',
          ToastAndroid.SHORT,
        );
        return;
      }
      if (err.code === 'auth/invalid-email') {
        console.log();
        ToastAndroid.show('That email address is invalid!', ToastAndroid.SHORT);
        return;
      }
      console.log(err);
      ToastAndroid.show('Error \n' + err, ToastAndroid.SHORT);
    });
};

export const signOut = () => {

    removeValue();

  auth()
    .signOut()
    .then(() => {
      ToastAndroid.show('Signed Out', ToastAndroid.SHORT);
    });
};

//export const googleSignInButton = () => {
GoogleSignin.configure({
  webClientId:
    '153278438757-4tajejj7kl7cjbfqc5umjlqkf7kti2fv.apps.googleusercontent.com',
});

export async function googleSignInButton() {
  const {idToken} = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  return auth().signInWithCredential(googleCredential);
}
//};
const removeValue = async () => {
  try {
    await AsyncStorage.removeItem('fname');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('email_google');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('lname');
    await AsyncStorage.removeItem('position');
  } catch(e) {
    console.log(" remove error");
  }
}