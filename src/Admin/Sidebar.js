import { Link, useNavigate } from "react-router-dom";
import supabase from "../lib/supabase-client";
import { CirclePlus, AreaChart, Users, LogOut } from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="Sidebar">
      <div className="Top">
        <div className="Logo">
          <img
            src="https://images.unsplash.com/photo-1713118774750-e1878e76b067?q=80&w=2844&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Company Logo"
          />
          <p>Mock API</p>
        </div>
        <hr />
        <ul>
          <li>
            <Link to="/dashboard" className="centerContainer">
              {" "}
              <AreaChart className="center" size={22} />
              <div className="center">Dashboard</div>{" "}
            </Link>
          </li>
          <li>
            <Link to="/dashboard/key-requests" className="centerContainer">
              <CirclePlus className="center" size={22} />
              <div className="center">Key Requests</div>
            </Link>
          </li>
          {/* Updated path */}
          <li>
            <Link to="/dashboard/users" className="centerContainer">
              <Users className="center" size={22} />
              <div className="center">Users</div>
            </Link>
          </li>
          {/* Updated path */}
        </ul>
      </div>
      <div className="Bottom">
        <div className="LogoutContainer">
          <div onClick={handleLogout} className="centerContainer">
            <LogOut className="center"/>
            <div className="center">Logout</div>
          </div>
        </div>
        <div className="Copyright">
          <p>&copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
