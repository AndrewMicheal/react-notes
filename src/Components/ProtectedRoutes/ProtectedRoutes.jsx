import jwt_decode from "jwt-decode";
import { Redirect , Route } from "react-router-dom";


const ProductedRoutes = (props) => {
    let token = localStorage.getItem("token");
    try {
        let decoded = jwt_decode(token);
    } catch (error) {
        localStorage.clear();
        return <Redirect to = "/login" />
    }
    if(token) {
        return <Route {...props}/>
    } 
}

export default ProductedRoutes
