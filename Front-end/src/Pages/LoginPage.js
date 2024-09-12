// import axios from "react";
import axios from "axios";
import { useState } from 'react';
import { Link } from "react-router-dom";
function LoginPage() {
    const[userdata,SetUserData]=useState(JSON.parse(localStorage.getItem("user_data")))
    const[email,setEmail]=useState(null)
    const[password,setPassword]=useState(null)
    const [showPopup, setShowPopup] = useState(false); 
    
    const UserLogin = async()=>{
        const data=new FormData();
        data.append("Email",email)
        data.append("password",password)
        const Response=await axios.get("https://expensetracker-backend-jzh9.onrender.com/login/"+email+"/"+password,data,{header:{"content-type":"multipart/form-data"}})
 
        if(Response.data.status=='success'){
            SetUserData(localStorage.setItem("user_data",JSON.stringify(Response.data.data)))
            setShowPopup(true);
            setTimeout(() => {
                window.location.replace("./display");
            }, 2000);
        }
        else{
            alert("Invalid Email or Password");
        }
    }
    return (
        <div className="">
            <div className="backimg d-flex align-items-center">
                <div className="col-4 rounded mx-auto border border-danger-subtle shadow p-4">

                    <h3 className="mb-4 text-danger-emphasis text-center">Sign in</h3>
                    {/* <form method="get" action="http://localhost:3008/login"> */}
                        <input placeholder="email address" className="form-control mb-3" name="Email" onChange={(event)=>{setEmail(event.target.value)}}></input>

                        <input placeholder="password " className="form-control" type="password" name="password"  onChange={(event)=>{setPassword(event.target.value)}}></input>

                        <p className="mt-4 text-info-emphasis text-center ">Forgot Password?</p>

                        <button onClick={UserLogin} className="btn bg-primary w-100 mt-3">Login</button>
                    {/* </form> */}

                    <div className="d-flex justify-content-center">
                        <button className=" btn bg-info-subtle w-25 p-2 mt-3  mx-2" >
                            <img className="w-25" src="https://e7.pngegg.com/pngimages/197/911/png-clipart-social-media-computer-icons-facebook-fb-icons-facebook-logo-miscellaneous-blue-thumbnail.png"></img> </button>
                        <button className="btn bg-info-subtle w-25 mt-3 p-2 mx-2" >
                            <img className="w-25" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4YWIiW6qyJSbH_JiRRwcxG6g7pXZS0rRtOA&s"></img></button>

                        <button className="  btn bg-info-subtle w-25 mt-3 p-2 mx-2  " >
                            <img className="w-25" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5LEV-ApZUO6OUnu1ulvL8F3L91AqHlpD0Hw&s"></img></button>

                    </div>
                    <div className="d-flex mt-2 ">
                        <p>Not a member?</p>
                        <Link to="/Signup"><p className="mx-2 text-decoration-underline">Signup Now</p></Link>

                    </div>


                </div>
            </div>


            {showPopup && (
                <div className="toast-popup">
                    <div className="toast-content">
                        <strong>Login Successful!</strong>
                        <p>Redirecting to your dashboard...</p>
                    </div>
                </div>
            )}


        </div>

    );

}
export default LoginPage;
