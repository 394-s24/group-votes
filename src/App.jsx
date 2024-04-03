// V2 OF APP

// React library imports
import React from "react";

// Components impors
import PostButton from "./components/PostButton";
import Feed from "./components/Feed";

// CSS imports (add more after bootstrap)
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

// Main App
const App = () => {
  const today = new Date();
  const day = today.toLocaleString([], { weekday: "long" });
  const date = today.toLocaleDateString([], { dateStyle: "long" });

  return (
    <div className="container">
      <h1>GroupVotes</h1>

      <p>
        Today is {day}, {date}.
      </p>

      <Feed groupId="testGroupID" />
      
      <div style={{ height: '100px' }}></div>
      
      <div style={{ position: 'fixed', bottom: '30px', right: '30px' }}>
        <PostButton />
      </div>
      
    </div>
  );
};

export default App;
