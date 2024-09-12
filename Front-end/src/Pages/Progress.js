import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const Progress = ({data1}) => {
  const [monthlySums, setMonthlySums] = useState([]);
console.log(data1)
  useEffect(() => {
    const fetchMonthlySums = async () => {
      const data=new FormData();
       data.append("userId",data1._id);
        const Response=await axios.get("http://localhost:3008/display/"+data1._id,data,{header:{"content-type":"multipart/form-data"}})
        if(Response){
          console.log(Response)
          if (Response.data.status === 'success') {
          setMonthlySums(Response.data.data);
        } else {
          console.error("Error fetching monthly expenses:", Response.data.message);
        }
      }
    };

    fetchMonthlySums();
  }, [data1]);

  return (
    <>
      <h3 className='History text-center'>History</h3>
      <ResponsiveContainer width="100%" aspect={3} className="mt-5 Graph">
        <LineChart data={monthlySums}>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip contentStyle={{ backgroundColor: 'black', color: '#333', border: '1px solid #ccc' }} 
            labelStyle={{ color: '#8884d8' }} />
          <Legend />
          <Line type="monotone" dataKey="Amount" stroke="#8884d8" strokeWidth={2}  />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default Progress;
