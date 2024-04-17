import React from 'react';
import Chip from './Chip';
import Globe from './Globe';
import LineChart from "./LineChart";

function Dashboard() {
  return (
      <div>
          <div className="ChipRow">
              <Chip color="#30475E" header="Total Users"/>
              <Chip color="#30475E" header="Total Bandwith"/>
              <Chip color="#30475E" header="Total Requests"/>
          </div>
          <div className="ChartPlaceholder">
                <LineChart/> {/* Add this line */}
          </div> {/* Add this line */}
          <div className="GlobeContainer">
              <Globe/> {/* Render the Globe component */}
          </div>
          {/* Dashboard content goes here */}
      </div>
  );
}

export default Dashboard;