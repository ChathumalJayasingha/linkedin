import React,{useState,useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function JobsTab() {

    const[email,setEmail]=useState('')
    const[lname,setLname]=useState('')
    const[fname,setFname]=useState('')
    const[position,setPosition]=useState('')
    const[user,setUser]=useState('')

    useEffect(()=>{
        getEmail();
    },[])

    const getEmail =async()=>{
        setEmail(await AsyncStorage.getItem('email'))
        setFname(await AsyncStorage.getItem('fname'))
        setLname(await AsyncStorage.getItem('lname'))
        setPosition(await AsyncStorage.getItem('position'))
        setUser(await AsyncStorage.getItem('user'))
    }


  return (
    <View>
      <Text>{email}</Text>
      <Text>{lname}</Text>

      <Text>{fname}</Text>
      <Text>{position}</Text>

    </View>
  );
}
