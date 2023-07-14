  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
  import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut  } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";


  const firebaseConfig = {
    apiKey: "AIzaSyAzpav9KsTQ9_nr6gi4mInTp7JrsGHLHpA",
    authDomain: "quiz-app-65c3e.firebaseapp.com",
    projectId: "quiz-app-65c3e",
    storageBucket: "quiz-app-65c3e.appspot.com",
    messagingSenderId: "546653806160",
    appId: "1:546653806160:web:4590ef27bf891bf505bb55",
    measurementId: "G-HL5GZ85GPD"
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  var signin = document.getElementById('signin')

  signin.addEventListener('click', function(){

    var email = document.getElementById('email').value
    var password = document.getElementById('password').value

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    localStorage.setItem('email', email);
    var successlogin = true;
    // ...
    // alert('Sign in Successful')
    location.href = './app.html'
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    alert('Error: ' + errorMessage)
    location.href = './index.html'

  });


  })






  const handleAuthStateChange = (user) => {
    if (user) {
      
      console.log('User is logged in:', user.email);

      location.href = `./app.html`;

    } else {
    
      console.log('User is logged out');
    }
  };
  

onAuthStateChanged(auth, handleAuthStateChange);