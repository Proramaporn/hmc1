//FirstMeet
import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Picker,
} from 'react-native';

import firestore from './firebase/Firestore';
import storage from './firebase/Storage';
import * as ImagePicker from 'expo-image-picker';

import { connect } from 'react-redux';
import { editUser } from './actions/userAction';


import * as Animatable from 'react-native-animatable';
import Constants from 'expo-constants';


class FirstMeet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      username: this.props.user.username,
      firstname: this.props.user.firstname,
      lastname: this.props.user.lastname,
      age: this.props.user.age,
      gender: 66,
      weight: this.props.user.weight,
      height: this.props.user.height,
      activity: 1.2,
      cal: this.props.user.cal,
      userPic: this.props.user.userPic,
    };
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      allowsEditing: true,
      quality: 0.5,
    });
    console.log(result.uri);
    if (!result.cancelled) {
      this.setState({ userPic: result.uri });
      this.uploadImage()
    }
  };

  uploadSuccess = (uri) => {
    console.log('Upload Success');
    console.log(uri);
    this.setState({ userPic: uri });
  };

  uploadImage = () => {
    console.log('uploading...')
    storage.uploadToFirebase2(
      this.state.userPic,
      this.state.user.email,
      this.uploadSuccess,
      this.reject
    );
  };

  updateGender = (gender) => {
    this.setState({ gender: gender });
  };

  updateActivity = (activity) => {
    this.setState({ activity: activity });
  };

  updateSuccess = () => {
    console.log('Update Account Success');
    this.props.navigation.navigate('MyBottomTab');
  };

  reject = (error) => {
    console.log(error);
  };

  onDone = () => {
    console.log('edit')
    let user = this.state.user;
    user.username = this.state.username;
    user.firstname = this.state.firstname;
    user.lastname = this.state.lastname;
    user.age = Number(this.state.age);
    user.gender = Number(this.state.gender);
    user.weight = Number(this.state.weight);
    user.height = Number(this.state.height);
    user.activity = Number(this.state.activity);
    if (Number(this.state.gender) === 66)
      user.cal =
        (66 +
          13.7 * Number(this.state.weight) +
          5 * Number(this.state.height) -
          6.8 * Number(this.state.age)) *
        Number(this.state.activity);
    if (Number(this.state.gender) === 665)
      user.cal =
        (665 +
          9.6 * Number(this.state.weight) +
          1.8 * Number(this.state.height) -
          4.7 * Number(this.state.age)) *
        Number(this.state.activity);
    user.cal = Math.round(user.cal);
    user.userPic = this.state.userPic;
    this.setState({ user: user });
    this.props.edit(this.state.user);
    console.log(this.props.user)
    firestore.updateAccountByID(
      this.state.user,
      this.updateSuccess,
      this.reject
    );
  };

  render(props) {
    const { navigation } = this.props;
    return (
      <ImageBackground
      source={{ uri: 'https://uppic.cc/d/wQcfN5mQ_SZ0vQShlkn29' }}
      style={{
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '5%',
          }}>
          <TouchableOpacity onPress={this.pickImage}>
          <Image
                style={styles.image}
                source={{
                  uri: this.state.userPic,
                }}
              />
          </TouchableOpacity>
        </View>

        <Animatable.View style={styles.container} animation="fadeInLeftBig">
        <Animatable.View
            animation="fadeIn"
            style={{
              flex: 1,
              flexDirection: 'row',
              height: '80%',
              alignItems: 'center',
            }}
            delay={1000}>
            <Text style={{ fontSize: 25 ,height:'80%',margin:'5%'}}>Need some infometion</Text>
          </Animatable.View>
          
          <Animatable.View style={{
              flexDirection: 'row',
              flex: 1,
              height: '80%',
              alignItems: 'flex-end',
            }}
              animation="fadeIn"
            delay={1500}>
              <Text style={styles.textHead}>AGE</Text>
            <TextInput
              style={styles.textInput}
              placeholder={'Age'}
              placeholderTextColor="lightgray"
              onChangeText={(text) => this.setState({ age: text })}
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
              <Text style={styles.textHead}>GENDER</Text>
            <Picker
              style={styles.textInput}
              selectedValue={this.state.gender}
              onValueChange={this.updateGender}>
              <Picker.Item label="Male" value={66} />
              <Picker.Item label="Female" value={665} />
            </Picker>
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
              <Text style={styles.textHead}>WEIGHT (kg.)</Text>
            <TextInput
              style={styles.textInput}
              placeholder={'Weight(kg.)'}
              placeholderTextColor="lightgray"
              onChangeText={(text) => this.setState({ weight: text })}
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
              <Text style={styles.textHead}>HEIGHT (cm.) </Text>
            <TextInput
              style={styles.textInput}
              placeholder={'Height(cm.)'}
              placeholderTextColor="lightgray"
              onChangeText={(text) => this.setState({ height: text })}
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
              <Text style={styles.textHead}>ACTIVITY </Text>
            <Picker
              style={styles.textInput}
              selectedValue={this.state.activity}
              onValueChange={this.updateActivity}>
              <Picker.Item label="Sedentary" value={1.2} />
              <Picker.Item label="Lightly Active" value={1.375} />
              <Picker.Item label="Moderately Active" value={1.55} />
              <Picker.Item label="Very Active" value={1.725} />
              <Picker.Item label="Extremely Active" value={1.9} />
            </Picker>
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
            {this.state.activity === 1.2 && <Text>*little to no exercise</Text>}
            {this.state.activity === 1.375 && (
              <Text>*light exercise 1-3 days / week</Text>
            )}
            {this.state.activity === 1.55 && (
              <Text>*moderate exercise 3-5 days / week</Text>
            )}
            {this.state.activity === 1.725 && (
              <Text>*heavy exercise 6-7 days / week</Text>
            )}
            {this.state.activity === 1.9 && (
              <Text>
                *very heavy exercise, hard labor job, training 2x / day
              </Text>
            )}
          </Animatable.View>
            
          <Animatable.View 
        style={{ flexDirection: 'row' ,flex:1,height:'100%'}}
        animation="fadeIn"
        delay={2500}>
          <TouchableOpacity style={styles.buttonDone} onPress={this.onDone}>
            <Text>Done</Text>
          </TouchableOpacity>
          </Animatable.View>
          
        </Animatable.View>
        <View style={{flex:1}}></View>
           
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
  textInput: {
    marginTop: 10,
    height: '80%',
    fontSize: 18,
    width: '80%',
    marginLeft: '2%',
    marginRight: '2%',
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textInput2: {
    marginTop: 10,
    height: '80%',
    fontSize: 18,
    width: '38%',
    borderBottomColor: 'black',
    marginLeft: '2%',
    marginRight: '2%',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textHead: {
    fontSize: 10,
    color: 'gray',
    width: '12%',
  },
  textHead2: {
    fontSize: 10,
    color: '#534e4e',
    width: '12%',
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
  image: {
    width: 160,
    height: 160,
    backgroundColor: 'pink',
    borderRadius: 80,
    borderWidth: 2,
    borderColor: 'white'
  },
  buttonDone: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffd05b',
    borderRadius: 25,
    height:'80%',
    marginBottom: 8,
    width: '40%',
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    edit: (user) => dispatch(editUser(user)),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FirstMeet);