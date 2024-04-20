import React from 'react';
import './Chip.css';
import Graph from "./Graph";

function Chip({ color, header, value }) {
  return (
      <div className="Chip" style={{backgroundColor: color}}>
          <div className="ChipText">
              <h1>{value}</h1>
              <h3>{header}</h3>
          </div>
          <Graph color={color}/>
      </div>
  );
}

export default Chip;