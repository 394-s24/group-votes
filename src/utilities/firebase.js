// Firebase setup:

// SDKs import
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, addDoc, getDoc, getDocs, query, onSnapshot, orderBy, limit, updateDoc, increment } from "firebase/firestore";

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
        // Create a query to get the posts collection, sorted by 'createdAt' in descending order, with a limit of 10 posts
        const q = query(
            collection(db, 'groups', groupId, 'posts'),
            orderBy('time', 'desc'), // Sort by the 'createdAt' field in descending order
            limit(10) // You can adjust the limit or remove it if necessary
        );
    
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const posts = [];
            querySnapshot.forEach((doc) => {
                // Spread operator to combine id with the document data
                posts.push({ id: doc.id, ...doc.data() });
            });
            setPosts(posts);
        });
    
        return unsubscribe; // Return the unsubscribe function to be called on component unmount
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

    // Function to update votes for a poll option
    const updatePollVote = async (groupId, postId, optionIndex) => {
      const postRef = doc(db, `groups/${groupId}/posts`, postId);
    
      try {
        const postDoc = await getDoc(postRef);
        if (!postDoc.exists()) {
          throw new Error("Document does not exist!");
        }
    
        const postData = postDoc.data();
        const options = postData.options;
    
        // Ensure options is an array and optionIndex is within bounds
        if (Array.isArray(options) && optionIndex < options.length) {
          // Manually increment the votes
          const newVotes = (options[optionIndex].votes || 0) + 1;
          options[optionIndex].votes = newVotes;
    
          // Set the updated options array back to the document
          await updateDoc(postRef, { options });
        } else {
          throw new Error(`Option at index ${optionIndex} does not exist.`);
        }
    
        console.log("Votes successfully updated!");
      } catch (e) {
        console.error("Failed to update votes: ", e);
      }
    };

  
    // Return the necessary functions and state
    return {
      addPostToGroup,
      fetchPostsForGroup,
      updatePostOptions,
      updatePollVote, 
    };
  };
  
  export default useFirebase;