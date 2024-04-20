import React, { useEffect, useState } from 'react';
import { Bubble } from 'react-chartjs-2';
import supabase from '../lib/supabase-client';

function BubbleChart() {
  const [chartData, setChartData] = useState({ datasets: [] });

  // Create a color map for the users
  const userColorMap = {};

  // Define your two colors
  const color1 = '#249542'; // replace with your first hex code
  const color2 = '#edad21'; // replace with your second hex code

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
              userColorMap[item.username] = Math.random() > 0.5 ? color1 : color2;
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
        layout: {
          padding: {
            left: 20,
            right: 20,
            top: 50,
            bottom: 20
          }
        },
        scales: {
            y: {
              display: false,
              padding: {
                top: 10, // Add padding to the top
                bottom: 10, // Add padding to the bottom
              },
            },
            x: {
                display: false,
              padding: {
                top: 10, // Add padding to the top
                bottom: 10, // Add padding to the bottom
              },
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