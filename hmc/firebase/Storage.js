import * as firebase from 'firebase';
import 'firebase/storage';

class Storage {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyAu-L8L4m1z3YAuUqbY-zMIN2rCzmPhAmc',
        authDomain: 'miniproject-468b7.firebaseapp.com',
        databaseURL: 'https://miniproject-468b7.firebaseio.com',
        projectId: 'miniproject-468b7',
        storageBucket: 'miniproject-468b7.appspot.com',
        messagingSenderId: '244095218009',
        appId: '1:244095218009:web:3e04e5344ad95fe0335c48',
        measurementId: 'G-1V7603DN4M',
      });
    } else {
      console.log('Firebase Apps Already Running...');
    }
  }

  uploadToFirebase = async (uri, name, success, reject) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child('image_food/' + name);
    ref
      .put(blob)
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((uri) => {
          success(uri);
        });
      })
      .catch((error) => {
        reject(error);
      });
  };

  uploadToFirebase2 = async (uri, name, success, reject) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child('image_profile/' + name);
    ref
      .put(blob)
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((uri) => {
          success(uri);
        });
      })
      .catch((error) => {
        reject(error);
      });
  };

  getList = async(success, reject) => {
    var ref = firebase.storage().ref().child('image');
    await ref
      .listAll()
      .then(function (res) {
        success(res);
      })
      .catch(function (error) {
        reject(error);
      });
  };
}

const storage = new Storage();
export default storage;
