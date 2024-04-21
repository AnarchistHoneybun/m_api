import React, { useState } from 'react';
import supabase from '../lib/supabase-client';
import {toast} from "react-toastify";

function PaymentModal({ isOpen, onClose }) {
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let res = await supabase.auth.getUser();
    res = await supabase.from('users').select('user_id').eq('email', res.data.user.email);
    const user_id = res.data[0].user_id;

    const { error } = await supabase
      .from('payment_info')
      .insert([
        {
          user_id: user_id,
          cardholder_name: cardholderName,
          card_number: cardNumber,
          phone_number: phoneNumber
        },
      ]);

    if (error) {
      toast(error.message, {type: "error"});
    } else {
      toast("Payment information successfully added!", {type: "success"});
      setCardholderName(''); // reset cardholderName
      setCardNumber(''); // reset cardNumber
      setPhoneNumber('');
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="payment-modal">
      <form onSubmit={handleSubmit}>
        <label>
          Cardholder Name:
          <input type="text" value={cardholderName} onChange={(e) => setCardholderName(e.target.value)} required />
        </label>
        <label>
          Card Number:
          <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
        </label>
        <label>
          Phone Number:
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        </label>
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>Close</button>
      </form>
    </div>
  );
}

export default PaymentModal;