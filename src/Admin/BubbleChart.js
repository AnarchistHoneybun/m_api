import React, { useEffect, useState } from 'react';
import { Bubble } from 'react-chartjs-2';
import supabase from '../lib/supabase-client';

function BubbleChart() {
    const [chartData, setChartData] = useState({ datasets: [] });


  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.rpc("get_call_counts");
        console.log(data);
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setChartData({
            datasets: data.map((item, index) => ({
            label: `User ${item.username} on ${item.call_date}`,
              data: [{
                x: new Date(item.call_date).getTime(),
                y: item.num_calls,
                r: item.num_calls * 5, // Adjust the multiplier as needed
              }],
              backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.6)`,
            })),
          });
        }
      }
      fetchData();
    }, []);

  return <Bubble data={chartData} />;
}

export default BubbleChart;