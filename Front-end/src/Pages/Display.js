import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Progress from './Progress';
import CircleNotificationsRoundedIcon from '@mui/icons-material/CircleNotificationsRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import { BalanceOutlined, StorefrontRounded } from '@mui/icons-material';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import Modal from 'react-bootstrap/Modal';
import { ModalBody, ModalDialog, ModalFooter, ModalHeader } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';


const Display = ({data1, Tbalance, design}) => {
    const [display_modal, setModel] = useState(null);
    const [balance, setBalance] = useState(null);
    // const[expenses,setExpenses]=useState(null);
    const[totalBudjet,setTotalBudjet]=useState(JSON.parse(localStorage.getItem("budjet"))||null);
    const navigate = useNavigate();
    const totalExpenses = localStorage.getItem('expenses');


    const [Wbalance, setWalletBalance] = useState(() => {
        const storedBalance = localStorage.getItem('balance');
        return storedBalance ? parseFloat(storedBalance) : data1.wallet;
    });

    useEffect(() => {

        localStorage.setItem('balance', Wbalance);
    }, [Wbalance]);



    const Logout = () => {
        localStorage.removeItem("budjet");
        localStorage.removeItem("budjet_data"); 
        localStorage.removeItem("user_data");
        localStorage.removeItem("expenses"); 
        localStorage.removeItem("balance"); 
        navigate('/');
    };
   


    const WalletSet = async()=>{
         const data=new FormData();
        data.append("Balance",balance);
        data.append("userId",data1._id);
        const Response=await axios.post("https://expensetracker-backend-jzh9.onrender.com/display/"+data1._id+"/"+balance,data,{header:{"content-type":"multipart/form-data"}})
        if(Response){
            if(Response.data.status==='success'){
            const updatedBudget = Response.data.wallet;
            localStorage.setItem("budjet", JSON.stringify(updatedBudget));
            setTotalBudjet(updatedBudget);
            const updatedBalance=Response.data.Balance
            setWalletBalance(updatedBalance)
            // setExpenses(Response.data.Expenses)
            // console.log(Response.data.Balance)
            setModel(false);
            }
        }

    }

    useEffect(()=>{

    },[])


    return (
        <>
            <div className=' w-100 d-flex pt-3 main h-100' >
                <div className='left-side   px-3 shadow left_section'>
                    <h5>MY MONEY</h5>
                    <Link to='#' className='nav-link choice px-2 pt-1 pb-1 font_color'>Dashboard</Link>
                    <Link to='/addtransaction' className='nav-link choice px-2 pt-1 pb-1 font_color'>Add Expenses</Link>
                    <Link to='#' onClick={() => { setModel(!display_modal) }} className='nav-link choice px-2 pt-1 pb-1 font_color font_color'>My Wallet</Link>
                    <Link to='/Budjet' className='nav-link choice px-2 pt-1 pb-1 font_color'>Budget</Link>
                    <Link to='/' onClick={Logout} className='nav-link choice px-2 pt-1 pb-1 font_color'>LogOut</Link>
                </div>
                <div className='middle   w-75 px-2 shadow'>
                    <div className='d-flex justify-content-between'>
                        <h4 className='text-shadow'>Dashboard</h4>
                        {/* <input placeholder='search' className='border-0 bg-dark rounded p-1 text-light'></input> */}
                    </div>

                    <div>
                        <h6>My Cards</h6>
                        <div className='d-flex justify-content-between '>
                            <div className=' col-3  px-2  m-2  box1 rounded' >
                                <p className='m-0 p-0 h-25 font_size'>Budjet</p>
                                <p className=''>${totalBudjet}</p>
                            </div>

                            <div className=' col-3  px-2  m-2 box2  rounded text-light '>
                                <p className='m-0 p-0 h-25 font_size'>Total expenses</p>
                                <p className=''>${totalExpenses}</p>
                            </div>

                            <div className=' col-3  px-2  m-2 box2  rounded text-light '>
                                <p className='m-0 p-0 h-25 font_size'>Balance</p>
                                <p className=''>${Wbalance}</p>
                            </div>

                        </div>
                    </div>
                    <div className='p-1'>
                        <h5>Analysis</h5>
                        <div className='d-flex p-2'>
                            <Link to='#' className='nav-link border mx-1 p-2 rounded choice'>Income</Link>
                            <Link to='#' className='nav-link border mx-1 p-2 rounded choice'>Expenses</Link>
                        </div>
                        <div className='col-12 px-2 justify-content-center '>
                            {/* <img src="https://www.shutterstock.com/shutterstock/videos/12367121/thumb/2.jpg?ip=x480" className='w-100 p-3'></img> */}
                            {/* <Progress></Progress> */}
                            {design}
                        </div>

                    </div>
                </div>



                <div className='Right-side  w-50 px-4'>
                    <h5>Profile</h5>

                    <div className='d-flex justify-content-center row w-100   mx-0'>
                        <div className='w-25 text-center'>
                            <img src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg" className='w-100'></img>

                            
                        </div>
                        <p className='text-center m-0 p-0'>{data1.Username}</p>
                        {/* <div className='w-50 mt-3 justify-content-around d-flex mt-0'>
                            <p><CircleNotificationsRoundedIcon /></p>
                            <p><MailRoundedIcon /></p>
                            <p><CreateRoundedIcon /></p>
                        </div> */}

                    </div>
                    <div className='shadow mb-3'>
                        <div className='d-flex justify-content-between'>
                            <h4>Transactions</h4>
                            <Link to="/Budjet"><a href="#" className='nav-link text-primary'>See More</a></Link>
                        </div>
                        <div className='border'>
                            <p className='px-2'>Today</p>
                            <p className='text-center font_color' >Click See More to visit Transactions</p>
                        </div>
                    </div>

                    <div className='shadow'>
                        <div className='d-flex justify-content-between mt-2 mb-2 '>
                            <h4>Category</h4>
                            <Link to="/addtransaction"> <a href="#" className='nav-link text-primary'>See More</a></Link>
                        </div>

                        <div className='d-flex justify-content-around pb-3'>
                            <div className='cards  col-3 rounded  p-1 category_box'>
                                <p><StorefrontRoundedIcon /></p>
                                <p className='pt-2 pb-0 m-0'>shops</p>
                                <p className='pb-0'>$</p>
                            </div>

                            <div className=' col-3  rounded  p-1 category_box'>
                                <p><TimeToLeaveIcon /></p>
                                <p className='pt-2 pb-0 m-0'>Taxi</p>
                                <p>$</p>
                            </div>

                            <div className=' col-3  rounded  p-1 category_box' >
                                <p><StorefrontRoundedIcon /></p>
                                <p className='pt-2 pb-0 m-0'>shops</p>
                                <p>$</p>
                            </div>
                        </div>

                    </div>


                    <div>
                        <h4>Budget</h4>
                        <div className='d-flex justify-content-around mt-2 mb-2 pt-2'>
                            <div className=' col-3 rounded shadow px-1 small_box'>
                                <p>Total Balance</p>
                                <p>${totalBudjet}</p>
                            </div>

                            <div className=' col-3  rounded shadow px-1 small_box'>
                                <p>Total Expenses</p>
                                <p>${totalExpenses}</p>
                            </div>

                            <div className=' col-3  rounded shadow px-1 small_box'>
                                <p>Savings</p>
                                <p>${Wbalance}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <Modal show={display_modal}>
                <Modal.Body >
                    {/* <form method='get' action='http://localhost:3008/display'> */}
                    <div className='d-flex justify-content-centre align-items-center row'>
                        <h2 className='text-center'>Wallet Store</h2>
                         <input
                                placeholder='Enter Your Amount'
                                className='form-control text-center mt-3 mx-auto p-2 w-75'
                                value={balance}
                                onChange={(event) => setBalance(event.target.value)}
                                name="balance"
                            />
                         <button className=' mx-auto mt-3 rounded p-2 bg-success wallet-btn' type="submit" onClick={WalletSet}>Enter</button>
                            <button className=' mx-auto mt-3 rounded p-2 bg-secondary wallet-btn' onClick={() => setModel(null)} type="button">Close</button>
                    </div>
                    {/* </form> */}
                </Modal.Body>
            </Modal>

        </>
    )
}

export default Display
