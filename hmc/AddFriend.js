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
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import firestore from './firebase/Firestore';

class AddFriend extends Component {
  constructor(props) {
    super(props);
    const { route } = this.props;
    this.user = route.params.user;
    this.state = {
      user: this.user,
      friendEmail: null,
      userList: null,
    };
  }

  getSuccess = (querySnapshot) => {
    let i = 0;
    let docRef;
    let userList = [];
    querySnapshot.forEach(function (doc) {
      i++;
      docRef = doc.data();
      docRef.id = doc.id;
      userList = userList.concat(docRef);
      console.log(userList);
    });
    this.setState({ userList: userList });
    console.log(this.state.userList);
  };

  reject = (error) => {
    console.log(error);
  };

  onSearch = () => {
    firestore.getAccount(this.state.friendEmail, this.getSuccess, this.reject);
  };

  onAddFriend = () => {
    
  }

  renderItem = ({ item }) => {
    return (
      <View>
        <Image style={styles.image} source={{ uri: item.userPic }} />
        <View style={{ flex: 2 }}>
          <Text>Username: {item.username}</Text>
        </View>
        <TouchableOpacity style={styles.add} onPress={this.onAddFriend}>
          <Text>ADD</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render(props) {
    return (
      <ImageBackground
        style={styles.imageBackground}
        source={{ uri: 'https://uppic.cc/d/6cgv_NY_FljeGmILkA5mp' }}
        blurRadius={1}>
        <View style={{ paddingTop: 5, borderRadius: 50, flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ width: '10%', marginTop: 2, marginLeft: '2%' }}
            onPress={() =>
              this.props.navigation.navigate('MyBottomTab', {
                screen: 'Social',
              })
            }>
            <AntDesign name="back" size={35} color="black" />
          </TouchableOpacity>

          <TextInput
            placeholderTextColor="black"
            placeholder="Email"
            style={styles.textInput}
            onChangeText={(text) => this.setState({ friendEmail: text })}
          />

          <TouchableOpacity
            style={{ width: '10%', marginTop: 2 }}
            onPress={this.onSearch}>
            <Ionicons name="ios-add-circle" size={35} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.middle}>
          <View style={{ flexDirection: 'row', marginBottom: 16 }}>
            <FlatList
              data={this.state.userList}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={this.renderSeparator}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  middle: {
    backgroundColor: 'pink',
    padding: 16,
    margin: 16,
    borderRadius: 50,
    flex: 4,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: '2%',
    width: '68%',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default AddFriend;
