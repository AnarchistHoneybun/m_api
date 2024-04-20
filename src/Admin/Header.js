import { useState, useEffect } from "react";
import supabase from "../lib/supabase-client";
import { useNavigate } from "react-router-dom";

// Header.js
function Header() {
  const [admin, setAdmin] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getCurrentAdmin() {
      let res = await supabase.auth.getUser();
      console.log(res);
      if (res.error) {
        navigate("/");
      } else {
        res = await supabase
          .from("users")
          .select("admin(full_name)")
          .eq("email", res.data.user.email);
        setAdmin(res.data[0].admin.full_name);
      }
    }
    getCurrentAdmin();
  }, []);
  return (
    <div className="Header">
      <div className="Profile">
        <p>{admin.length && `Welcome, ${admin}`}</p>
        <img
          src="https://images.unsplash.com/photo-1713118774750-e1878e76b067?q=80&w=2844&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Profile Icon"
          className="ProfileIcon"
        />
      </div>
    </div>
  );
}

export default Header;
