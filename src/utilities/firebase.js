// Firebase setup:

// SDKs import
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, addDoc, getDocs, query, onSnapshot, orderBy, limit, updateDoc, increment } from "firebase/firestore";

// Firebase configuration
/* const firebaseConfig = {
  apiKey: "AIzaSyB_a5rcWWbKTJdIXBF4RgWyhaTCoQE6Rug",
  authDomain: "group-votes-app.firebaseapp.com",
  projectId: "group-votes-app",
  storageBucket: "group-votes-app.appspot.com",
  messagingSenderId: "472218547440",
  appId: "1:472218547440:web:e2dfedfa759bce6aba7e35"
}; */

//TESTING CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyAWrjtBrxpT9THsfhg-lwQnqpeF7T3v9Eg",
    authDomain: "group-votes-ce1dd.firebaseapp.com",
    projectId: "group-votes-ce1dd",
    storageBucket: "group-votes-ce1dd.appspot.com",
    messagingSenderId: "275690848987",
    appId: "1:275690848987:web:2859ab03aedb8887fe02fe",
    measurementId: "G-H1RNPT1QS4"
  };

// Initialize Firebasenpm install firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const useFirebase = () => {
  
    // Function to add post to group
    const addPostToGroup = async (groupId, formData) => {
      try {
        if (!db) {
          console.error('Firebase is not initialized.');
          return;
        }
        const groups = collection(db, "groups");
        const docRef = await addDoc(collection(groups, groupId, "posts"), formData);
        console.log("Document written");
        } catch (e) {
          console.error("Error adding document: ", e);
      }
    };

    // Function to fetch posts
    const fetchPostsForGroup = (groupId, setPosts) => {
        const q = query(collection(db, 'groups', groupId, 'posts'), limit(10)); // Can remove limit later and add orderBy('DatePosted')

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push({ id: doc.id, ...doc.data() });
            });
            setPosts(posts);
        });

        return unsubscribe; // Return the unsubscribe function to call it on component unmount
    };

    // Function to update posts with votes
    const updatePostOptions = async (groupId, postId, option) => {
        try {
          await updateDoc(doc(db, `groups/${groupId}/posts`, postId), {
            [option]: increment(1)
          });
        } catch (err) {
            console.error("Error updating votes: ", err.message);
        }
      };
  
    // Return the necessary functions and state
    return {
      addPostToGroup,
      fetchPostsForGroup,
      updatePostOptions,
    };
  };
  
  export default useFirebase;