import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD6o2cAM08ZO3i8_uE-0uu7tX65wQTP6xo",
    authDomain: "videos-uploader.firebaseapp.com",
    projectId: "videos-uploader",
    storageBucket: "videos-uploader.appspot.com",
    messagingSenderId: "920132049938",
    appId: "1:920132049938:web:ada6a90ccab223338e4ccb"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const storage = firebaseApp.storage();
export const firestore = firebaseApp.firestore();

export default firebaseApp;