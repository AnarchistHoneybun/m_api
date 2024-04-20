import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabase-client';
import './User.css';

function User() {
  const [selectedApiKey, setSelectedApiKey] = useState('');
  const [selectedEndpoint, setSelectedEndpoint] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [userName, setUserName] = useState('');
  const [apiKeys, setApiKeys] = useState([]);
  const [endpoints, setEndpoints] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getCurrentUser() {
      let res = await supabase.auth.getUser();
      res = await supabase.from('users').select('username').eq('email', res.data.user.email);
        setUserName(res.data[0].username);
    }
    getCurrentUser();
  }, []);

  useEffect(() => {
    async function fetchApiKeysAndEndpoints() {
      let res = await supabase.auth.getUser();
      res = await supabase.from('users').select('user_id').eq('email', res.data.user.email);
      const { data: apiKeysData } = await supabase
          .from('api_key')
          .select('key_name')
          .eq('user_id', res.data[0].user_id);
      setApiKeys(apiKeysData);

      const { data: endpointsData } = await supabase
          .from('endpoint')
          .select('endpoint_name');
      setEndpoints(endpointsData);
    }
    fetchApiKeysAndEndpoints();
  }, []);

  const handleMakeRequest = async () => {
    if (!selectedApiKey || !selectedEndpoint) {
      alert('Please select both an API Key and an Endpoint.');
      return;
    }

    // Fetch the key_id for the selected API Key
    const { data: apiKeyData } = await supabase
        .from('api_key')
        .select('key_id')
        .eq('key_name', selectedApiKey);
    const key_id = apiKeyData[0].key_id;

    // Fetch the endpoint_id for the selected Endpoint
    const { data: endpointData } = await supabase
        .from('endpoint')
        .select('endpoint_id')
        .eq('endpoint_name', selectedEndpoint);
    const endpoint_id = endpointData[0].endpoint_id;

    const { count } = await supabase
        .from('api_call')
        .select('call_id', { count: 'exact' });

    const call_id = count + 1;

    const random = Math.random();

    let status,call_metric;
    if (random <= 0.7) {
      status = 'SUCCESS';
      call_metric = Math.floor(Math.random() * 51) + 10; // Random number between 10 and 60
    } else {
      status = 'FAILED';
      call_metric = 0;
    }

    const { error } = await supabase
        .from('api_call')
        .insert([
          {
            call_id: call_id,
            key_id: key_id,
            call_log: new Date(),
            status: status,
            call_metric: call_metric,
            endpoint_id: endpoint_id
          },
        ]);

    if (error) {
      console.error('Error inserting new API call:', error);
    } else {
      alert('API call successfully made!');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <div className="hello-user">Hello {userName}</div>
            <div className="header-buttons">
              <button className="buy-key">Buy Key</button>
              <button className="logout" onClick={handleLogout}>Log Out</button>
            </div>
          </div>
        </header>
        <main className="content">
          <div className="dropdown-container">
            <select className="dropdown" onChange={e => setSelectedApiKey(e.target.value)}>
              <option value="">Select an API Key</option>
              {apiKeys.map((key, index) => (
                  <option key={index} value={key.key_id}>{key.key_name}</option>
              ))}
            </select>
            <select className="dropdown" onChange={e => setSelectedEndpoint(e.target.value)}>
              <option value="">Select an Endpoint</option>
              {endpoints.map((endpoint, index) => (
                  <option key={index} value={endpoint.endpoint_id}>{endpoint.endpoint_name}</option>
              ))}
            </select>
          </div>
          <button className="request-button" onClick={handleMakeRequest}>Make a New Request</button>
        </main>
      </div>
  );
}

export default User;
