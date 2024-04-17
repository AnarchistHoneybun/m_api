import React from 'react';
import './Chip.css';

function Chip({ color, header }) {
  return (
    <div className="Chip" style={{ backgroundColor: color }}>
      <h3>{header}</h3>
    </div>
  );
}

export default Chip;