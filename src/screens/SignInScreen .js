// import React, {useState} from 'react';
// import {View, Text, SafeAreaView} from 'react-native';
// import {COLORS} from '../constants/theme';
// import FormInput from '../components/shared/FormInput';
// import FormButton from '../components/shared/FormButton';
// import {signIn} from '../utils/auth';

// const SignInScreen = ({navigation}) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleOnSubmit = () => {
//     if (email != '' && password != '') {
//       signIn(email, password);
//     }
//   };

//   return (
//     <SafeAreaView
//       style={{
//         backgroundColor: COLORS.white,
//         alignItems: 'center',
//         justifyContent: 'flex-start',
//         padding: 20,
//       }}>
//       <Text
//         style={{
//           fontSize: 24,
//           color: COLORS.black,
//           fontWeight: 'bold',
//           marginVertical: 32,
//         }}>
//         Sign In
//       </Text>

//       {/* Email */}
//       <FormInput
//         labelText="Email"
//         placeholderText="enter your email"
//         onChangeText={value => setEmail(value)}
//         value={email}
//         keyboardType={'email-address'}
//       />

//       <FormInput
//         labelText="Password"
//         placeholderText="enter your password"
//         onChangeText={value => setPassword(value)}
//         value={password}
//         secureTextEntry={true}
//       />

//       {/* Submit button */}
//       <FormButton
//         labelText="Submit"
//         handleOnPress={handleOnSubmit}
//         style={{width: '100%'}}
//       />

//       {/* Footer */}
//       <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
//         <Text>Don't have an account?</Text>
//         <Text
//           style={{marginLeft: 4, color: COLORS.primary}}
//           onPress={() => navigation.navigate('SignUpScreen')}>
//           Create account
//         </Text>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default SignInScreen;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {TextInput, Checkbox, Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {signIn, googleSignInButton} from '../utils/auth';
import {getUserById} from '../utils/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignInScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getUserDetails = async () => {
    let userData = await (await getUserById(email)).data();
    console.warn(JSON.stringify(userData.fname));
    try {
      await AsyncStorage.setItem('fname', JSON.stringify(userData.fname));
      await AsyncStorage.setItem('lname', JSON.stringify(userData.lname));
      await AsyncStorage.setItem('position', JSON.stringify(userData.position));
    } catch (e) {
      console.log('set email error in sign in scrreen');
    }
  };

  return (
    <ScrollView style={styles.main_wrap}>
      <View>
        <Image
          style={styles.logo}
          source={require('../assets/linkedin_logo_1.png')}
        />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('SignUpScreen');
          }}
          style={styles.join_now}>
          <Text style={styles.join_now_text}>Join Now</Text>
        </TouchableOpacity>
        <Text style={styles.sign_in}>Sign in</Text>
        <TextInput
          style={styles.text_email}
          mode="flat"
          label={'Email or Phone*'}
          Type={'flat'}
          onChangeText={text => {
            setEmail(text);
          }}
          theme={{colors: {primary: '#0A66C2', underlineColor: 'transparent'}}}
        />
        <TextInput
          style={styles.text_password}
          label={'Password'}
          onChangeText={text => {
            setPassword(text);
          }}
          theme={{colors: {primary: '#0A66C2', underlineColor: 'transparent'}}}
          secureTextEntry={true}
        />
        <View style={styles.center_wrap}>
          <Checkbox status="checked" color="green" />
          <View style={styles.text_remember_me_wrap}>
            <Text style={styles.text_remember_me}>Remember me. </Text>
          </View>

          <TouchableOpacity style={styles.learn_more_wrap}>
            <Text style={styles.learn_more}>Learn more</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text style={styles.text_forgot_password}>Forgot password? </Text>
        </TouchableOpacity>

        <Button
          style={styles.btn_continue}
          uppercase={false}
          mode="contained"
          color={'#0A66C2'}
          onPress={async () => {
            if (email === '') {
              ToastAndroid.show(
                'Please enter your email !!!',
                ToastAndroid.SHORT,
              );
              return;
            }
            if (password === '') {
              ToastAndroid.show(
                'Please enter your password !!!',
                ToastAndroid.SHORT,
              );
              return;
            }
            await signIn(email, password);
            await getUserDetails();
          }}>
          Continue
        </Button>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />
          <View>
            <Text style={{width: 50, textAlign: 'center'}}>or</Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />
        </View>

        <Button
          style={styles.btn_google_sign_in}
          uppercase={false}
          icon={require('../assets/Google_icon.png')}
          mode="outlined"
          color={'gray'}
          onPress={async () => {
            googleSignInButton();
          }}>
          Sign in with Google
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main_wrap: {
    backgroundColor: 'white',
    position: 'relative',
    padding: 20,
  },
  logo: {
    position: 'relative',
    width: 120,
    height: 100,
  },
  join_now: {
    position: 'absolute',
    right: 0,
  },
  join_now_text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0A66C2',
    right: 0,
    marginTop: 35,
  },
  sign_in: {
    fontSize: 30,
    fontWeight: '500',
    color: 'black',
  },
  text_email: {
    backgroundColor: 'white',
    marginTop: 20,
  },
  text_password: {
    backgroundColor: 'white',
  },
  text_remember_me_wrap: {
    justifyContent: 'center',
  },
  text_remember_me: {
    fontSize: 15,
    fontWeight: 'normal',
    justifyContent: 'center',
  },
  learn_more_wrap: {
    justifyContent: 'center',
  },
  learn_more: {
    fontSize: 15,
    fontWeight: '500',
    color: '#0A66C2',
  },
  center_wrap: {
    flexDirection: 'row',
    marginTop: 20,
  },
  text_forgot_password: {
    fontSize: 15,
    fontWeight: '500',
    color: '#0A66C2',
    paddingTop: 20,
    paddingBottom: 10,
  },
  btn_continue: {
    fontSize: 20,
    marginTop: 15,
    marginBottom: 15,
    padding: 8,
    borderRadius: 100,
  },
  btn_google_sign_in: {
    fontSize: 20,
    marginTop: 15,
    marginBottom: 15,
    padding: 8,
    borderRadius: 100,
    color: 'black',
  },
});

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import {TextInput, Checkbox, Button} from 'react-native-paper';
// import auth from '@react-native-firebase/auth';
// import {
//   GoogleSignin,
//   GoogleSigninButton,
// } from '@react-native-google-signin/google-signin';

// export default function RegisterScreen(props) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [userName, setUserName] = useState('');

//   GoogleSignin.configure({
//     webClientId:
//       '153278438757-4tajejj7kl7cjbfqc5umjlqkf7kti2fv.apps.googleusercontent.com',
//   });

//   function register() {
//     console.log(email, password);
//     auth()
//       .createUserWithEmailAndPassword(email, password)
//       .then(createdUser => {
//         alert('success');
//         console.log('User account created & signed in!');
//         createdUser.user.updateProfile({
//           displayName: userName,
//         });
//       })
//       .catch(error => {
//         alert('this is error');
//         if (error.code === 'auth/email-already-in-use') {
//           console.log('That email address is already in use!');
//           alert('That email address is already in use!');
//         }

//         if (error.code === 'auth/invalid-email') {
//           console.log('That email address is invalid!');
//           alert('That email address is invalid!');
//         }

//         console.error('this is error' + error);
//       });
//   }

//   async function onGoogleButtonPress() {
//     // Get the users ID token
//     const {idToken} = await GoogleSignin.signIn();

//     // Create a Google credential with the token
//     const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//     // Sign-in the user with the credential
//     return auth().signInWithCredential(googleCredential);
//   }
//   return (
//     <ScrollView style={styles.main_wrap}>
//       <View>
//         <Image
//           style={styles.logo}
//           source={require('../assets/linkedin_logo_1.png')}
//         />
//         <Text style={styles.join_linedin}>Join LinkedIn</Text>
//         <TouchableOpacity
//           onPress={() => {
//             props.navigation.navigate('login');
//           }}
//           style={styles.signin_now}>
//           <Text style={styles.text_or}>or &nbsp;</Text>
//           <Text style={styles.signin_now_text}>Sign in</Text>
//         </TouchableOpacity>
//         <TextInput
//           style={styles.text_email}
//           mode="flat"
//           label={'Email or Phone*'}
//           Type={'flat'}
//           onChangeText={text => {
//             setEmail(text);
//           }}
//           theme={{colors: {primary: '#0A66C2', underlineColor: 'transparent'}}}
//         />
//         <TextInput
//           style={styles.text_password}
//           label={'Password'}
//           onChangeText={text => {
//             setPassword(text);
//           }}
//           theme={{colors: {primary: '#0A66C2', underlineColor: 'transparent'}}}
//           secureTextEntry={true}
//         />

//         <Button
//           style={styles.btn_continue}
//           uppercase={false}
//           mode="contained"
//           color={'#0A66C2'}
//           onPress={() => {
//             props.navigation.navigate('home');
//           }}>
//           Continue
//         </Button>

//         <View style={{flexDirection: 'row', alignItems: 'center'}}>
//           <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />
//           <View>
//             <Text style={{width: 50, textAlign: 'center'}}>or</Text>
//           </View>
//           <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />
//         </View>

//         <Button
//           style={styles.btn_google_sign_in}
//           uppercase={false}
//           icon={require('../assets/Google_icon.png')}
//           mode="outlined"
//           color={'gray'}
//           onPress={() => {
//             onGoogleButtonPress();
//           }}>
//           Sign in with Google
//         </Button>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   main_wrap: {
//     backgroundColor: 'white',
//     position: 'relative',
//     padding: 20,
//   },
//   logo: {
//     position: 'relative',
//     width: 120,
//     height: 100,
//   },
//   signin_now: {
//     // position: 'relative',
//     flex: 1,
//     flexDirection: 'row',
//   },
//   signin_now_text: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: '#0A66C2',
//     right: 0,
//     //marginTop: 35,
//   },
//   sign_in: {
//     fontSize: 30,
//     fontWeight: '500',
//     color: 'black',
//   },
//   join_linedin: {
//     fontSize: 30,
//     fontWeight: '500',
//     color: 'black',
//   },
//   text_or:{

//   },
//   text_email: {
//     backgroundColor: 'white',
//     marginTop: 20,
//   },
//   text_password: {
//     backgroundColor: 'white',
//   },
//   text_remember_me_wrap: {
//     justifyContent: 'center',
//   },
//   text_remember_me: {
//     fontSize: 15,
//     fontWeight: 'normal',
//     justifyContent: 'center',
//   },
//   learn_more_wrap: {
//     justifyContent: 'center',
//   },
//   learn_more: {
//     fontSize: 15,
//     fontWeight: '500',
//     color: '#0A66C2',
//   },
//   center_wrap: {
//     flexDirection: 'row',
//     marginTop: 20,
//   },
//   text_forgot_password: {
//     fontSize: 15,
//     fontWeight: '500',
//     color: '#0A66C2',
//     paddingTop: 20,
//     paddingBottom: 10,
//   },
//   btn_continue: {
//     fontSize: 20,
//     marginTop: 35,
//     marginBottom: 15,
//     padding: 8,
//     borderRadius: 100,
//   },
//   btn_google_sign_in: {
//     fontSize: 20,
//     marginTop: 15,
//     marginBottom: 15,
//     padding: 8,
//     borderRadius: 100,
//     color: 'black',
//   },
// });
