import { useEffect, useState } from "react";
import supabase from "../lib/supabase-client";
import Modal from 'react-modal';

function Users() {
  const [users, setUsers] = useState([]);
  const [apiKeys, setApiKeys] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUsername, setCurrentUsername] = useState(null);

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

  const openModal = (userId, username) => {
    setCurrentUserId(userId);
    setCurrentUsername(username); // Store the username
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  return (
      <div>
        <h1 className="UserText">Users</h1>
          <table className="UsersTable">
            <thead>
            <tr>
              <th className="UserText">User ID</th>
              <th className="UserText">Username</th>
              <th className="UserText">Email</th>
              <th className="UserText">API Keys</th>
            </tr>
            </thead>
            <tbody>
            {/* Render the user data */}
            {users.map(user => (
                <tr key={user.user_id}>
                  {/* Render the user fields */}
                  <td className="UserText">{user.user_id}</td>
                  <td className="UserText">{user.username}</td>
                  <td className="UserText">{user.email}</td>
                  {/* New email column */}
                  <td>
                    <button className="ViewKeyButton" onClick={() => openModal(user.user_id, user.username)}>View API Keys</button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>

        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="API Keys Modal"
            className="modal-content"
        >
          <h2 className="modal-header">{currentUsername}'s API Keys</h2>
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
          <button onClick={closeModal} className="modal-close-button"></button> {/* Change "Close" to "X" */}
        </Modal>
      </div>
  );
}

export default Users;