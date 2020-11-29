//Login.js
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
  Alert,
} from 'react-native';
import auth from './firebase/Auth';
import firestore from './firebase/Firestore';

import { connect } from 'react-redux';
import { addUser } from './actions/userAction';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      user: null,
    };
  }

  getSuccess = (querySnapshot) => {
    let i = 0;
    let docRef;
    querySnapshot.forEach(function (doc) {
      i++;
      docRef = doc.data();
      docRef.id = doc.id;
    });
    console.log(docRef);
    this.setState({ user: docRef });
    this.props.add(this.state.user);
    console.log(this.props.user)
    if (this.props.user.age === 0) {
      this.props.navigation.navigate('FirstMeet');
    } else {
      this.props.navigation.navigate('MyBottomTab', {
        screen: 'Main'
      });
    }
  };

  componentDidMount() {
    auth.listeningCurrentUser(this.listeningUser);
  }

  listeningUser = (user) => {
    if (user !== null) {
      console.log(user.email);
      firestore.getAccount(user.email, this.getSuccess, this.reject);
    }
  };

  onReject = (error) => {
    console.log(error);
  };

  onLogin = () => {
    auth.signIn(this.state.email, this.state.password, this.onReject);
  };

  render(props) {
    const { navigation } = this.props;
    return (
        <ImageBackground
        source={{ uri: 'https://uppic.cc/d/9ZK4h9V2Dc59JvT_bg70h' }}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: Constants.statusBarHeight,
        }}

        >
        <View style={{ flex: 1 }}></View>
        <View style={styles.middle}>
          
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            onChangeText={(text) => this.setState({ email: text })}
          />
          <TextInput
            placeholder="Password"
            style={styles.textInput}
            secureTextEntry={true}
            onChangeText={(text) => this.setState({ password: text })}
          />
          <TouchableOpacity style={styles.buttonLogin} onPress={this.onLogin}>
            <Text style={{ fontSize: 15 }}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonRegister}
            onPress={() => this.props.navigation.navigate('Registration')}>
            <Text style={styles.text}>Registration</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      height: '90%',
      width: '100%',
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1.5,
      borderTopLeftRadius:100,
    },
    middle: {
      backgroundColor: 'white',
      borderWidth: 1,
      flex: 2,
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
    },
    image: {
      width: 120,
      height: 120,
      resizeMode: 'contain',
      alignSelf: 'center',
      marginBottom: 8,
    },
    imageBackground: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    buttonLogin: {
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffd05b',
      borderRadius: 25,
      height: 50,
      marginBottom: 8,
      width: '40%',
    },
    buttonRegister: {
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    textInput: {
      marginTop:10,
      height: 45,
      fontSize:18,
      width: '80%',
      marginLeft:"2%",
      marginRight:"2%",
      borderBottomColor: "black",
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    text: {
      fontSize: 12,
      textDecorationLine: 'underline',
      color: 'blue',
      marginBottom: 16,
    },
  });
const mapDispatchToProps = (dispatch) => {
  return {
    add: (user) => dispatch(addUser(user)),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);