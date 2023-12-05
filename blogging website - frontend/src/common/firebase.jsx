import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBY8grlPuQNrORc24ldbikc6Plt0NPi3m0",
  authDomain: "react-js-blog-website-yt-cea21.firebaseapp.com",
  projectId: "react-js-blog-website-yt-cea21",
  storageBucket: "react-js-blog-website-yt-cea21.appspot.com",
  messagingSenderId: "96258241342",
  appId: "1:96258241342:web:33b55313bcf62dc22e326f"
};

const app = initializeApp(firebaseConfig);



// google authentication

const  provider = new GoogleAuthProvider() 

const auth = getAuth();

export const authWithGoogle = async () => {

    let user = null;

    await signInWithPopup(auth, provider)
    .then((result)=> {

        user = result.user
    })
    .catch((err) =>{

        console.log(err.message)
    })

    return user;
}