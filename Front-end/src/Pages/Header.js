import React from 'react'
import {Link} from'react-router-dom'
const Header = () => {
   
    return (
        <div className="mystyle">
       
            <nav className='p-nav d-flex p-bar  p-3'>
                <div className='p-nav-text heading text-primary m-4'>
                    <h1>Track Wallet</h1>
                    
                </div>
                <div className='d-flex justify-content-end m-4 text-danger-emphasis'>
                    {/* <p className=' mt-4 px-3'>How it works</p>
                    <p className=' mt-4 px-3 '>credit cards</p>
                    <p className=' mt-4 px-3 '>investing</p>
                    <p className='mt-4 px-3'>loans</p>
                    <p className=' mt-4 px-3'>reference</p> */}
                    <Link to='/login'><h5 className=' mt-4 px-3 log'>Login</h5></Link>
                    <Link to='/Signup'><h5 className=' mt-4 px-3 log'>Signup</h5></Link>
                </div>
            </nav>
            <nav className='s-nav '>
                <div className='justify-content-around text-dark align-items-center ms-5 mt-5'>
                    <div>
                        <h1>Save Money Without Thinking About it.</h1>
                       <p> Take charge of your finances with our <br/>
                       intuitive expense tracker.<br/>
                        Simplify the way you track expenses, <br/>
                        categorize spending, and maintain control<br/>
                         over your finances effortlessly.<br/>
                          Whether you're budgeting for personal goals<br/>
                           or managing business expenses, our tool empowers<br/>
                            you to make informed decisions and achieve financial success.</p>
                        <div>
                            <Link to="/Signup"><button onclick className='w-40 mt-3  rounded bg-danger-subtle '>SIGN UP NOW</button></Link>
                        </div>
                    </div>
                   <div></div>

                </div>
            </nav>
        </div>

    )
}

export default Header;