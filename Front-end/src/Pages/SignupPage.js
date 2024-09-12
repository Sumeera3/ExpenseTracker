import { Phone } from '@mui/icons-material';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom'

function SignupPage() {
    const [showPopup, setShowPopup] = useState(false); 
    const[first_name,setFirstName]=useState(null)
    const[last_name,setLastName]=useState(null)
    const[email,setEmail]=useState(null)
    const[Username,setUserName]=useState(null)
    const[pnone_number,setPhoneNumber]=useState(null)
    const[password,setPassword]=useState(null)

    const UserAccount = async()=>{

        const data=new FormData();
        data.append("first_name",first_name)
        data.append("last_name",last_name)
        data.append("Email",email)
        data.append("Useranme",Username)
        data.append("Mobile",pnone_number)
        data.append("password",password)
        const Response=await axios.post("http://localhost:3008/signup/"+first_name+"/"+last_name+"/"+email+"/"+Username+"/"+pnone_number+"/"+password,data,{header:{"content-type":"multipart/form-data"}})
        if(Response){
           if(Response.data.status==="success"){
            setShowPopup(true);
            setTimeout(() => {
                window.location.replace("./login");
            }, 2000);
           }

        }
    }


    return (
        <div className='d-flex'>
            <img className='w-50' src="https://img.freepik.com/premium-vector/salary-payment-employee-workers-are-happy-receive-monthly-salary-people-calculating-money_566886-10737.jpg"></img>

            <div className="col-4 rounded mx-auto border bg-danger-subtle mt-3 p-3">
                <h3 className="mb-4 text-primary  text-center">Signup</h3>

                {/* <form method='get' action='http://localhost:3008/signup'> */}

                    <input name='first_name' placeholder="first name" className="form-control mb-3 border border-primary-subtle" onChange={(event)=>{setFirstName(event.target.value)}}></input>

                    <input name='last_name' placeholder="last name " className="form-control border border-primary-subtle"  onChange={(event)=>{setLastName(event.target.value)}}></input>

                    <h5 className="mt-3 text-primary">Email</h5>
                    <input name='Email' placeholder="Email" className="form-control border border-primary-subtle"  onChange={(event)=>{setEmail(event.target.value)}}></input>

                    <h5 className="mt-3 text-primary">Username</h5>
                    <input name='Username' placeholder="Username" className="form-control border border-primary-subtle"  onChange={(event)=>{setUserName(event.target.value)}}></input>

                    <h5 className="mt-3 text-primary">Mobile Number</h5>
                    <input name='Mobile' placeholder="mobile number " className="form-control border border-primary-subtle" onChange={(event)=>{setPhoneNumber(event.target.value)}}></input>

                    <h5 className="mt-3 text-primary">password</h5>
                    <input name='password' placeholder="Atleast 6 letters" className="form-control border border-primary-subtle" onChange={(event)=>{setPassword(event.target.value)}}></input>

                    <button onClick={UserAccount} className=" btn bg-info-subtle w-100 mt-3">Create Account</button>
                {/* </form> */}

            </div>


            {showPopup && (
                <div className="toast-popup">
                    <div className="toast-content">
                        <strong>Signup Successful!</strong>
                        {/* <p>Redirecting to your dashboard...</p> */}
                    </div>
                </div>
            )}

        </div>
    );
}
export default SignupPage;