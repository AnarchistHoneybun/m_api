import React, { useEffect, useState } from 'react';
import supabase from '../lib/supabase-client';
import Chip from './Chip';
import Globe from './Globe';
import LineChart from "./LineChart";

function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBandwidth, setTotalBandwidth] = useState(0);

  useEffect(() => {
    async function fetchTotalUsers() {
      const { data, error } = await supabase.from("users").select();
      console.log(data);
      if (error) {
        console.error('Error fetching total users:', error);
      } else {
        setTotalUsers(data.length);
      }
    }
    fetchTotalUsers();
  }, []);

  useEffect(() => {
    async function fetchTotalBandwidth() {
      const { data, error } = await supabase.from('api_call').select('call_metric.sum()');
      console.log(data);
      if (error) {
        console.error('Error fetching total bandwidth:', error);
      } else {
        setTotalBandwidth(data[0].sum);
      }
    }
    fetchTotalBandwidth();
  }, []);

  return (
      <div>
          <div className="ChipRow">
              <Chip color="#30475E" header="Total Users" value={totalUsers}/>
              <Chip color="#30475E" header="Total Bandwith" value={totalBandwidth}/>
              <Chip color="#30475E" header="Total Requests"/>
          </div>
          <div className="ChartPlaceholder">
                <LineChart/>
          </div>
          <div className="GlobeContainer">
              <Globe/>
          </div>
      </div>
  );
}

export default Dashboard;