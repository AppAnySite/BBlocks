import React from "react";
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import basestyle from "../Base.module.css";
import { auth } from "../../firebase-config";

const Profile = ({ setUserState, username }) => {
  let navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    setUserState({});
    navigate('/login');
  };

  return (
    <div className="profile">
      <h1 style={{ color: "white" }}>Welcome {username} !!</h1>
      <button className={basestyle.button_common} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
