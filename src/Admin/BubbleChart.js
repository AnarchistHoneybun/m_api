import React, { useEffect, useState } from 'react';
import { Bubble } from 'react-chartjs-2';
import supabase from '../lib/supabase-client';

function BubbleChart() {
  const [chartData, setChartData] = useState({ datasets: [] });

  // Create a color map for the users
  const userColorMap = {};

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.rpc("get_call_counts");
      console.log(data);
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setChartData({
          datasets: data.map((item, index) => {
            // If the user does not have a color yet, assign a random color
            if (!userColorMap[item.username]) {
              userColorMap[item.username] = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.6)`;
            }

            return {
              label: item.username,
              data: [{
                x: new Date(item.call_date).getTime(),
                y: item.num_calls,
                r: item.num_calls * 5, // Adjust the multiplier as needed
              }],
              backgroundColor: userColorMap[item.username],
            };
          }),
        });
      }
    }
    fetchData();
  }, []);

  return (
    <Bubble 
      data={chartData} 
      options={{
        scales: {
            y: {
              display: false,
            },
            x: {
                display: true,
            }
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
            },
          },
      }}
    />
  );
}

export default BubbleChart;