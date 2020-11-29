//EditProfile
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
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import storage from './firebase/Storage';
import auth from './firebase/Auth';
import firestore from './firebase/Firestore';

import { connect } from 'react-redux';
import { editUser } from './actions/userAction';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      username: this.props.user.username,
      firstname: this.props.user.firstname,
      lastname: this.props.user.lastname,
      age: this.props.user.age,
      gender: this.props.user.gender,
      weight: this.props.user.weight,
      height: this.props.user.height,
      activity: this.props.user.activity,
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
      this.uploadImage();
    }
  };

  uploadSuccess = (uri) => {
    console.log('Upload Success');
    console.log(uri);
    this.setState({ userPic: uri });
  };

  uploadImage = () => {
    console.log('uploading...');
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
  };

  onEdit = () => {
    console.log('edit');
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
    console.log(this.props.user);
    firestore.updateAccountByID(
      this.state.user,
      this.updateSuccess,
      this.reject
    );
  };

  signOutSuccess = () => {
    console.log('Sign Out Success');
    this.props.navigation.navigate('Login');
  };

  reject = (error) => {
    console.log(error);
  };

  onLogout = () => {
    auth.signOut(this.signOutSuccess, this.reject);
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
        <View style={styles.container}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              height: '80%',
              alignItems: 'center',
            }}>
            <Text style={styles.textHead}>USER NAME</Text>
            <TextInput
              style={styles.textInput}
              placeholder={'Username'}
              placeholderTextColor="lightgray"
              value={this.state.username}
              onChangeText={(text) => this.setState({ username: text })}
            />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              height: '80%',
              alignItems: 'flex-end',
            }}>
            <Text style={styles.textHead}>FIRST NAME</Text>
            <TextInput
              style={styles.textInput}
              placeholder={'Firstname'}
              placeholderTextColor="lightgray"
              value={this.state.firstname}
              onChangeText={(text) => this.setState({ firstname: text })}
            />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              height: '80%',
              alignItems: 'flex-end',
            }}>
            <Text style={styles.textHead}>LAST NAME</Text>
            <TextInput
              style={styles.textInput}
              placeholder={'Lastname'}
              placeholderTextColor="lightgray"
              value={this.state.lastname}
              onChangeText={(text) => this.setState({ lastname: text })}
            />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              height: '80%',
              alignItems: 'flex-end',
            }}>
            <Text style={styles.textHead}>AGE</Text>
            <TextInput
              style={styles.textInput}
              placeholder={'Age'}
              placeholderTextColor="lightgray"
              value={this.state.age.toString()}
              onChangeText={(text) => this.setState({ age: text })}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              height: '80%',
              alignItems: 'flex-end',
            }}>
            <Text style={styles.textHead}>GEN DER</Text>
            <Picker
              style={styles.textInput}
              selectedValue={this.state.gender}
              onValueChange={this.updateGender}>
              <Picker.Item label="Male" value={66} />
              <Picker.Item label="Female" value={665} />
            </Picker>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              height: '80%',
              alignItems: 'flex-end',
            }}>
            <Text style={styles.textHead2}>WEIGHT (kg.)</Text>
            <TextInput
              style={styles.textInput2}
              placeholder={'Weight(kg.)'}
              placeholderTextColor="lightgray"
              value={this.state.weight.toString()}
              onChangeText={(text) => this.setState({ weight: text })}
            />
            <Text style={styles.textHead2}>HEIGHT (cm.)</Text>
            <TextInput
              style={styles.textInput2}
              placeholder={'Height(cm.)'}
              placeholderTextColor="lightgray"
              value={this.state.height.toString()}
              onChangeText={(text) => this.setState({ height: text })}
            />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              height: '80%',
              alignItems: 'flex-end',
            }}>
            <Text style={styles.textHead}>ACTI VITY</Text>
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
          </View>

          <View>
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
          </View>
        </View>

        <View style={{
            flex: 0.4,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            //borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
            marginTop: '5%',
            width: '100%',
          }}>
          <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
            <TouchableOpacity style={styles.button} onPress={this.onEdit}>
              <Text style={{ color: 'black' }}>EDIT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.onLogout}>
              <Text style={{ color: 'black' }}>LOG OUT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '90%',
    width: '95%',
    backgroundColor: '#fffffff0',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2.5,
    padding: '7%',
    borderRadius: 50,
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
    color: '#534e4e',
    width: '10%',
  },
  textHead2: {
    fontSize: 10,
    color: '#534e4e',
    width: '12%',
  },
  button: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffd05b',
    borderRadius: 25,
    height: 50,
    marginBottom: 8,
    width: '40%',
    height: '80%',
  },
  image: {
    width: 160,
    height: 160,
    backgroundColor: 'pink',
    borderRadius: 80,
    borderWidth: 2,
    borderColor: 'white'
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);