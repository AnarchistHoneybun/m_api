import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="Top">
        <div className="Logo">
          <img src="https://images.unsplash.com/photo-1713118774750-e1878e76b067?q=80&w=2844&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Company Logo" />
          <p>Mock API</p>
        </div>
        <hr />
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/dashboard/key-requests">KeyRequests</Link></li> {/* Updated path */}
          <li><Link to="/dashboard/users">Users</Link></li> {/* Updated path */}
        </ul>
      </div>
      <div className="Copyright">
        <p>&copy; {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}

export default Sidebar;