import React, { useState, useEffect } from 'react';
import supabase from '../lib/supabase-client';

function BuyKeyModal({ isOpen, onClose, onSubmit }) {
  const [selectedTier, setSelectedTier] = useState('');
  const [requestReason, setRequestReason] = useState('');
  const [tiers, setTiers] = useState([]);

  useEffect(() => {
    const fetchTiers = async () => {
      const { data: tiersData } = await supabase
        .from('api_tier')
        .select('tier_name, tier_id');
      setTiers(tiersData);
    };
    fetchTiers();
  }, []);

  const handleSubmit = () => {
    onSubmit(selectedTier, requestReason);
    setSelectedTier(''); // reset selectedTier
    setRequestReason('');
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Buy Key</h2>
        <label>
          Tier:
          <select value={selectedTier} onChange={e => setSelectedTier(e.target.value)}>
            <option value="">Select a Tier</option>
            {tiers.map((tier, index) => (
              <option key={index} value={tier.tier_id}>{tier.tier_name}</option>
            ))}
          </select>
        </label>
        <label>
          Reason:
          <input type="text" value={requestReason} onChange={e => setRequestReason(e.target.value)} />
        </label>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default BuyKeyModal;