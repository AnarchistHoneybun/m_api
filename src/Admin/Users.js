import { useEffect, useState } from "react";
import supabase from "../lib/supabase-client";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    async function getData(){
      const { data, error } = await supabase.from("users").select();
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setUsers(data);
      }
    }
    getData();
  },[])

  return (
    <div>
      <h1>Users</h1>
      <table className="UsersTable">
        <thead>
          <tr>
            {/* Replace with your actual column names */}
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.user_id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              {/* Add more cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;