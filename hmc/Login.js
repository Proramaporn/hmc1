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

import * as Animatable from 'react-native-animatable';
import Constants from 'expo-constants';

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
    console.log(this.props.user);
    if (this.props.user.age === 0) {
      this.props.navigation.navigate('FirstMeet');
    } else {
      this.props.navigation.navigate('MyBottomTab', {
        screen: 'Main',
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
          paddingTop: Constants.statusBarHeight,
          
        }}>
        <View style={{ flex: 1,width:'100%',height:"100%", }}>
          
        </View>

        <Animatable.View style={styles.container} animation="fadeInRightBig">
          <Animatable.View
            animation="fadeIn"
            style={{ flexDirection: 'row' ,flex:1}}
            delay={1000}>
            <Text style={{ fontSize: 25 ,height:'80%',margin:'5%'}}>WELCOME</Text>
          </Animatable.View>

          <Animatable.View style={{ flexDirection: 'row' ,flex:0.2,height:'80%'}} animation="fadeIn"
            delay={1500}>
            <Text style={styles.textHead}>EMAIL</Text>
          </Animatable.View>
          
          <Animatable.View
            style={{ flexDirection: 'row' ,flex:1,height:'80%'}}
            animation="fadeIn"
            delay={1500}>
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              onChangeText={(text) => this.setState({ email: text })}
            />
          </Animatable.View>

          <Animatable.View style={{ flexDirection: 'row' ,flex:0.2,height:'80%'}} animation="fadeIn"
            delay={2000}>
            <Text style={styles.textHead}>PASSWORD</Text>
          </Animatable.View>
          <Animatable.View
            style={{ flexDirection: 'row' ,flex:1,height:'80%'}}
            animation="fadeIn"
            delay={2000}>
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              secureTextEntry={true}
              onChangeText={(text) => this.setState({ password: text })}
            />
          </Animatable.View>

          <Animatable.View
            style={{ flexDirection: 'row' ,flex:1,height:'100%'}}
            animation="fadeIn"
            delay={2500}>
            <TouchableOpacity style={styles.buttonLogin} onPress={this.onLogin}>
              <Text style={{ fontSize: 15 }}>Login</Text>
            </TouchableOpacity>
          </Animatable.View>

          
        </Animatable.View>
        <View style={{ flex: 1 ,justifyContent:'flex-end',marginTop:'5%'}}>
          
        <Animatable.View
            style={{ flexDirection: 'row',flex:1,alignItems:'center',height:'80%',backgroundColor:'#ffd05b',marginLeft:'55%',borderTopLeftRadius: 100,
            borderBottomLeftRadius: 100,}}
            animation="fadeIn"
            delay={3000}>
  
              <TouchableOpacity
              style={{flex:1, alignItems:'center'}}
              onPress={() => this.props.navigation.navigate('Registration')}>
              <Text style={styles.text}>Create Your Account</Text>
            </TouchableOpacity>
   
          </Animatable.View>

            <View style={{flex:1}}></View>
            <View style={{flex:1}}></View>
        </View>
        
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '90%',
    width: '100%',
    marginLeft:'5%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1.5,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    padding:'5%'
    
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
    height:'80%',
    marginBottom: 8,
    width: '40%',
  },
  
  textInput: {
    height:'80%',
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
    width: '80%',
    marginBottom: "-5%",
    marginTop: '1.%',
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
