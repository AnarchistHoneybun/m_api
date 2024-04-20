import React, { useEffect, useState } from 'react';
import supabase from '../lib/supabase-client';
import Chip from './Chip';
import Globe from './Globe';
import LineChart from "./LineChart";
import BubbleChart from './BubbleChart';

function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBandwidth, setTotalBandwidth] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);

  useEffect(() => {
    async function fetchTotalUsers() {
      const { data, count, error } = await supabase.from("users").select('*', { count: 'exact', head: true });
      console.log(data);
      if (error) {
        console.error('Error fetching total users:', error);
      } else {
        setTotalUsers(count);
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

  useEffect(() => {
    async function fetchTotalRequests() {
      const { data, count, error } = await supabase.from('api_call').select('call_id', { count: 'exact' });
      if (error) {
        console.error('Error fetching total requests:', error);
      } else {
        setTotalRequests(count);
      }
    }
    fetchTotalRequests();
  }, []);

  return (
      <div>
          <div className="ChipRow">
              <Chip color="#3d99f5" header="Total Users" value={totalUsers}/>
              <Chip color="#db5d5d" header="Total Bandwith" value={totalBandwidth}/>
              <Chip color="#249542" header="Total Requests" value={totalRequests}/>
          </div>
          <div className="ChartPlaceholder">
                <BubbleChart/>
          </div>
          <div className="GlobeContainer">
              <Globe/>
          </div>
      </div>
  );
}

export default Dashboard;