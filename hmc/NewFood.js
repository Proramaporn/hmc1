//NewFood
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
import * as ImagePicker from 'expo-image-picker';
import storage from './firebase/Storage';
import firestore from './firebase/Firestore';

class NewFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      foodName: null,
      foodCal: null,
      foodUri: null,
    };
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      allowsEditing: true,
      quality: 0.5,
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  addSuccess = (docRef) => {
    console.log(docRef.id);
    this.props.navigation.navigate('Food');
  };

  uploadSuccess = (uri) => {
    console.log('Upload Success');
    console.log(uri);
    let foodData = {
      foodName: this.state.foodName,
      foodCal: this.state.foodCal,
      foodUri: uri,
    };
    console.log(foodData);
    firestore.addFood(foodData, this.addSuccess, this.reject);
  };

  reject = (error) => {
    console.log(error);
  };

  uploadImage = () => {
    storage.uploadToFirebase(
      this.state.image,
      this.state.foodName,
      this.uploadSuccess,
      this.reject
    );
  };

  onDone = () => {
    this.uploadImage();
  };

  render(props) {
    return (
      <ImageBackground
        style={styles.imageBackground}
        source={{ uri: 'https://uppic.cc/d/6cgv_NY_FljeGmILkA5mp' }}
        blurRadius={1}>
        <View style={{ paddingTop: 5, borderRadius: 50 }}>
          <TextInput
            placeholder="Enter Food Name"
            style={styles.nameFoodInput}
            onChangeText={(text) => this.setState({ foodName: text })}
          />
        </View>
        <TouchableOpacity style={styles.middle} onPress={this.pickImage}>
          <Image style={styles.image} source={{ uri: this.state.image }} />
        </TouchableOpacity>

        <View style={styles.bottom}>
          <TextInput
            placeholder="Calorie"
            style={styles.textInput}
            onChangeText={(text) => this.setState({ foodCal: Number(text) })}
          />
          <TouchableOpacity style={styles.buttonLogin} onPress={this.onDone}>
            <Text style={{ fontSize: 15 }}>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={() => this.props.navigation.navigate('Food')}>
            <Text style={{ fontSize: 15 }}>Cancel</Text>
          </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    margin: 16,
    borderRadius: 50,
    flex: 3,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 50,
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
    marginBottom: 8,
    textAlign: 'center',
  },
  nameFoodInput: {
    color: 'white',
    fontSize: 20,
    borderRadius: 25,
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 8,
    margin: 8,
    backgroundColor: '#440a00',
    textAlign: 'center',
  },
});

export default NewFood;
