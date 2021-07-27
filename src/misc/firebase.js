import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyDt2QIuLNR7D3dW2KLfTplLdThOPx4A58I",
    authDomain: "chat-app-d7988.firebaseapp.com",
    databaseURL: "https://chat-app-d7988-default-rtdb.firebaseio.com",
    projectId: "chat-app-d7988",
    storageBucket: "chat-app-d7988.appspot.com",
    messagingSenderId: "541770230561",
    appId: "1:541770230561:web:be3d3e18d7ecd7a6baec60"
  };
  
const app = firebase.initializeApp(config)

export const auth = app.auth();
export const database = app.database();
