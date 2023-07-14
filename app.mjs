import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut  } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, doc, query, orderBy, where, updateDoc, deleteField, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";



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
  const db = getFirestore(app);
  const auth = getAuth(app);
  const user = auth.currentUser;



  document.getElementById('postSubmit').addEventListener('click', async () =>{

    const thePost = document.getElementById('postBox').value;
    const user = auth.currentUser;


    if(thePost.trim().length != 0){



  try {
    const docRef = await addDoc(collection(db, "Posts"), {

        post: thePost,
        userID: user.uid,
        useremail: user.email,
        timestamp: serverTimestamp(),
      
    });
    console.log("Document written with ID: ", docRef.id);
    document.getElementById('postBox').value = "";
  } catch (e) {
    console.error("Error adding document: ", e);
  }

                                  }else{

                                    document.getElementById("errorButton").click();


                                  }


  });


const displayFunction = ()=>{


    const q = query(collection(db, "Posts"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let showDiv = document.getElementById("showdiv");
          showDiv.innerHTML = "";


      querySnapshot.forEach ((snapshot) =>{

            const user = auth.currentUser;

             const commentUserEmail = user.email;
             const commentUserIndex = commentUserEmail.indexOf('@');
             const commentUserName = commentUserEmail.substring(0, commentUserIndex);

            

            document.getElementById('loggedin').innerHTML = `
            
             Logged in as: <a href="#">@${commentUserName}</a>
            
            `
              
              

             let newDiv = document.createElement("div");

             let postDiv = document.createElement("div");
             
             let the_post = document.createElement("div");

             let post_user = document.createElement("div");

             let delPost = document.createElement("button");
             
             let commentDiv = document.createElement("div");

             let commentInput = document.createElement("input");

             let commentButton = document.createElement("button");

             let commentUser = document.createElement("div");


             let showComments = document.createElement("div");

             let emptySpace = document.createElement("span");

             emptySpace.classList.add("emptyspace");



             commentInput.setAttribute('type', 'text');

             commentButton.innerHTML = `

                      Add &nbsp;
             
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-fill" viewBox="0 0 16 16">
                          <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"/>
                      </svg>
             
             `;

             commentButton.classList.add('comment-button');

             commentButton.setAttribute('ref', snapshot.id);
             commentButton.setAttribute('for', user.uid);

             delPost.innerHTML= `
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                  </svg>
             
             `
             
             delPost.setAttribute('ref', snapshot.id);

             delPost.setAttribute('for', user.uid);

             delPost.classList.add('delete-button');
             post_user.classList.add('postUser');

             

             the_post.innerHTML = snapshot.data().post;

             the_post.classList.add('posts');
             postDiv.classList.add('postDiv');

             const userEmail = snapshot.data().useremail;
             const userNameIndex = userEmail.indexOf('@');
             const userName = userEmail.substring(0, userNameIndex);
             
             post_user.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-badge userBadge" viewBox="0 0 16 16">
                    <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z"/>
                    </svg>
                    <br>
                    @${userName}

             `;
             

             postDiv.classList.add('postDiv')

             postDiv.appendChild(post_user);


             postDiv.appendChild(the_post);

             if(snapshot.data().userID === user.uid){


              postDiv.appendChild(delPost);



             }else{
              postDiv.appendChild(emptySpace);
             };



                                          //const commentsQuery = query(collection(db, "Comments"), orderBy("timestamp"));

                                          const commentsQuery = query(collection(db, "Comments"), where("docRef", "==", snapshot.id), orderBy("timestamp"));
                                          const unsubscribeComments = onSnapshot(commentsQuery, (commentsQuerySnapshot) => {

                                            showComments.innerHTML = ""; // Clear existing comments

                                            
                                            commentsQuerySnapshot.forEach((comS) => {
                                              let newComment = document.createElement("div");
                                              let commentText = document.createElement("span");
                                              let delComment = document.createElement("button");
                                              let commentInfo = document.createElement("span");
                                              let emptySpace2 = document.createElement("span");
                                              emptySpace2.classList.add("emptySpace2");

                                              let commentShowUser = comS.data().useremail;
                                              let commentShowUserIndex = commentShowUser.indexOf('@');
                                              let commentShowUserName = commentShowUser.substring(0, commentShowUserIndex);
                                              

                                              commentInfo.innerHTML = `
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill comment-badge" viewBox="0 0 16 16">
                                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                                    </svg>
                                                    <br>
                                                    @${commentShowUserName}


                                              `;

                                              delComment.innerHTML =  `
                                              
                                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                              </svg>
                                              
                                              
                                              ` ;
                                              commentInfo.classList.add('commentInfo');
                                              delComment.setAttribute("ref", comS.id);
                                              delComment.setAttribute("for", user.uid);
                                              delComment.classList.add("delete-comment");
                                              commentText.classList.add("comment-text");
                                              commentText.innerHTML = comS.data().comment;
                                              newComment.appendChild(commentInfo);
                                              newComment.appendChild(commentText );
                                              newComment.classList.add("new-comment");
                                              if(comS.data().userID === user.uid){ 
                                                newComment.appendChild(delComment);
                                              }else{
                                              newComment.classList.add("new-comment-not-user");
                                              newComment.appendChild(emptySpace2);


                                              };
                                              
                                              showComments.appendChild(newComment);
                                    
                                              console.log(comS.data().comment);
                                            });



                                          });
                                          




             
             newDiv.appendChild(postDiv);

             commentDiv.classList.add('comment-div');

             

             commentUser.innerHTML = `
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill comment-badge" viewBox="0 0 16 16">
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                          </svg>
                          <br>
                          @${commentUserName}
             `
             commentUser.classList.add('comment-user');

             commentDiv.appendChild(commentUser);
             
             

             commentDiv.appendChild(commentInput);
             commentDiv.appendChild(commentButton);

             newDiv.appendChild(commentDiv);
             
             newDiv.appendChild(showComments);

             showDiv.appendChild(newDiv);

             console.log(snapshot.id);
             

             


      });






    });




};


  
  const handleAuthStateChange = (user) => {
    if (user) {
      
      console.log('User is logged in:', user.email);
      displayFunction();


///// Add event listener for delete post button

      document.getElementById('showdiv').addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-button')) {

          let docId = event.target.getAttribute('ref')

          await deleteDoc(doc(db, "Posts", docId));
          console.log(event);
        }
      });


//////////////////////////////// Add event listener for comments

document.getElementById('showdiv').addEventListener('click', async (event) => {
  if (event.target.classList.contains('comment-button')) {

    const user = auth.currentUser;
    let docId = event.target.getAttribute('ref')
    let theComment = event.target.parentNode.querySelector('input').value;

    if(theComment.trim().length !== 0) {

    try {
      const docRef = await addDoc(collection(db, "Comments"), {
  
          comment: theComment,
          userID: user.uid,
          useremail: user.email,
          docRef: docId,
          timestamp: serverTimestamp(),
        
      });
      console.log("Document written with ID: ", docRef.id);
      event.target.parentNode.querySelector('input').value = "";

    } catch (e) {
      console.error("Error adding document: ", e);
    }

                                            }else{

                                              document.getElementById("errorButton").click();


                                            } 
     // console.log(event.target.parentNode.firstChild.value);


    ///// Add event listener for delete comment button

   


    
}});




///// Add event listener for delete comments button

document.getElementById('showdiv').addEventListener('click', async (event) => {
  if (event.target.classList.contains('delete-comment')) {

    let docId = event.target.getAttribute('ref')

    await deleteDoc(doc(db, "Comments", docId));
    console.log(event);
  }
});



//// onAuth's else
    } else {
    
      console.log('User is logged out');
      document.getElementById('theBody').innerHTML = `

      <center style="font-size: 4rem; background: -webkit-linear-gradient(rgba(240,0,212,1), rgba(8,67,249,1)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
      
      Please <a href="./signin.html">Login</a> to view threads.
      </center>
      `
  
  
  
    }
  };


  


  
  
  // Listen for authentication state changes
  onAuthStateChanged(auth, handleAuthStateChange);


  const signOutUser = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      window.location.href = `./signin.html`;
    } catch (error) {
      console.error("Error signing out user", error);
    }
  };
  
  
  document.getElementById('SignOut').addEventListener('click', signOutUser)
  
  