import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Entypo } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { Foundation } from '@expo/vector-icons';

import Splash from './Splash';
import Chat from './Chat'
import EditProfile from './EditProfile'
import FirstMeet from './FirstMeet'
import Login from './Login'
import Main from './Main'
import NewFood from './NewFood'
import Registration from './Registration'
import Social from './Social'
import Food from './Food'
import AddFriend from './AddFriend'

import configureStore from './Store';
import { Provider } from 'react-redux';

const SplashScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return <Splash navigation={navigation} route={route} />;
};

const ChatScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return <Chat navigation={navigation} route={route} />;
};

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return <EditProfile navigation={navigation} route={route} />;
};

const FirstMeetScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return <FirstMeet navigation={navigation} route={route} />;
};

const LoginScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return <Login navigation={navigation} route={route} />;
};

const MainScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return <Main navigation={navigation} route={route} />;
};

const NewFoodScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return <NewFood navigation={navigation} route={route} />;
};

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return <Registration navigation={navigation} route={route} />;
};

const SocialScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return <Social navigation={navigation} route={route} />;
};

const FoodScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return <Food navigation={navigation} route={route} />;
};

const BottomTab = createBottomTabNavigator();
const MyBottomTab = () => {
  return (
    <BottomTab.Navigator tabBarOptions={{
        activeTintColor: '#FFBA0F',
      }}>
      <BottomTab.Screen
        name="Main"
        component={MainScreen}
        options={{
        tabBarIcon:({color})=>(<Feather name="home" size={28} color={color} />),
        tabBarLabel:"Home",
      }}
      />
      <BottomTab.Screen
        name="Social"
        component={SocialScreen}
        options={{
          tabBarIcon:({color})=>(<Foundation name="social-myspace" size={30} color={color} />)
        }}
      />
      <BottomTab.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          tabBarIcon:({color})=>(<Feather name="edit" size={28} color={color} />),
          tabBarLabel:"Profile"
        }}
      />
    </BottomTab.Navigator>
  );
};

const Stack = createStackNavigator();
const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Splash"
        component={SplashScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Registration"
        component={RegistrationScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="FirstMeet"
        component={FirstMeetScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="MyBottomTab"
        component={MyBottomTab}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Food"
        component={FoodScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="NewFood"
        component={NewFoodScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Chat"
        component={ChatScreen}
      />
    </Stack.Navigator>
  );
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(props) {
    return (
      <Provider store={configureStore}>
        <NavigationContainer>
          <Food />
        </NavigationContainer>
      </Provider>
    );
  }
}