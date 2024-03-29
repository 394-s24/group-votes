import React, { useState } from 'react';
import './App.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWrjtBrxpT9THsfhg-lwQnqpeF7T3v9Eg",
  authDomain: "group-votes-ce1dd.firebaseapp.com",
  projectId: "group-votes-ce1dd",
  storageBucket: "group-votes-ce1dd.appspot.com",
  messagingSenderId: "275690848987",
  appId: "1:275690848987:web:2859ab03aedb8887fe02fe",
  measurementId: "G-H1RNPT1QS4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  const [prompt, setPrompt] = useState('');
  const [prompts, setPrompts] = useState([]);
  const [votes, setVotes] = useState({});

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handlePostPrompt = () => {
    if (prompt.trim() !== '') {
      setPrompts(prevPrompts => [...prevPrompts, prompt]);
      setVotes(prevVotes => ({ ...prevVotes, [prompt]: { yes: 0, no: 0, maybe: 0 } }));
      setPrompt('');
    }
  };

  const handleVote = (promptText, option) => {
    setVotes(prevVotes => ({
      ...prevVotes,
      [promptText]: { ...prevVotes[promptText], [option]: prevVotes[promptText][option] + 1 }
    }));
  };

  return (
    <div className="App">
      <h1>GroupVotes</h1>
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
