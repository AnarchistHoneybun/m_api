import React, { useState, useEffect, useRef } from 'react';
import './Login.css';
import createGlobe from "cobe";
import { useNavigate } from "react-router-dom";
import '../index.css';
import supabase from "../lib/supabase-client";
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {  
  const canvasRef = useRef();
  const [toggle, setToggle] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  let navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username && password) {
      // setFormSubmitted(true);
      // setLoggedInUser({ username, role: toggle ? 'Admin' : 'User' });
      console.log(toggle);
      if(!toggle){
        async function signIn(){
          let res = await supabase.auth.signInWithPassword({email: username, password: password});
          if(res.error){
            toast(res.error.message, {type: "error"});
          }else{
            navigate("/user")
          }
        }
        signIn();
      }else{
        navigate("/dashboard")
      }
    }else{
      toast("Error logging in. Please try again!", {type: "error"});
    }
  };
  

  const handleCreateAccount = () => {
    console.log("Creating user account...");
    window.location.href = '/create-account';
  };

  useEffect(() => {
    let phi = 0;
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1000 * 2,
      height: 1000 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 }
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.01;
      }
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className={`container ${toggle ? 'admin' : 'user'}`}>
      <div className="globe-container">
        <canvas
          ref={canvasRef}
          className="globe-canvas"
          style={{ width: '1000px', height: '1000px' }} 
        />
      </div>
      <h1 className="header">API SERVER</h1>
      {loggedInUser ? (
        <div className="welcome">
          <h2>Welcome, {loggedInUser.username} ({loggedInUser.role})!</h2>
        </div>
      ) : (
        <form className="form-container" onSubmit={handleSubmit}>
          <h2>{toggle ? 'Admin Login' : 'User Login'}</h2>
          <label htmlFor="username">E-Mail:</label>
          <input
            type="email"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter your email"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            required
          />
          <div> {/* Added div wrapper */}
            <button type="submit" disabled={!username || (password.length<6) || formSubmitted}>
              {formSubmitted ? 'Logging In...' : 'Login'}
            </button>
            {!toggle && (
              <button type="button" onClick={handleCreateAccount}>Create Account</button>
            )}
          </div>
        </form>
      )}
      {!loggedInUser && (
        <div className="toggle-container">
          <span>User</span>
          <label className="switch">
            <input type="checkbox" onChange={handleToggle} checked={toggle} />
            <span className="slider round"></span>
          </label>
          <span>Admin</span>
        </div>
      )}
    <ToastContainer/>
    </div>
  );
};

export default Login;
