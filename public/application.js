// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDSYAo0FHhF79Aznk97990_OZCb3PRWxzM",
    authDomain: "dontwingit.firebaseapp.com",
    databaseURL: "https://dontwingit.firebaseio.com",
    projectId: "dontwingit",
    storageBucket: "dontwingit.appspot.com",
    messagingSenderId: "411249906868",
    appId: "1:411249906868:web:db9a4a1b192cb4814173e1",
    measurementId: "G-W1T9SZ8256"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var provider = new firebase.auth.GoogleAuthProvider();

// Reference to your entire Firebase database
var myFirebase = firebase.database().ref();

// firebase.auth().signInWithRedirec6t(provider);

firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // Get a reference to the recommendations object of your Firebase.
  // Note: this doesn't exist yet. But when we write to our Firebase using
  // this reference, it will create this object for us!
  var allUsersRef = myFirebase.child('users');
  // Push our first recommendation to the end of the list and assign it a
  // unique ID automatically.
  allUsersRef.once('value', function(snapshot) {
    if (snapshot.hasChild(user.uid)) {
      //make data persist on screen
      var confLevelRef = allUsersRef.child(user.uid).child("wcag").child("checked");
      confLevelRef.once("value").then(function(snapshot) {
        for(var i = 0; i < snapshot.numChildren(); i++) {
          console.log(snapshot.child(i).val());
          // $('wcag-item').eq(i).prop("checked",snapshot.child(i).val());
        }
      });
    }
    else {
      allUsersRef.child(user.uid).set({
        features : [],
        name : user.displayName,
        email : user.email,
        points : 0, 
        testing : {
            automated : {
                checked : false,
                name : 'WebAIM'
              }
          },
          wcag : {
              checked : [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
              conf_level : [ "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable", "Acceptable", "Not applicable" ]
          }
      }
    );
    }
  });

}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
  console.log(error);
});
