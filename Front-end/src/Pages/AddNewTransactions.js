import React, { useEffect, useState } from 'react'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from 'react-router-dom';
import axios from 'axios';
const AddNewTransactions = ({Tbudjet,data2,expenses_amount}) => {
// console.log(data2);
    const [showPopup, setShowPopup] = useState(false); 
    const [amount, setAmount] = useState(null);
    const [place, setPlace] = useState(null);
    const [month, setMonth] = useState(null);
    const [category, setCategory] = useState(null);
    const [otherCategory, setOtherCategory] = useState(null);
    const categoryValue = category === 'Other' ? otherCategory : category;
    const [balance, setBalance] = useState(() => {
        const storedBalance = localStorage.getItem('balance');
        return storedBalance ? parseFloat(storedBalance) : data2.wallet;
    });
    useEffect(() => {

        localStorage.setItem('balance', balance);
    }, [balance]);


 const [expenses,setExpenses] = useState(() => {
        const totalExpenses = localStorage.getItem('expenses');
        return totalExpenses? parseFloat(totalExpenses) : data2.wallet;
    });

    useEffect(() => {

        localStorage.setItem('expenses', expenses);
    }, [expenses]);


    const Expenses_details = async () => {

        const data = new FormData();
        data.append("Amount", amount)
        data.append("Place", place)
        data.append("Month", month)
        data.append("Category", categoryValue);
        data.append("_id",data2._id);

        if(balance<amount){
            alert("Insufficient balance")
        }
        else{
            const Response = await axios.post("http://localhost:3008/addtransaction/" +data2._id+"/"+ amount + "/" + place + "/" + month + "/" + categoryValue, data, { header: { "content-type": "multipart/form-data" } })
            if (Response) {
                setShowPopup(true)
                console.log(Response.data.updatedBalance);
                const updatedBalance=Response.data.updatedBalance;
                setBalance(updatedBalance);
                setExpenses(Response.data.Expenses)
                setTimeout(()=>{
                    setShowPopup(false)
                },2000)
    
            }
        }
       
    }



    return (
        <div id="body">
            <div id="main">
                <div id='main-display'>
                    <p>Hello, <span id='welcome'>{data2.Username}</span></p>
                    <div id='display-expense'>
                        <p>Total :</p>
                        <div id='dis-flex'>
                            <h2 id='curr'>&#x20b9;</h2>
                            <h1 id='total-exp'>{balance}</h1>
                        </div>
                    </div>
                    {/* <div id='display-bottom'>
                        <p id='brk'>Breakdown</p>
                        <i class="fas fa-angle-down"><ArrowDropDownIcon /></i>
                    </div> */}
                </div>
                <div id='main-profile'>
                    <div id='top-profile'>
                        <div id="user-profile">
                            <div id="user-image">
                                <img id='userImage' src='' />
                            </div>
                            <h1 id='h1' className='px-3'>Username</h1>
                            <Link to="/display" className='px-5 pt-1 pb-1 font_color' id='sign-out'>Dashboard</Link>
                        </div>
                    </div>
                    <div id='bottom-profile'>
                        <div id='icons'>
                            <div id='icon-box-form-1'>
                                <i class="fas fa-rupee-sign"><CurrencyRupeeIcon /></i>
                            </div>
                            <div id='icon-box-form-1'>
                                <i class="fas fa-rupee-sign"><LocalOfferIcon /></i>
                            </div>
                            <div id='icon-box-form-2'>
                                <i class="fas fa-tag"><LocalOfferIcon /></i>
                            </div>

                        </div>
                        <div id='bottom-form'>
                            {/* <form id='form' method="get" action="http://localhost:3008/expenses"> */}
                            <input type="text" id="amount" name="amount" placeholder='Amount' onChange={(event) => { setAmount(event.target.value) }} /><br />
                            <input type="text" id='place' name='place' placeholder="Place of Spend" onChange={(event) => { setPlace(event.target.value) }} /><br />
                            <input type="text" id='month' name='Month' placeholder="month" onChange={(event) => { setMonth(event.target.value) }} /><br />
                            <label class="radio-inline">
                                <input type="radio" id="Food & Beverage" name='category' value='Food or Beverage' onChange={(event) => { setCategory(event.target.value) }} />Food/Beverage
                            </label>
                            <label class="radio-inline">
                                <input type="radio" id="Travel/Commute" name='category' value='Travel or Commute' onChange={(event) => { setCategory(event.target.value) }} />Travel/Commute
                            </label>
                            <label class="radio-inline">
                                <input type="radio" id="Shopping" name='category' value='Shopping' onChange={(event) => { setCategory(event.target.value) }} />Shopping
                            </label>
                             
                            <label className="radio-inline">
                                <input type="radio" id="Other" name='category' value='Other' onChange={(event) => setCategory(event.target.value)} />Other
                            </label>
                            {category === 'Other' && (
                                <input type="text" placeholder="Specify Category" id='category' onChange={(event) => setOtherCategory(event.target.value)} />
                            )}
                            <br /> 
                            <button type="submit" id='submit' onClick={Expenses_details}> Add to Expense </button>
                            {/* </form> */}
                        </div>
                    </div>
                </div>
            </div>

            {showPopup && (
                <div className="toast-popup">
                    <div className="toast-content">
                        <strong>Item Added Successfully</strong>
                        {/* <p>Redirecting to your dashboard...</p> */}
                    </div>
                </div>
            )}

        </div>
    )
}

export default AddNewTransactions