import React, { useState } from "react";
import "./CreateAccount.css";
import supabase from "../lib/supabase-client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [username, setUsername] = useState("");
  const [idType, setIdType] = useState("");
  const [idValue, setIdValue] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setError("Passwords do not match");
    } else {
      async function createNewUser(userEmail, userPassword, username, idType, idValue) {
        let res = await supabase.auth.signUp({
          email: userEmail,
          password: userPassword,
        });
        if (res.error) {
          toast(res.error.message, { type: "error" });
        } else {
          res = await supabase.from("users").insert({
            username: username,
            password: password,
            email: email,
            id_type: idType,
            id_value: idValue,
            user_uuid: res.data.session.user.id,
          });

          if (res.error) {
            toast(res.error.message, { type: "error" });
          } else {
            toast("Successfully created new account!", { type: "success" });
            res = await supabase.auth.signInWithPassword({email: email, password: password});
            if(res.error){
              toast("Sign in error. Please try signing in again", {type: error})
            }else{
              navigate("/user");
            }
            setEmail("");
            setPassword("");
            setRepeatPassword("");
            setUsername("");
            setIdType("");
            setIdValue("");
            setError("");
          }
        }
      }
      createNewUser(email, password, username, idType, idValue);
      // Reset fields after successful submission
    }
  };

  return (
    <div className="create-account-container">
      <h2>Create Account</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="idType">ID Type</label>
          <input
            type="text"
            id="idType"
            value={idType}
            onChange={(e) => setIdType(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="idValue">ID Value</label>
          <input
            type="text"
            id="idValue"
            value={idValue}
            onChange={(e) => setIdValue(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="repeatPassword">Confirm Password</label>
          <input
            type="password"
            id="repeatPassword"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
            className="input"
          />
        </div>
        <button type="submit" className="button">
          Create Account
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateAccount;