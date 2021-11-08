import { Route, Switch , Redirect } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import ProductedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import Register from './Components/Register/Register';

function App() {
  return (
    <>
    <Navbar/>
    <Switch>
      <ProductedRoutes path = "/home" component = {Home} />
      <Route path = "/register" component = {Register}/>
      <Route path = "/login" component = {Login} />
      <Route path = "/" exact component = {Login} />
      <Redirect to = "/" />
    </Switch>
    </>
  );
}

export default App;
