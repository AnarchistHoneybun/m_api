// Graph.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import chroma from 'chroma-js';

const generateRandomData = (numDataPoints) => {
    const data = [];

    for (let i = 0; i < numDataPoints; i++) {
        data.push(Math.floor(Math.random() * 100)); // Generate random values between 0 and 99
    }

    return data;
};

const Graph = ({ color }) => {
    const data = generateRandomData(9); // Adjust the number of data points as needed
    const lighterColor = chroma(color).brighten(1.5).hex(); // Lighten the color by 1.5 steps

    const chartData = {
        labels: Array.from({ length: data.length }, (_, i) => i + 1), // Generate labels from 1 to the number of data points
        datasets: [
            {
                label: '', // Empty label to hide the legend
                data,
                backgroundColor: lighterColor, // Use the provided color with 40% opacity
                borderColor: lighterColor,
                borderWidth: 1,
            },
        ],
    };

    const options = {
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
    };

    return <Line data={chartData} options={options} className="Graph"/>;
};

export default Graph;