// V2 OF APP

// React library imports
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Components impors
import PostButton from "./components/PostButton";
import Feed from "./components/Feed";
import LoginPage from "./components/LoginPage";

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
    <Router>
      <div className="container">
        <Routes>
          // <Route path="/login" component={LoginPage} />
          //{" "}
          <Route path="/" exact>
            <div className="logo-container">
              <img src={iconLogo} alt="Icon Logo" className="logo-icon" />
              <img src={textLogo} alt="Text Logo" className="logo-text" />
            </div>
            <p>
              Today is {day}, {date}.
            </p>

            <Feed groupId="testGroupID" />

            <div style={{ height: "100px" }}></div>

            <div style={{ position: "fixed", bottom: "30px", right: "30px" }}>
              <PostButton />
            </div>
          </Route>
          //{" "}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
