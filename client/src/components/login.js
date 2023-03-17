import React, { useRef, useEffect, useState } from 'react';

function Login(){

    const [userProfile, setUserProfile] = useState({
        username: "",
        password: ""
    })

    const {username, password} = userProfile
    
    function handleChange(e){
        const {name, value} = e.target

        setUserProfile({...userProfile, [name]: value})
    }

    function login(e){
        e.preventDefault()
    }




    return(
       <div className="login">
           <br></br>
           <br></br>
           <br></br>
           <h3 className="login-title">Login</h3>
           <form>
            <h5>username:</h5>
            <input className="login-field" name="username" value={username} onChange={handleChange}></input>
            <h5>password:</h5>
            <input className="login-field" name="password" value={password} onChange={handleChange}></input>
            <input type='submit'></input>
           </form>


       </div>
    )
}

export default Login;