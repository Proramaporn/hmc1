import * as firebase from 'firebase';
import 'firebase/firestore';

class Firestore {
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
      console.log('Firebase apps already running...');
    }
  }

  addAccount = (user, success, reject) => {
    firebase
      .firestore()
      .collection('Account')
      .add(user)
      .then(function (docRef) {
        success(docRef);
      })
      .catch(function (error) {
        reject(error);
      });
  };

  addFood = (foodData, success, reject) => {
    firebase
      .firestore()
      .collection('Food')
      .add(foodData)
      .then(function (docRef) {
        success(docRef);
      })
      .catch(function (error) {
        reject(error);
      });
  };

  getAccount = (email, success, reject) => {
    firebase
      .firestore()
      .collection('Account')
      .where('email', '==', email)
      .get()
      .then(function (querySnapshot) {
        success(querySnapshot);
      })
      .catch(function (error) {
        reject(error);
      });
  };

  getAccountByUsername = (username, success, reject) => {
    firebase
      .firestore()
      .collection('Account')
      .where('username', '==', username)
      .get()
      .then(function (querySnapshot) {
        success(querySnapshot);
      })
      .catch(function (error) {
        reject(error);
      });
  };

  getAllAccount = (success, reject) => {
    firebase
      .firestore()
      .collection('Account')
      .get()
      .then(function (querySnapshot) {
        success(querySnapshot);
      })
      .catch(function (error) {
        reject(error);
      });
  };

  getFood = (foodName, success, reject) => {
    firebase
      .firestore()
      .collection('Food')
      .where('foodName', '==', foodName)
      .get()
      .then(function (querySnapshot) {
        success(querySnapshot);
      })
      .catch(function (error) {
        reject(error);
      });
  };

  getAllFood = (success, reject) => {
    firebase
      .firestore()
      .collection('Food')
      .get()
      .then(function (querySnapshot) {
        success(querySnapshot);
      })
      .catch(function (error) {
        reject(error);
      });
  };

  getAllLimitFood = (success, reject) => {
    firebase
      .firestore()
      .collection('Food')
      .limit(10)
      .get()
      .then(function (querySnapshot) {
        success(querySnapshot);
      })
      .catch(function (error) {
        reject(error);
      });
  };

  updateAccountByID = (user, success, reject) => {
    firebase
      .firestore()
      .collection('Account')
      .doc(user.id)
      .update({
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        age: user.age,
        gender: user.gender,
        weight: user.weight,
        height: user.height,
        activity: user.activity,
        cal: user.cal,
        userPic: user.userPic,
      })
      .then(function () {
        success(null);
      })
      .catch(function (error) {
        reject(error);
      });
  };

  addFriendWithID = (myUser, friendUser, success, reject) => {
    firebase
      .firestore()
      .collection(myUser.email + '_Friend')
      .doc(friendUser.email)
      .set(friendUser)
      .then(function(docRef){
        success(docRef);
      })
      .catch(function(error){
        reject(error)
      });
  }

  addFriend = (myUser, friendUser, success, reject) => {
    firebase
      .firestore()
      .collection(myUser.email + '_Friend')
      .add(friendUser)
      .then(function (docRef) {
        success(docRef);
      })
      .catch(function (error) {
        reject(error);
      });
  };

  getAllFriend = (myUser, success, reject) => {
    firebase
      .firestore()
      .collection(myUser.email + '_Friend')
      .get()
      .then(function (querySnapshot) {
        success(querySnapshot);
      })
      .catch(function (error) {
        reject(error);
      });
  };

  sendMessage(message, success, reject) {
    message.date = firebase.firestore.FieldValue.serverTimestamp();
    firebase
      .firestore()
      .collection('Message')
      .add(message)
      .then(function (docRef) {
        success(docRef);
      })
      .catch(function (error) {
        reject(error);
      });
  }

  getAllMessage(sender, receiver, success, reject) {
    firebase
      .firestore()
      .collection('Message')
      .where('room', 'array-contains-any', [
        sender + receiver,
        receiver + sender,
      ])
      .get()
      .then(function (querySnapshot) {
        success(querySnapshot);
      })
      .catch(function (error) {
        reject(error);
      });
  }

  listeningMessage = (sender, receiver, success, reject) => {
    firebase
      .firestore()
      .collection('Message')
      .where('room', 'in', [sender + receiver, receiver + sender])
      .onSnapshot(
        function (snapshot) {
          snapshot.docChanges().forEach(function (change) {
            if (change.type === 'added') {
              success(change.doc);
            }
          });
        },
        function (error) {
          reject(error);
        }
      );
  };

  listeningAddFriend = (myUser, success, reject) => {
    firebase
      .firestore()
      .collection(myUser.email + '_Friend')
      .onSnapshot(
        function (snapshot) {
          snapshot.docChanges().forEach(function (change) {
            if (change.type === 'added'){
              success(change.doc);
            }
          });
        },
        function (error) {
          reject(error);
        }
      );
  };
}

const firestore = new Firestore();
export default firestore;