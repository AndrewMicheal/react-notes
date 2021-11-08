import React from 'react'
import { NavLink, useLocation , Redirect } from 'react-router-dom'
import jwt_decode from "jwt-decode";

const Navbar = () => {
    let {pathname} = useLocation();
    let decoded;
    let token;
    try {
      token = localStorage.getItem("token");
      decoded = jwt_decode(token);
    } catch (error) {
        localStorage.clear();
    }

    function logOut()
    {
        localStorage.clear();
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
            <a className="navbar-brand" href="/">Notes</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                {pathname !== "/home" && !token ? <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/register">Register</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                    </li>
                </ul> : <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    {decoded ? <span>{decoded.first_name}</span> : null}
                    </li>
                    <li className="nav-item">
                        <NavLink onClick = {logOut} className="nav-link" to="/login">Logout</NavLink>
                    </li>
                </ul>}
            </div>
        </div>
    </nav>
        </>
    )
}

export default Navbar
