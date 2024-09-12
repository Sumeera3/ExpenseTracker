import { Padding } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BudjetList from './BudjetList';
import { Link } from 'react-router-dom';
const Budjet = ({data1}) => {
  // console.log("USER_ID IN BUDJET PAGE :",data1._id);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [expenses, setExpenses] = useState(JSON.parse(localStorage.getItem("budjet_data")) || []);


  const Budjet_list = async (month) => {
    const data = new FormData;
    data.append("Month", month)
    data.append("userId",data1._id)
    const Response = await axios.post("http://localhost:3008/Budjet/"+data1._id+"/"+ month, data, { headers: { "content-type": "multipart/form_data" } })
    if (Response) {
      if(Response.data.status==='success'){
        const expensesData = Response.data.data;
      localStorage.setItem("budjet_data", JSON.stringify(expensesData));
      setExpenses(expensesData);





      
      }
      else {
        console.error("Error in fetching budget data:", Response.data.message);
      }
      
    }
   

  }

  const handleMonthChange = (e) => {
    const Month = e.target.value;
    setSelectedMonth(Month);
    if (Month !== 'Select Month') {
      Budjet_list(Month);
    }
  };


  const totalExpenses = expenses.reduce((total, expense) => {
    return total + parseFloat(expense.amount || 0);
  }, 0);
  // console.log("totalExpenses:",totalExpenses);
  
  return (
    <>
      <div className='Budjet'>
        <h1 className="text-center pt-2 Budjet-heading">Monthly Budget</h1>
        <div className=" month-selector  text-center">
          <select className='border rounded p-2' onChange={handleMonthChange} value={selectedMonth}>
            <option>Select Month</option>
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>
          </select>


        </div>

        {expenses ?
          <table className='text-center border w-75 mx-auto mt-4'>
            <tr className='border table-head'>
              <th className=''>EXPENSES</th>
              <th>AMOUNT</th>
              <th>PLACE OF SPEND</th>
            </tr>

            {expenses.map((value) => (
              <BudjetList key={value._id} data={value} />


            ))}
            <tr>
              <td className='border'>TOTAL EXPENSES </td>
              <td><b>{totalExpenses}</b></td>
            </tr> </table> : <>
            <table className='text-center border w-75 mx-auto mt-4'>
              <tr className='border table-head'>
                <th className=''>EXPENSES</th>
                <th>AMOUNT</th>
                <th>PLACE OF SPEND</th>
              </tr>
              <tr className='border text-center'><td className='text-center mx-auto'>No Expenses in that month</td></tr>
              <tr className='border'>
                <td className='border'>TOTAL EXPENSES </td>
              </tr>
            </table></>
        }

        <div className='mt-3 text-center'>
          <Link to="/display" className='rounded border mx-auto bg-dark text-light back-btn'>Dashboard</Link>
        </div>
      </div >
    </>
  )
}

export default Budjet
