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

import { connect } from 'react-redux';
import { addUser } from './actions/userAction';

import auth from './firebase/Auth';
import firestore from './firebase/Firestore';
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import * as Animatable from 'react-native-animatable';
import Constants from 'expo-constants';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loadingFont: true
    };
    this._loadingFont = this._loadingFont.bind(this)
  }
  
  getSuccess = (querySnapshot) => {
    let i = 0;
    let docRef;
    querySnapshot.forEach(function (doc) {
      i++;
      docRef = doc.data();
      docRef.id = doc.id;
    });
    this.setState({ user: docRef });
    this.props.add(this.state.user)
    console.log(this.props.user)
    if(this.props.user.age === 0){
      setTimeout(() => {
        this.props.navigation.navigate('FirstMeet')
      }, 1500);
    }
    else {
      setTimeout(() => {
        this.props.navigation.navigate('MyBottomTab', {
          screen: 'Main'
        });
      }, 1500);
    }
  };

  async _loadingFont () {
    await Font.loadAsync({
      indieFlowerRegular: require('./assets/fonts/IndieFlower-Regular.ttf')
    })
    this.setState({ loadingFont: false })
  }

  reject = (error) => {
    console.log(error);
  };

  componentDidMount() {
    console.log(this.props.user)
    auth.listeningCurrentUser(this.listeningUser);
    this._loadingFont()
  }

  listeningUser = (user) => {
    if (user !== null) {
      console.log(user.email);
      firestore.getAccount(user.email, this.getSuccess, this.reject);
    } else {
      setTimeout(() => {
        this.props.navigation.navigate('Login');
      }, 1500);
    }
  };

  render(props) {
    const { navigation } = this.props;
    const { loadingFont } = this.state

    if (loadingFont) {
      return <AppLoading />
    }
    return (
      <ImageBackground 
      style={{
        flex: 1,
        paddingTop: Constants.statusBarHeight,}}
        source={{ uri: 'https://uppic.cc/d/gJskyveO_rbCPuN2QOZqz' }}>
           <View style={{flex:1.5 }}></View>
        <View style={{flex:2.5,alignItems:'center',justifyContent:'center' }}>
        <Image style={styles.image} source={{ uri: 'https://uppic.cc/d/Kd2kdxVlDCeCUJItf834f' }} />
        </View>
        <View style={{flex:1 ,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <Animatable.Text style={styles.textHMC} animation="slideInLeft">H</Animatable.Text>
          <Animatable.Text style={styles.textsmall} animation="fadeIn" delay={500}>ow</Animatable.Text>
        </View>
        <View style={{flex:1 ,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <Animatable.Text style={styles.textHMC} animation="slideInLeft" delay={500}>M</Animatable.Text>
          <Animatable.Text style={styles.textsmall} animation="fadeIn" delay={1000}>any</Animatable.Text>
        </View>
         <View style={{flex:1 ,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <Animatable.Text style={styles.textHMC} animation="slideInLeft" delay={1000}>C</Animatable.Text>
          <Animatable.Text style={styles.textsmall} animation="fadeIn" delay={1500}>alories</Animatable.Text>
        </View>
        <View style={{flex:1.5 }}>
        
        
        </View>
      </ImageBackground>
      
    );
  }
}

const styles = StyleSheet.create({
  textHMC:{
    color: 'white', 
    fontSize: 100,
    //fontWeight:"bold",
    alignSelf:'flex-end'
  },
  textsmall:{
    color: 'white', 
    fontSize: 50,
    //fontWeight:"bold",
    marginBottom:30,
    alignSelf:'flex-end'
  },
  image: {
    flex: 1,
    width: '70%',
    height: '70%',
    borderRadius: 50,
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

export default connect(mapStateToProps, mapDispatchToProps)(Splash);