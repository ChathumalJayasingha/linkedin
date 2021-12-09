import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {TextInput, Checkbox, Button} from 'react-native-paper';
import {signUp, googleSignInButton} from '../utils/auth';

export default function RegisterScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  return (
    <ScrollView style={styles.main_wrap}>
      <View>
        <Image
          style={styles.logo}
          source={require('../assets/linkedin_logo_1.png')}
        />
        <Text style={styles.join_linedin}>Join LinkedIn</Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('SignInScreen');
          }}
          style={styles.signin_now}>
          <Text style={styles.text_or}>or &nbsp;</Text>
          <Text style={styles.signin_now_text}>Sign in</Text>
        </TouchableOpacity>
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

        <Button
          style={styles.btn_continue}
          uppercase={false}
          mode="contained"
          color={'#0A66C2'}
          onPress={() => {
            // props.navigation.navigate('home');
            signUp(email, password);
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
          onPress={() => {
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
  signin_now: {
    // position: 'relative',
    flex: 1,
    flexDirection: 'row',
  },
  signin_now_text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0A66C2',
    right: 0,
    //marginTop: 35,
  },
  sign_in: {
    fontSize: 30,
    fontWeight: '500',
    color: 'black',
  },
  join_linedin: {
    fontSize: 30,
    fontWeight: '500',
    color: 'black',
  },
  text_or: {},
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
    marginTop: 35,
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
