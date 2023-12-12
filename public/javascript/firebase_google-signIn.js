import { initializeApp } from  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVEeXaL1-0BFFnKH493EA9B3GP0KrFBJc",
  authDomain: "balloonfix-in.firebaseapp.com",
  projectId: "balloonfix-in",
  storageBucket: "balloonfix-in.appspot.com",
  messagingSenderId: "499544530097",
  appId: "1:499544530097:web:c68f5a17af3d83df2b5690"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider;

// custom functions
let signingInUser = async function() {
  let user;
  let error;
  let googleAuthentication = await signInWithPopup(auth, googleProvider).
  then(userData => {
    user = userData;
  }).catch(err => {
    error = err;
  });
  
  if (user) {
    return { success: user }
  } else {
    return { error };
  }
};

let signingOutUser = async function() {
  signOut(auth).
  then(result => {
    console.log("User has been successfully logged out.");
  }).catch(err => {
    console.log("Couldn't logout the user successfully.");
  });
}

export { signingInUser, signingOutUser };