import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';

import firestore from './firebase/Firestore';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Ionicons } from '@expo/vector-icons';
import firebase from './firebase/Firestore';
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons'; 

export default class Chat extends Component {
  constructor(props) {
    super(props);
    const { route } = this.props;
    this.myUser = route.params.myUser;
    this.userFriend = route.params.userFriend;
    this.state = {
      user: this.myUser,
      friend: this.userFriend,
      myEmail: this.myUser.email,
      friendEmail: this.userFriend.email,
      text: null,
      messages: [],
    };
    const { navigation } = this.props;
    this.navigation = navigation;
  }

  componentDidMount() {
    firestore.getAllMessage(
      this.state.myEmail,
      this.state.friendEmail,
      this.getSuccess,
      this.reject
    );
    firestore.listeningMessage(
      this.state.myEmail,
      this.state.friendEmail,
      this.listeningSuccess,
      this.reject
    );
  }

  listeningSuccess = (doc) => {
    console.log('listen');
    this.setState({ messages: this.state.messages.concat(doc.data()) });
  };

  getSuccess = (querySnapshot) => {
    let mes = [];
    querySnapshot.forEach(function (doc) {
      mes.push(doc.data());
    });
    this.setState({ messages: this.state.messages.concat(mes) });
  };

  sendSuccess = (docRef) => {
    console.log(docRef);
    console.log('Send Success');
  };

  reject = (error) => {
    console.log(error);
  };

  onSend = () => {
    this.setState({ text: null })
    if((this.state.text !== null)&&(this.state.text !== '')){
      let messages = {
        sender: this.state.myEmail,
        receiver: this.state.friendEmail,
        message: this.state.text,
        room: this.state.myEmail + this.state.friendEmail,
        date: null,
      };
      firestore.sendMessage(messages, this.sendSuccess, this.reject);
    }
  };

  Header = () => {
    return (
      <View style={styles.header}>
        <Feather name="chevron-left" size={35} color="white" style={{backgroundColor:'black' ,borderRadius:18,marginLeft:'5%'}}/>
        <TouchableOpacity >
          <Text
            style={styles.headerText}
            onPress={() =>
              this.props.navigation.navigate('MyBottomTab', {
                screen: 'Social',
              })
            }>
            {this.state.friend.username}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderItem = ({ item }) => {
    return (
      <View>
        {item.sender === this.state.myEmail && (
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Text style={styles.txtSender}>{item.message}</Text>
          </View>
        )}
        {item.sender !== this.state.myEmail && (
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={styles.image}
              source={{
                uri: this.state.friend.userPic,
              }}
            />
            <Text style={styles.txtReceiver}>{item.message}</Text>
          </View>
        )}
      </View>
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 8,
        }}
      />
    );
  };

  render(props) {
    return (
      <ImageBackground source={{ uri: 'https://uppic.cc/d/j7q-FrYJm4lAyWwsGHdkl' }}
      style={{
        flex: 1,
        paddingTop: Constants.statusBarHeight,
      }}>
        <this.Header />
        <View style={{ flex: 1, padding: 8 ,backgroundColor:'#ffffffc0'}}>
          <View style={styles.content}>
            <FlatList
              data={this.state.messages}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={this.renderSeparator}
              ref={(ref) => {
                this.flatListRef = ref;
              }}
              onContentSizeChange={() => this.flatListRef.scrollToEnd()}
            />
          </View>

          <View style={styles.chatContent}>
            <TextInput
              placeholder="Message"
              style={styles.textInput}
              value={this.state.text}
              onChangeText={(txt) => {
                this.setState({ text: txt });
              }}
            />

            <TouchableOpacity onPress={this.onSend}>
              <MaterialCommunityIcons
                name="send-circle"
                size={40}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    flex: 1,
    borderColor: 'gray',
    paddingStart: 20,
  },
  content: {
    flex: 1,
    padding: 8,
    marginBottom: 8,
    width: '100%',
  },
  chatContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor:'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    
  },
  txtReceiver: {
    flexWrap: 'wrap',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 1,
    padding: 8,
    marginLeft: 4,
    flexShrink: 1,
    borderColor: 'black',
    backgroundColor:'#ffd05b',
    alignSelf:'center'
  },
  txtSender: {
    flexWrap: 'wrap',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 1,
    padding: 8,
    //flexShrink: 1,
    borderColor: 'black',
    backgroundColor:'white'
  },
  header: {
    flexDirection: 'row',
    
    alignItems: 'center',
    height: 70,
    borderBottomWidth: 3,
    borderBottomColor: 'white',
    backgroundColor:'white'
  },
  headerText: {
    fontSize: 25,
    marginLeft:'10%',
    color:'black',
    fontWeight:'bold'
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 100,
  },
});
