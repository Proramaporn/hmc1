//Registration.js
import React, { Component } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
  Image,
  Button,
  ImageBackground,
  TextInput,
} from 'react-native';
import Constants from 'expo-constants';
import auth from './firebase/Auth';
import firestore from './firebase/Firestore';

import * as Animatable from 'react-native-animatable';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      firstname: null,
      lastname: null,
      email: null,
      password: null,
    };
  }

  addSuccess = (docRef) => {
    console.log(docRef.id);
    this.props.navigation.navigate('Login');
  };

  createSuccess = () => {
    const user = {
      username: this.state.username,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      age: 0,
      gender: 0,
      weight: 0,
      height: 0,
      activity: 0,
      cal: 0,
      userPic: null,
    };
    firestore.addAccount(user, this.addSuccess, this.reject);
  };

  reject = (error) => {
    console.log(error);
  };

  onRegis = () => {
    auth.createUser(
      this.state.email,
      this.state.password,
      this.createSuccess,
      this.reject
    );
  };

  render(props) {
    const { navigation } = this.props;
    return (
      <ImageBackground
        source={{ uri: 'https://uppic.cc/d/9ZK4h9V2Dc59JvT_bg70h' }}
        style={{
          flex: 1,
          paddingTop: Constants.statusBarHeight,
        }}>
        <View style={{ flex: 0.5, width: '100%', height: '100%' }}></View>

        <Animatable.View style={styles.container} animation="fadeInLeftBig">
          <Animatable.View
            animation="fadeIn"
            style={{ flexDirection: 'row', flex: 1 }}
            delay={1000}>
            <Text style={{ fontSize: 25, height: '80%', margin: '5%' }}>
              CREATE ACCOUNT
            </Text>
          </Animatable.View>

          <Animatable.View
            style={{
              flexDirection: 'row',
              flex: 1,
              height: '80%',
              alignItems: 'flex-end',
            }}
            animation="fadeIn"
            delay={1500}>
            <Text style={styles.textHead}>USER NAME</Text>
            <TextInput
              placeholder="Username"
              style={styles.textInput}
              onChangeText={(text) => {
                this.setState({ username: text });
              }}
            />
          </Animatable.View>

          <Animatable.View
            style={{
              flexDirection: 'row',
              flex: 1,
              height: '80%',
              alignItems: 'flex-end',
            }}
            animation="fadeIn"
            delay={1500}>
            <Text style={styles.textHead}>FIRST NAME</Text>
            <TextInput
              placeholder="First Name"
              style={styles.textInput}
              onChangeText={(text) => {
                this.setState({ firstname: text });
              }}
            />
          </Animatable.View>

          <Animatable.View
            style={{
              flexDirection: 'row',
              flex: 1,
              height: '80%',
              alignItems: 'flex-end',
            }}
            animation="fadeIn"
            delay={1500}>
            <Text style={styles.textHead}>LASR NAME</Text>
            <TextInput
              placeholder="Last Name"
              style={styles.textInput}
              onChangeText={(text) => {
                this.setState({ lastname: text });
              }}
            />
          </Animatable.View>

          <Animatable.View
            style={{
              flexDirection: 'row',
              flex: 1,
              height: '80%',
              alignItems: 'flex-end',
            }}
            animation="fadeIn"
            delay={1500}>
            <Text style={styles.textHead}>EMAIL</Text>
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              onChangeText={(text) => {
                this.setState({ email: text });
              }}
            />
          </Animatable.View>

          <Animatable.View
            style={{
              flexDirection: 'row',
              flex: 1,
              height: '80%',
              alignItems: 'flex-end',
            }}
            animation="fadeIn"
            delay={1500}>
            <Text style={styles.textHead}>PASS WORD</Text>
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({ password: text });
              }}
            />
          </Animatable.View>

          <Animatable.View
            style={{ flexDirection: 'row', flex: 1, height: '100%' }}
            animation="fadeIn"
            delay={2000}>
            <TouchableOpacity style={styles.buttonRegis} onPress={this.onRegis}>
              <Text style={{ fontSize: 15 }}>Registor</Text>
            </TouchableOpacity>
          </Animatable.View>
        </Animatable.View>

        <View style={{ flex: 1, justifyContent: 'flex-end', marginTop: '5%' }}>
          <Animatable.View
            style={{
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
              height: '80%',
              backgroundColor: '#ffd05b',
              marginRight: '55%',
              borderTopRightRadius: 100,
              borderBottomRightRadius: 100,
            }}
            animation="fadeIn"
            delay={2500}>
            <TouchableOpacity
              style={{ flex: 1, alignItems: 'center' }}
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={styles.text}>Cencel</Text>
            </TouchableOpacity>
          </Animatable.View>

          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 1 }}></View>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: '90%',
    width: '100%',
    marginRight: '5%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 3,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    padding: '5%',
  },

  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 8,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  buttonRegis: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffd05b',
    borderRadius: 25,
    height: '80%',
    marginBottom: 8,
    width: '40%',
  },
  textInput: {
    height: '80%',
    fontSize: 18,
    width: '80%',
    marginLeft: '2%',
    marginRight: '2%',
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  text: {
    fontSize: 15,
    textDecorationLine: 'underline',
    color: 'black',
  },
  textHead: {
    fontSize: 10,
    color: 'gray',
    width: '10%',
    //marginBottom:'5%',
  },
});

export default Registration;
