import React, { useState, useEffect } from "react";
import "./App.css";
import Profile from "./Components/Profile/Profile";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "./firebase-config";

function App() {
  const [userState, setUserState] = useState(null); // Start with null to represent no user
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUserState(user);
      } else {
        setUserState(null); // Use null when there is no user
      }
    });

    setBackgroundImage('https://source.unsplash.com/1600x900/?nature');

    return () => {
      unsubscribe();
      setUserState(null);
    };
  }, []);

  const appStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
    <div className="App" style={appStyle}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              userState ? (
                <Profile setUserState={setUserState} username={userState.displayName} />
              ) : (
                <Login setUserState={setUserState} />
              )
            }
          />
          <Route path="/login" element={<Login setUserState={setUserState} />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
