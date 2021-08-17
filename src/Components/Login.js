import React from 'react'
import {Link} from 'react-router-dom'

function Login() {
    return (
        <div className="form" id="signin-form">
        <div className="signin">
            <h1>Sign in</h1>
        </div>

   
        <div className="form-group">
            <input type="text" className="form-input" placeholder="Name" id="name"/>
        
        </div>
        
        <div className="form-group">
            <input type="email" className="form-input" placeholder="Email" id="signin-email"/>
            <span className="form-input-icon err"><i className='bx bx-error-circle'></i></span>
            <span className="form-input-icon success"><i className='bx bx-check-circle'></i></span>
            <span className="form-input-err-msg" data-err-for="signin-email"></span>
        </div>
        <div className="form-group">
            <input type="password" className="form-input" placeholder="Password" id="signin-password"/>
            <span className="form-input-icon err"><i className='bx bx-error-circle'></i></span>
            <span className="form-input-icon success"><i className='bx bx-check-circle'></i></span>
            <span className="form-input-err-msg" data-err-for="signin-password"></span>
        </div>
       
        
    
        <span className="form-txt">
            Don't have an account?
            <Link to="/register">REGISTER!</Link>
        </span>
        <span className="form-txt">
            <Link to = "/forgotPassword">Forgot password?</Link>
        </span>
    </div>
    )
}

export default Login;
