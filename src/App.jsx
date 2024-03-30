import React, { useState } from 'react';
import './App.css';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { increment } from "firebase/firestore";

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
getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

const promptsCollectionRef = collection(firestore, "prompts");

function App() {
  const [prompt, setPrompt] = useState('');
  const [prompts, setPrompts] = useState([]);
  const [votes, setVotes] = useState({});
  const [promptIds, setPromptIds] = useState({});
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);


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
      const promptIds = {}; // New object to store ids
  
      snapshot.forEach((doc) => {
        const { text, votes } = doc.data();
        updatedPrompts.push(text);
        updatedVotes[text] = votes;
        promptIds[text] = doc.id; // Store the document ID using the text as key
      });
  
      setPrompts(updatedPrompts);
      setVotes(updatedVotes);
      setPromptIds(promptIds); // Assuming you have a state to store these IDs
    });
  
    return unsubscribe;
  }, []);

   
  const handleVote = async (promptText, option) => {
    try {
      const promptDocId = promptIds[promptText];
      if (!promptDocId) {
        console.error("No document found for this prompt.");
        return;
      }
      const promptDocRef = doc(promptsCollectionRef, promptDocId);
      await updateDoc(promptDocRef, {
        [`votes.${option}`]: increment(1),
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
        setIsSignedIn(true); // Set the isSignedIn state to true
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setIsSignedIn(false); // Set the isSignedIn state to false
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddReminder = () => {
    if (newReminder.trim() !== '') {
      setReminders(prevReminders => [...prevReminders, newReminder]);
      setNewReminder('');
    } else {
      alert('Please enter a reminder.');
    }
  };

  const Reminder = ({ text }) => (
    <div className="reminder">
      {text}
      {/* Additional markup for time, icons, etc. */}
    </div>
  );

  return (
    <div className="App">
      <h1 className="title">GroupVotes</h1>
      <div className="sign-in">
        {isSignedIn ? (
          <button className="sign-in-button" onClick={handleSignOut}>Sign Out</button>
        ) : (
          <button className="sign-in-button" onClick={signInWithGoogle}>Sign in with Google</button>
        )}
      </div>
      <div className="post-prompt">
        <input 
          className="prompt-input"
          type="text" 
          placeholder="Enter your prompt" 
          value={prompt} 
          onChange={handlePromptChange} 
        />
        <button className="post-prompt-button" onClick={handlePostPrompt}>Post Prompt</button>
      </div>
      <div className="feed">
        {prompts.map((promptText, index) => (
          <div key={index} className="prompt-item">
            <h3 className="prompt-title">{promptText}</h3>
            <div className="vote-buttons">
              <button className="yes-button" onClick={() => handleVote(promptText, 'yes')}>Yes</button>
              <button className="no-button" onClick={() => handleVote(promptText, 'no')}>No</button>
              <button className="maybe-button" onClick={() => handleVote(promptText, 'maybe')}>Maybe</button>
            </div>
            <div className="vote-counts">
              <p className="vote-count yes-count">Yes: {votes[promptText]?.yes || 0}</p>
              <p className="vote-count no-count">No: {votes[promptText]?.no || 0}</p>
              <p className="vote-count maybe-count">Maybe: {votes[promptText]?.maybe || 0}</p>
            </div>
          </div>
        ))}
        {reminders.map((reminderText, index) => (
          <Reminder key={index} text={reminderText} />
        ))}
        <div className="add-reminder">
          <input 
            className="reminder-input"
            type="text" 
            placeholder="Enter your reminder" 
            value={newReminder} 
            onChange={e => setNewReminder(e.target.value)}
          />
          <button className="add-reminder-button" onClick={handleAddReminder}>Add Reminder</button>
        </div>
      </div>
    </div>
  );
}

export default App;