import React from 'react';
import Home from '../screens/Home/HomeTab';
import JobsScreen from '../screens/Home/JobsTab';
import MyNetworkScreen from '../screens/Home/MyNetworkTab';
import NotificationScreen from '../screens/Home/NotificationTab';
import PostScreen from '../screens/Home/PostTab';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import FontAwesome from 'react-native-vector-icons/FontAwesome';

//import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//const Tab = createMaterialBottomTabNavigator();
const Tab = createBottomTabNavigator();

export default function HomeScreen(props) {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home';
          } else if (route.name === 'MyNetwork') {
            iconName = focused ? 'people' : 'people';
          } else if (route.name === 'Notification') {
            iconName = focused ? 'ios-notifications' : 'notifications-sharp';
          } else if (route.name === 'Post') {
            iconName = focused ? 'add' : 'add';
          } else if (route.name === 'Jobs') {
            iconName = focused ? 'briefcase-sharp' : 'briefcase';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="MyNetwork" component={MyNetworkStackScreen} />
      <Tab.Screen
        name="Post"
        component={PostStackScreen}
        listeners={({navigation}) => ({
          //   tabPress: event => {
          //     event.preventDefault(); //preventing dafault.
          //     navigation.openDrawer(); //calling custom
          //   },
        })}
      />
      <Tab.Screen name="Notification" component={NotificationStackScreen} />
      <Tab.Screen name="Jobs" component={JobsStackScreen} />
    </Tab.Navigator>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Homes"
        component={Home}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
}

const JobsStack = createStackNavigator();

function JobsStackScreen() {
  return (
    <JobsStack.Navigator>
      <JobsStack.Screen
        name="Jobss"
        component={JobsScreen}
        options={{headerShown: false}}
      />
    </JobsStack.Navigator>
  );
}

const NotificationStack = createStackNavigator();

function NotificationStackScreen() {
  return (
    <NotificationStack.Navigator>
      <NotificationStack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{headerShown: false}}
      />
    </NotificationStack.Navigator>
  );
}

const PostStack = createStackNavigator();

function PostStackScreen() {
  return (
    <PostStack.Navigator>
      <PostStack.Screen
        name="Posts"
        component={PostScreen}
        options={{headerShown: false}}
      />
    </PostStack.Navigator>
  );
}

const MyNetworkStack = createStackNavigator();

function MyNetworkStackScreen() {
  return (
    <MyNetworkStack.Navigator>
      <MyNetworkStack.Screen
        name="MyNetworks"
        component={MyNetworkScreen}
        options={{headerShown: false}}
      />
    </MyNetworkStack.Navigator>
  );
}


// import {signOut} from '../utils/auth';
// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   StatusBar,
//   FlatList,
//   TouchableOpacity,
// } from 'react-native';
// import FormButton from '../components/shared/FormButton';
// import {COLORS} from '../constants/theme';
// import {getQuizzes} from '../utils/database.js';

// const HomeScreen = ({navigation}) => {
//   const [allQuizzes, setAllQuizzes] = useState([]);
//   const [refreshing, setRefreshing] = useState(false);

//   const getAllQuizzes = async () => {
//     setRefreshing(true);
//     const quizzes = await getQuizzes();

//     // Transform quiz data
//     let tempQuizzes = [];
//     await quizzes.docs.forEach(async quiz => {
//       await tempQuizzes.push({id: quiz.id, ...quiz.data()});
//     });
//     await setAllQuizzes([...tempQuizzes]);

//     setRefreshing(false);
//   };

//   useEffect(() => {
//     getAllQuizzes();
//   }, []);
//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         backgroundColor: COLORS.background,
//         position: 'relative',
//       }}>
//       <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />

//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           backgroundColor: COLORS.white,
//           elevation: 4,
//           paddingHorizontal: 20,
//         }}>
//         <Text style={{fontSize: 20, color: COLORS.black}}>Quiz App</Text>
//         <Text
//           style={{
//             fontSize: 20,
//             padding: 10,
//             color: COLORS.error,
//           }}
//           onPress={signOut}>
//           Logout
//         </Text>
//       </View>

//       {/* Quiz list */}
//       <FlatList
//         data={allQuizzes}
//         onRefresh={getAllQuizzes}
//         refreshing={refreshing}
//         showsVerticalScrollIndicator={false}
//         style={{
//           paddingVertical: 20,
//           paddingHorizontal: 10
//         }}
//         renderItem={({item: quiz}) => (
//           <View
//             style={{
//               padding: 50,
//               borderRadius: 10,
//               marginVertical: 5,
//               marginHorizontal: 10,
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               backgroundColor: COLORS.white,
//               elevation: 2,
//             }}>
//             <View style={{flex: 1, paddingRight: 10}}>
//               <Text style={{fontSize: 18, color: COLORS.black}}>
//                 {quiz.title}
//               </Text>
//               {quiz.description != '' ? (
//                 <Text style={{opacity: 0.5}}>{quiz.description}</Text>
//               ) : null}
//             </View>
//             <TouchableOpacity
//               style={{
//                 paddingVertical: 10,
//                 paddingHorizontal: 30,
//                 borderRadius: 50,
//                 backgroundColor: COLORS.primary +10,
//               }}
//               onPress={() => {
//                 navigation.navigate('PlayQuizScreen', {
//                   quizId: quiz.id,
//                 });
//               }}>
//               <Text style={{color: COLORS.primary}}>Play</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       />

//       {/* Button */}
//       <FormButton
//         labelText="Create Quiz"
//         style={{
//           position: 'absolute',
//           bottom: 20,
//           right: 20,
//           borderRadius: 50,
//           paddingHorizontal: 30,
//         }}
//         handleOnPress={() => navigation.navigate('CreateQuizScreen')}
//       />
//     </SafeAreaView>
//   );
// };

// export default HomeScreen;
