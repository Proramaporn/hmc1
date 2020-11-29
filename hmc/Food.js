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
  ScrollView,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Constants from 'expo-constants';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 


class Food extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodData: null,
      foodName: null,
      foodList: [],
    };
   
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
      <Animatable.View animation='fadeInUp' delay={500} style={{flex: 1, margin: 6, width: 270, justifyContent:'center',alignItems:'center',backgroundColor: '#fffffff0',  borderRadius: 50, }}>
        <View >
          <Image style={styles.image} source={{uri:item.foodUri}}/>
        </View>
        <View style={{marginTop:'2%', borderTopWidth: 2, borderTopColor: 'black', width: '80%', padding: '3%'}}>
          <Text style={{fontWeight: 'bold',textAlign:'center',fontSize:20}}>{item.foodName}</Text>
          <Text style={{fontWeight: 'bold',textAlign:'center',fontSize:20}}>{item.foodCal} kcal.</Text>
        </View>
      </Animatable.View>
    );
  };

  render(props) {
    const { navigation } = this.props;
    return (
      <ImageBackground
        style={{
        flex: 1,
        paddingTop: Constants.statusBarHeight,}}
        source={{ uri: 'https://uppic.cc/d/j7q-FrYJm4lAyWwsGHdkl' }}
        >
        <Animatable.View style={styles.header} animation='fadeInDown'>
          <View style={{backgroundColor: '#ffd05b', flexDirection: 'row', height: '80%', width: '90%', alignItems: 'center', borderRadius: 50, paddingLeft: '5%'}}>
            <TextInput
              placeholderTextColor="black"
              placeholder="SEARCH (FOOD)"
              style={styles.textInput}
              value={this.state.foodName}
              onChangeText={(text) => this.setState({ foodName: text })}
            />
            <TouchableOpacity
              onPress={this.onSearch}>
              <FontAwesome name="search" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </Animatable.View>
        <View style={styles.middle}>
          <FlatList
            data={this.state.foodList}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>
        
        <Animatable.View animation='fadeInUp' style={{ flex: 1, backgroundColor: '#ffffff', borderTopLeftRadius: 35, borderTopRightRadius: 35, justifyContent: 'center' }}>
          <TouchableOpacity
            style={styles.buttonAdd}
            onPress={() => this.props.navigation.navigate('NewFood')}>
            <Text style={{ fontSize: 15 ,fontWeight: 'bold',}}>ADD NEW FOOD</Text>
          </TouchableOpacity>
        </Animatable.View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight
  },
  middle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    marginLeft: 16,
    marginRight: 16,
    flex: 7,
  },
  textInput: {
    //marginTop: 10,
    height: '80%',
    fontSize: 15,
    fontWeight: 'bold',
    width: '80%',
    marginLeft: '2%',
    marginRight: '2%',
    //borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  buttonAdd: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffd05b',
    borderRadius: 25,
    height: '70%',
    margin: 8,
  },
  image: {
    width: 270,
    height: 150,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  add: {
    flex: 1,
    backgroundColor: 'pink',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
    borderBottomRightRadius: 35,
    borderBottomLeftRadius: 35,
    justifyContent: 'center',
  },
});
export default Food;