//Social
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
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import firestore from './firebase/Firestore';
import { connect } from 'react-redux';
import { addUser } from './actions/userAction';

class Social extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      friendUser: null,
      friendEmail: null,
      friendUsername: null,
      friendList: [],
      userList: [],
    };
  }

  listeningSuccess = (doc) => {
    console.log('listen');
    this.setState({ friendList: this.state.friendList.concat(doc.data()) });
    console.log(this.state.friendList);
  };

  componentDidMount() {
    firestore.listeningAddFriend(
      this.state.user,
      this.listeningSuccess,
      this.reject
    );
  }

  addSuccess = () => {
    console.log('Add Friend Success');
  };

  getSuccess = (querySnapshot) => {
    let docRef;
    querySnapshot.forEach(function (doc) {
      docRef = doc.data();
      docRef.id = doc.id;
    });
    console.log(docRef.email);
    this.setState({ friendUser: docRef });
    firestore.addFriendWithID(
      this.state.user,
      this.state.friendUser,
      this.addSuccess,
      this.reject
    );
    firestore.addFriendWithID(
      this.state.friendUser,
      this.state.user,
      this.addSuccess,
      this.reject
    );
  };

  getSuccess2 = (querySnapshot) => {
    let docRef = [];
    querySnapshot.forEach(function (doc) {
      docRef = docRef.concat(doc.data())
    });
    this.setState({userList: docRef})
  };

  reject = (error) => {
    console.log(error);
  };

  onAddFriend = (email) => {
    firestore.getAccount(email, this.getSuccess, this.reject);
  };

  onSearch = () => {
    this.setState({ friendUsername: null })
    firestore.getAccountByUsername(this.state.friendUsername, this.getSuccess2, this.reject)
  }

  renderItem = ({ item }) => {
    return (
      <View style={{flexDirection: 'row', margin: 6 ,height:180}}>
        <View style={{ flex: 4, backgroundColor: '#fffffff0', borderBottomLeftRadius: 50, borderTopLeftRadius: 50, borderRightWidth: 2, borderRightColor: 'black' }}>
          <View style={{justifyContent:'center',alignItems:'center',marginTop:'5%'}}>
            <View >
              <Image style={styles.image1} source={{uri:item.userPic}}/>
            </View>
            <View style={{marginTop:'2%',marginBottom:'5%'}}>
              <Text style={{fontWeight: 'bold',textAlign:'center',fontSize:20}}>{item.username}</Text>
              <Text>({item.email})</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={{flex: 1, backgroundColor: '#fffffff0', borderBottomRightRadius: 50, borderTopRightRadius: 50, justifyContent: 'center', alignItems: 'center'}}
        onPress={()=>this.onAddFriend(item.email)}>
          <Ionicons name="ios-add-circle" size={50} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  renderItem2 = ({ item }) => {
    return (
      <View style={{}}>
        <TouchableOpacity
          style={{ flexDirection: 'row', margin: 6 }}
          onPress={() =>
            this.props.navigation.navigate('Chat', {
              myUser: this.state.user,
              userFriend: item,
            })
          }>
          <View>
            <Image style={styles.image} source={{uri:item.userPic}}/>
            <Text style={{fontWeight: 'bold', textAlign: 'center'}}>{item.username}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render(props) {
    return (
      <ImageBackground
        source={{ uri: 'https://uppic.cc/d/AjcmoyD0tPgRjxykr9S_A' }}
        style={{
          flex: 1,
          paddingTop: Constants.statusBarHeight,
          resizeMode: "cover",
          justifyContent: "center"
        }}>
        <View style={{ flex: 1, paddingTop: 5, backgroundColor: "#ffffff", justifyContent: 'center', borderBottomRightRadius: 50, borderTopRightRadius: 50, marginRight: '3%'}}>
          <Text
            style={{
              flex: 1,
              fontSize: 30,
              fontWeight: 'bold',
              paddingLeft: '10%'
            }}>
            FRIENDS
          </Text>
          <View style={{flex: 2.5,marginRight:'3%', }}>
            <FlatList
              data={this.state.friendList}
              renderItem={this.renderItem2}
              ItemSeparatorComponent={this.renderSeparator}
              horizontal={true}
            />
          </View>
        </View>
        <View style={styles.middle}>
          <FlatList
            data={this.state.userList}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>
        <View
          style={{
            flex: 0.4,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            //borderTopLeftRadius: 35,
            //borderTopRightRadius: 35,
            marginTop: '5%',
            width: '100%',
          }}>
          <View style={{backgroundColor: '#ffd05b', flexDirection: 'row', height: '80%', width: '90%', alignItems: 'center', borderRadius: 50, paddingLeft: '5%'}}>
            <TextInput
              placeholderTextColor="black"
              placeholder="SEARCH (USERNAME)"
              style={styles.textInput}
              value={this.state.friendUsername}
              onChangeText={(text) => this.setState({ friendUsername: text })}
            />
            <TouchableOpacity
              onPress={this.onSearch}>
              <FontAwesome name="search" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  middle: {
    //backgroundColor: '#ffffffa0',
    padding: 16,
    margin: 16,
    borderRadius: 50,
    flex: 2.5,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 80,
    backgroundColor: 'pink',
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'black'
  },
  image1: {
    width: 110,
    height: 110,
    backgroundColor: 'pink',
    borderRadius: 60,
    alignSelf:'center',
    borderWidth: 2,
    borderColor: 'black'
  },
  textInput: {
    //marginTop: 10,
    height: '80%',
    fontSize: 18,
    width: '80%',
    marginLeft: '2%',
    marginRight: '2%',
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
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

export default connect(mapStateToProps, mapDispatchToProps)(Social);