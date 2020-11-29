//Main.js
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
import { connect } from 'react-redux';
import { addUser } from './actions/userAction';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import firestore from './firebase/Firestore';

import * as Animatable from 'react-native-animatable';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodList: [],
    };
    console.log(this.props.user);
    firestore.getAllLimitFood(this.getSuccess, this.reject);
  }

  getSuccess = (querySnapshot) => {
    let i = 0;
    let docRef;
    let foodList = [];
    querySnapshot.forEach(function (doc) {
      i++;
      docRef = doc.data();
      docRef.id = doc.id;
      foodList = foodList.concat(docRef);
      console.log(foodList);
    });
    this.setState({ foodList: foodList });
    console.log(this.state.foodList);
  };

  reject = (error) => {
    console.log(error);
  };

  renderItem = ({ item }) => {
    return (
      <Animatable.View
        animation="fadeInUp"
        delay={500}
        style={{
          flex: 1,
          margin: 6,
          width: 270,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fffffff0',
          borderRadius: 50,
        }}>
        <View>
          <Image style={styles.image} source={{ uri: item.foodUri }} />
        </View>
        <View
          style={{
            marginTop: '2%',
            borderTopWidth: 2,
            borderTopColor: 'black',
            width: '80%',
            padding: '3%',
          }}>
          <Text
            style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 20 }}>
            {item.foodName}
          </Text>
          <Text
            style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 20 }}>
            {item.foodCal} kcal.
          </Text>
        </View>
      </Animatable.View>
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
        <Animatable.View
          style={{
            flexDirection: 'row',
            flex: 1,
            backgroundColor: '#ffffff',
            borderBottomLeftRadius: 35,
            borderBottomRightRadius: 35,
            alignItems: 'center',
          }}
          animation="fadeInDown"
          delay={1}>
          <View
            style={{
              flex: 2,
              justifyContent: 'flex-start',
              marginLeft: '15%',
            }}>
            <Text style={{ textAlign: 'center', fontSize: 25, width: '100%' }}>
              YOUR
            </Text>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>
              CALORIE GOAL IS
            </Text>
            <Text style={{ textAlign: 'center', fontSize: 35 }}>
              {this.props.user.cal}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              marginRight: '5%',
            }}>
            <Image
              style={styles.imagePic}
              source={{
                uri: this.props.user.userPic,
              }}
            />
          </View>
        </Animatable.View>

        <View style={styles.middle}>
          <Animatable.Text
            animation="fadeIn"
            delay={500}
            style={{
              textAlign: 'center',
              fontSize: 35,
              color: 'white',
              backgroundColor: '#ff000e',
              marginTop: '2%',
              width: '200%',
            }}>
            HIGHLIGHT
          </Animatable.Text>
          <FlatList
            data={this.state.foodList}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>
        <Animatable.View
          animation="fadeInUp"
          style={{
            flex: 0.4,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
            //marginTop: '5%',
            width: '100%',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#ffd05b',
              flexDirection: 'row',
              height: '80%',
              width: '90%',
              alignItems: 'center',
              borderRadius: 50,
              paddingLeft: '5%',
              justifyContent: 'center',
            }}
            onPress={() => this.props.navigation.navigate('Food')}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  flex: 1,
                  textAlign: 'center',
                  paddingLeft: '5%',
                }}>
                TAP FOR MORE FOOD
              </Text>
              <View style={{ paddingRight: '5%' }}>
                <MaterialCommunityIcons
                  name="unfold-more-horizontal"
                  size={30}
                  color="black"
                />
              </View>
            </View>
          </TouchableOpacity>
        </Animatable.View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  middle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    marginLeft: 16,
    marginRight: 16,
    flex: 2.5,
  },
  image: {
    width: 270,
    height: 150,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  imagePic: {
    width: 100,
    height: 100,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: 'black',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  buttonLogin: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 25,
    height: 50,
    marginBottom: 8,
  },
  textInput: {
    borderRadius: 25,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingStart: 20,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    textDecorationLine: 'underline',
    color: 'blue',
  },
  showCal: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    height: 50,
    marginBottom: 8,
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
