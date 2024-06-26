import React from "react";

// Components impors
import Dispatcher from "./components/Dispatcher";
import { GroupProvider } from './components/GroupContext';

// CSS imports (add more after bootstrap)
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

// Logo imports
import iconLogo from "./assets/logos/iconlogogroupvotes.png";
import textLogo from "./assets/logos/textlogogroupvotes.png";


// Main App
const App = () => {
  const today = new Date();
  const day = today.toLocaleString([], { weekday: "long" });
  const date = today.toLocaleDateString([], { dateStyle: "long" });

  return (
    <GroupProvider> 
      <div className="container">
        <div className="logo-container">
          <img src={iconLogo} alt="" className="logo-icon" />
          <img src={textLogo} alt="GroupVotes" className="logo-text" />
        </div>
        <p>
          Today is {day}, {date}.
        </p>

        <Dispatcher /> 

      </div>
    </GroupProvider>
  );
};

export default App;