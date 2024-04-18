import { useEffect, useState } from "react";
import supabase from "../lib/supabase-client";
import Modal from 'react-modal';

function Users() {
  const [users, setUsers] = useState([]);
  const [apiKeys, setApiKeys] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(()=>{
    async function getData(){
      const { data: userData, error: userError } = await supabase.from("users").select();
      if (userError) {
        console.error('Error fetching user data:', userError);
      } else {
        setUsers(userData);

        // Fetch the API keys for each user
        const apiKeysData = {};
        for (const user of userData) {
          const { data: keyData, error: keyError } = await supabase.from("api_key").select().eq("user_id", user.user_id);
          if (keyError) {
            console.error(`Error fetching API keys for user ${user.user_id}:`, keyError);
          } else {
            apiKeysData[user.user_id] = keyData;
          }
        }
        setApiKeys(apiKeysData);
      }
    }
    getData();
  },[])

  const openModal = (userId) => {
    setCurrentUserId(userId);
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  return (
    <div>
      <h1>Users</h1>
      <table className="UsersTable">
        {/* Render the user data */}
        {users.map(user => (
          <tr key={user.user_id}>
            {/* Render the user fields */}
            <td>{user.user_id}</td>
            <td>{user.username}</td>
            <td>
              <button onClick={() => openModal(user.user_id)}>View API Keys</button>
            </td>
          </tr>
        ))}
      </table>

      <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="API Keys Modal"
  className="modal-content"
>
  <h2 className="modal-header">API Keys for User {currentUserId}</h2>
  <table className="modal-table">
    <thead>
      <tr>
        <th>Key ID</th>
        <th>Key Name</th>
        <th>Billing Date</th>
        <th>Expiry Date</th>
        <th>Tier ID</th>
      </tr>
    </thead>
    <tbody>
      {apiKeys[currentUserId] && apiKeys[currentUserId].map(key => (
        <tr key={key.key_id}>
          <td>{key.key_id}</td>
          <td>{key.key_name}</td>
          <td>{key.billing_date}</td>
          <td>{key.expiry_date}</td>
          <td>{key.tier_id}</td>
        </tr>
      ))}
    </tbody>
  </table>
  <button onClick={closeModal} className="modal-close-button">Close</button>
</Modal>
    </div>
  );
}

export default Users;