import axios from 'axios';
import React from 'react'


const Register = (props) => {
    
let user = {
    first_name : "" ,
    last_name : "" , 
    email : "" ,
    password : "" ,
    age : ""

}

function getFormData({target})
{
    user[target.name] = target.value;
}

async function signUp()
{
    let {data} = await axios.post("https://route-egypt-api.herokuapp.com/signup",user);
    if(data.message === "success") {
        props.history.push("/login");
    }
}

    return (
    <>
        <div className="container my-5 py-5">
            <div className="col-md-5 m-auto text-center">
                <div className="form-group mb-3">
                    <input onKeyUp = {getFormData} name = "first_name" placeholder="Enter your first name" type="text" className=" form-control" />
                </div>
                <div className="form-group mb-3">
                    <input onKeyUp = {getFormData} name = "last_name" placeholder="Enter your last name" type="text" className=" form-control" />
                </div>
                <div className="form-group mb-3">
                    <input onKeyUp = {getFormData} placeholder="Enter email" type="email" name="email" className="form-control" />
                </div>
                <div className="form-group mb-3">
                    <input onKeyUp = {getFormData} placeholder="Enter you password" type="password" name="password" className="form-control" />
                </div>
                <div className="form-group mb-3">
                    <input onKeyUp = {getFormData} placeholder="Enter your age" name = "age" type="number" className="form-control" />
                </div>
                <button onClick = {signUp} type="submit" className="btn mt-3 btn-info w-100">SignUp</button>
            </div>
        </div>
    </>
    )
}

export default Register
