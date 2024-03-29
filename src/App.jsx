import React, { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState("Do you like this prompt?");
  const [votes, setVotes] = useState({ yes: 0, no: 0, maybe: 0 });

  const handleVote = (option) => {
    setVotes(prevState => ({ ...prevState, [option]: prevState[option] + 1 }));
  };

  return (
    <div className="App">
      <h1>Vote on the Prompt</h1>
      <h3>{prompt}</h3>
      <div>
        <button onClick={() => handleVote('yes')}>Yes</button>
        <button onClick={() => handleVote('no')}>No</button>
        <button onClick={() => handleVote('maybe')}>Maybe</button>
      </div>
      <div>
        <p>Yes: {votes.yes}</p>
        <p>No: {votes.no}</p>
        <p>Maybe: {votes.maybe}</p>
      </div>
    </div>
  );
}

export default App;
