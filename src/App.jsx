import React, { useState } from 'react';
import './App.css';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, addDoc, onSnapshot, doc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWrjtBrxpT9THsfhg-lwQnqpeF7T3v9Eg",
  authDomain: "group-votes-ce1dd.firebaseapp.com",
  projectId: "group-votes-ce1dd",
  storageBucket: "group-votes-ce1dd.appspot.com",
  messagingSenderId: "275690848987",
  appId: "1:275690848987:web:2859ab03aedb8887fe02fe",
  measurementId: "G-H1RNPT1QS4"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

const promptsCollectionRef = collection(firestore, "prompts");

function App() {
  const [prompt, setPrompt] = useState('');
  const [prompts, setPrompts] = useState([]);
  const [votes, setVotes] = useState({});

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handlePostPrompt = async () => {
    if (prompt.trim() !== '') {
      try {
        await addDoc(promptsCollectionRef, {
          text: prompt,
          votes: { yes: 0, no: 0, maybe: 0 },
        });
        setPrompt('');
      } catch (error) {
        console.error("Error adding prompt: ", error);
      }
    }
  };

  React.useEffect(() => {
    const unsubscribe = onSnapshot(promptsCollectionRef, (snapshot) => {
      const updatedPrompts = [];
      const updatedVotes = {};
  
      snapshot.forEach((doc) => {
        const { text, votes } = doc.data();
        updatedPrompts.push(text);
        updatedVotes[text] = votes;
      });
  
      setPrompts(updatedPrompts);
      setVotes(updatedVotes);
    });
  
    return unsubscribe;
  }, []);

  const handleVote = async (promptText, option) => {
    try {
      const promptDocRef = doc(promptsCollectionRef, prompts.indexOf(promptText));
      await updateDoc(promptDocRef, {
        [`votes.${option}`]: (votes[promptText][option] || 0) + 1,
      });
    } catch (error) {
      console.error("Error updating votes: ", error);
    }
  };
  
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        // Update user state or perform other actions
      }).catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <h1>GroupVotes</h1>
      <div>
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      </div>
      <div className="post-prompt">
        <input type="text" placeholder="Enter your prompt" value={prompt} onChange={handlePromptChange} />
        <button onClick={handlePostPrompt}>Post Prompt</button>
      </div>
      <div className="prompt-feed">
        {prompts.map((promptText, index) => (
          <div key={index} className="prompt-item">
            <h3>{promptText}</h3>
            <div>
              <button onClick={() => handleVote(promptText, 'yes')}>Yes</button>
              <button onClick={() => handleVote(promptText, 'no')}>No</button>
              <button onClick={() => handleVote(promptText, 'maybe')}>Maybe</button>
            </div>
            <div>
              <p>Yes: {votes[promptText]?.yes || 0}</p>
              <p>No: {votes[promptText]?.no || 0}</p>
              <p>Maybe: {votes[promptText]?.maybe || 0}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;