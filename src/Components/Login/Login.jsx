import axios from 'axios';
import React from 'react'

const Login = (props) => {
    let user = {
        email : "" , 
        password : ""
    }
    function getUser({target})
    {
        user[target.name] = target.value;
    }

    async function sendData()
    {
        let {data} = await axios.post("https://route-egypt-api.herokuapp.com/signin",user);
        if(data.message === "success") {
            localStorage.setItem("token" , data.token);
            props.history.replace("/home");
        } else {
           localStorage.clear();
        }
    }

    return (
        <>
             <div className="container my-5 py-5">
        <div className="col-md-5 m-auto text-center">
            
                <div className="form-group mb-3">
                    <input onKeyUp = {getUser} placeholder="Enter email" name="email" type="email" className="form-control" />
                </div>
                <div className="form-group mb-3">
                    <input onKeyUp = {getUser} placeholder="confirm Password" name="password" type="password" className="form-control" />
                </div>
                <button onClick = {sendData} type="submit" className="btn btn-info w-100">SignIn</button>
            
        </div>
    </div>
        </>
    )
}

export default Login
