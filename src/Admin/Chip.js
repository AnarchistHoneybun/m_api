import React from 'react';
import './Chip.css';

function Chip({ color, header, value }) {
  return (
    <div className="Chip" style={{ backgroundColor: color }}>
      <h3>{header}</h3>
      <p>{value}</p>
    </div>
  );
}

export default Chip;