import React, { useRef, useEffect, useState } from 'react';

function Login({user, setUser}){

    const [toggle, setToggle] = useState(false)

    const [userProfile, setUserProfile] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    })

    const {email, password, first_name, last_name} = userProfile
    
    function handleChange(e){
        const {name, value} = e.target

        setUserProfile({...userProfile, [name]: value})
    }

    function signup(e){
        e.preventDefault()

        let newUser = {
            first_name,
            last_name,
            email,
            password
        }

        fetch("/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newUser),
        })
        .then((res)=>{
            if (res.ok){
                res.json().then(user=>{
                    setUser(user)
                    console.log("new User:", user)
                    alert("SUCCESS new user:", user)
                })
            }else{
                res.json().then((errors) => {
                    console.log(errors.errors)
                })
            }
        })

    
    }

    function switchToggle(){
        setToggle(!toggle)
    }


    console.log(first_name, last_name, email, password)



    return(
       <div className="login">
           <br></br>
           <br></br>
           <br></br>
           {
            !toggle
            ? 
            <div>
                <h3 className="login-title">Login</h3>
                <form className='login_form'>
                    <h5>email:</h5>
                    <input className="login-field" name="email" value={email} onChange={handleChange}></input>
                    <h5>password:</h5>
                    <input className="login-field" name="password" value={password} onChange={handleChange}></input>
                    <br></br>
                    <input className='login_submit' type='submit'></input>
                </form>
                 or
                <div className='create-account'>
                    <h5 className='login-links' onClick={switchToggle}>Create Account</h5>
                    <h5 className='login-links'>Forgot Password?</h5>
                </div>
            </div>     
            : 
            <div>
                <h3 className="login-title">Sign Up</h3>
                <form onSubmit={signup} className='login_form'>
                    <h5>First Name:</h5>
                        <input className="login-field" name="first_name" value={first_name} onChange={handleChange}></input>
                    <h5>Last Name:</h5>
                        <input className="login-field" name="last_name" value={last_name} onChange={handleChange}></input>
                    <h5>email:</h5>
                        <input className="login-field" name="email" value={email} onChange={handleChange}></input>
                    <h5>password:</h5>
                        <input className="login-field" name="password" value={password} onChange={handleChange}></input>
                    <br></br>
                    <input className='login_submit' type='submit'></input>
                </form>
                or
                <div className='create-account'>
                    <h5 className='login-links' onClick={switchToggle}>Sign in</h5>
                    <h5 className='login-links'>Forgot Password?</h5>
                </div>
            </div>
            
            }
       </div>
    )
}

export default Login;