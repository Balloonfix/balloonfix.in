import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getStorage, ref, uploadString, getDownloadURL, deleteObject } from  "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

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

// Intialize Cloud Storage
const cloudStorage = getStorage(app);


export { getStorage, ref, uploadString, getDownloadURL, deleteObject};
