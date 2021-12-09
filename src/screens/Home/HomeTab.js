import {signOut} from '../../utils/auth';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from 'react-native';
import FormButton from '../../components/shared/FormButton';
import {COLORS} from '../../constants/theme';
import {getAllPosts} from '../../utils/database.js';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const HomeTab = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getAll = async () => {
    setRefreshing(true);
    const posts = await getAllPosts();

    // Transform posts data
    let tempPostDetails = [];
    await posts.docs.forEach(async postid => {
      await tempPostDetails.push({id: postid.id, ...postid.data()});
    });
    await setAllPosts([...tempPostDetails]);
    setRefreshing(false);
    console.log(allPosts);
  };

  useEffect(() => {
    getAll();
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        position: 'relative',
      }}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: COLORS.white,
          elevation: 4,
          paddingHorizontal: 20,
        }}>
        <Text style={{fontSize: 20, color: COLORS.black}}>Lined App</Text>
        <Text
          style={{
            fontSize: 20,
            padding: 10,
            color: COLORS.error,
          }}
          onPress={signOut}>
          Logout
        </Text>
      </View>

      <FlatList
        data={allPosts}
        onRefresh={getAll}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
        style={{
          paddingVertical: 3,
          paddingHorizontal: 3,
        }}
        renderItem={({item: data}) => (
           <View>
          <View
            style={{
              padding: 10,
              borderRadius: 2,
              marginVertical: 5,
              marginHorizontal: 5,
              //   flexDirection: 'row',
              
              justifyContent: 'space-between',
              backgroundColor: COLORS.white,
              elevation: 2,
            }}>


            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
            </View> */}
            <TouchableOpacity
              style={{
                // borderWidth: 1,
                //borderColor: 'green',
                flexDirection: 'row',
                paddingVertical: 5,
                // flexDirection: 'row',
                // alignItems: 'center',
                 justifyContent: 'space-between',
                // backgroundColor: COLORS.white,
                // elevation: 4,
                // paddingHorizontal: 20,
              }}>
                <View style={{
                    flexDirection: 'row',
                }}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                  marginLeft:20,
                  marginRight:20
                }}
                source={require('../../assets/person.png')}
              />
              <View style={{flexDirection: 'column',justifyContent: 'space-between',}}>
                <Text style={{fontSize:14,fontWeight:"bold",margin:0,padding:0,color:'black'}}>{data.username}</Text>
                <Text  style={{fontSize:10,margin:0,padding:0,color:'black'}}>{data.userTitle}</Text>
                <Text style={{fontSize:10,margin:0,padding:0,color:'black'}}>4d. <Ionicons name={"earth-sharp"} size={10} color={"black"} /> </Text>
              </View>
              </View>
               <Entypo name={"dots-three-vertical"} style={{marginTop:10}} size={20} color={"black"} /> 
            </TouchableOpacity>
           
            <Text  style={{fontSize:15,margin:0,padding:0,color:'black'}}>{data.userTitle}</Text>
            
            <Image
              source={{uri: data.image}}
              style={{
                width: 390,
                height: 300,
                // borderWidth: 1,
                // borderColor: 'red',
                alignItems: 'center',
              }}
            />
            
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />
            </View>
            <View style={{flexDirection: 'row',justifyContent: 'space-between',width:380,height:40,marginTop:10,paddingHorizontal:10}} >

                
            <TouchableOpacity style={{flexDirection: 'column',alignItems:'center'}} >
                <SimpleLineIcons name={"like"}  size={20} color={"black"} /> 
                <Text style={{fontSize:10}}>Like</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection: 'column',alignItems:'center'}} >
                <FontAwesome name={"commenting"}  size={20} color={"black"} /> 
                <Text style={{fontSize:10}}>Comment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'column',alignItems:'center'}} >
                <FontAwesome name={"share"}  size={20} color={"black"} /> 
                <Text style={{fontSize:10}}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'column',alignItems:'center'}} >
            <FontAwesome name={"send"}  size={20} color={"black"} /> 
                <Text style={{fontSize:10}}>Send</Text>
            </TouchableOpacity>
                
            </View>
            <View />
          </View>
          </View> 
        )}
      />
    </SafeAreaView>
  );
};

export default HomeTab;
