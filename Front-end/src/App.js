import logo from './logo.svg';
import './Styling/App.css';
import './Styling/dashboard.css';
import './Styling/style.css';
import './Styling/Budjet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Header from './Pages/Header';
import AddNewTransactions from './Pages/AddNewTransactions';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import Display from './Pages/Display';
import MyComponent from './MyComponent';
import Budjet from './Pages/Budjet';
import BudjetList from './Pages/BudjetList';
import Progress from './Pages/Progress';



function App() {
  
  const[userdata,SetUserData]=useState(JSON.parse(localStorage.getItem("user_data")))
  const [expenses, setExpenses] = useState(JSON.parse(localStorage.getItem("budjet_data")) || []);
  const[totalBudjet,setTotalBudjet]=useState(JSON.parse(localStorage.getItem("budjet")));
  const [balance, setBalance] = useState(localStorage.getItem("balance"))
  return (<div>
   
    <BrowserRouter>
   
      <Routes>

        <Route path="/" element={<Header/>}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
         <Route path="/signup" element={<SignupPage />}></Route>
         <Route path="/addtransaction" element={<AddNewTransactions Tbudjet={totalBudjet} data2={userdata} design={<Progress/>}/>}></Route>
         {/* <Route path="/display" element={<Display data1={userdata} Tbalance={balance}/>}></Route> */}
        <Route path="/display" element={<Display data1={userdata} Tbalance={balance} design={<Progress data1={userdata} />}/>}></Route>

         <Route path="/transactions" element={<MyComponent/>}></Route>
         <Route path="/Budjet" element={<Budjet data1={userdata}/>}></Route>
      </Routes>
    </BrowserRouter>
  

  </div>
  );

}

export default App;

