const {clipboard} = require('electron')
jquery = require('jquery');
const sign = document.getElementById('signIn');
var firebaseui = require('firebaseui');
var config = {
  apiKey: "AIzaSyCc5GHicvki6KkLfBH5hfVavtCmrLxYqmo",
  authDomain: "code-sender.firebaseapp.com",
  databaseURL: "https://code-sender.firebaseio.com",
  projectId: "code-sender",
  storageBucket: "code-sender.appspot.com",
  messagingSenderId: "1053474302225"
};
let app =firebase.initializeApp(config);

const clipboardContent = clipboard.readText();
let sendTextP = document.getElementById('sendTextP');
let getTexTP = document.getElementById('getTextP');
const sendButton = document.getElementById('sendButton');
const getButton = document.getElementById('getButton');
sendTextP.value = clipboardContent;

var database = firebase.database();

let tract = 0;
let userId;

console.log(clipboardContent);

  initApp = function () {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        tract =1;
        userId = user.uid;
        console.log("Sign in Successful");
        console.log(user.uid);
        sign.value = 'Sign Out from ' + user.displayName;
        sign.addEventListener('click', () =>{
          firebase.auth().signOut().then(function () {
            sign.value('Sign In/ Sign Out');
          }).catch(function (error) {
            console.log("Error occured while signing out");
          });
        });

        sendButton.addEventListener('click',()=>{
          
          database.ref('users/'+user.uid).set(sendTextP.value,(error)=>{
            if (error) {
              console.log(error);
              
            }else{
              alert("Successfully sent");
            }
          });

        });

        getButton.addEventListener('click',()=>{

          firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
            getTexTP.value = snapshot.val();
            // ...
          });


        });


var data = firebase.database().ref('users/' + user.uid);
data.on('value', function (snapshot) {

  if (snapshot.val() !== sendTextP.value) {
    getTexTP.value = snapshot.val();
  }
  console.log(snapshot.val());

});

        
      } else {
        // User is signed out.
        console.log("Logged Out");
        sign.value = 'Sign In / Sign Up';
        sign.addEventListener('click',()=>{
          document.location.href = 'sign.html';
        });

        track = 0;

        sendButton.addEventListener('click',()=>{
          alert("Please Sign in or Sign up first and then try again");
        });
        getButton.addEventListener('click', () => {
          alert("Please Sign in or Sign up first and then try again");
        });
      }
    }, function (error) {
      console.log(error);
    });
  };

  window.addEventListener('load', function () {
    initApp()
  });