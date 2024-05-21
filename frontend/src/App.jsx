// src/App.jsx
import React , {useEffect , useState} from "react";
import { LoginRegistrationComponent } from "./components/Registration_login";
import {ToastContainer} from 'react-toastify'
import {HomeComponent} from './components/HomeComponent'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import "./index.css"; // Import your Tailwind CSS
import PrivateRoute from "./components/PrivateRoute";

function App() {

  const [isAuthenticated , setIsAuthenticated] = useState(false)

  useEffect(()=> {
    const token = localStorage.getItem('token')
    if(token) {
      setIsAuthenticated(true)
    }
  },[])


  return (
    <Router>
      <Routes>
        <Route path = '/' element = {<LoginRegistrationComponent/>}/>
        <Route path = '/home'  element = {<PrivateRoute element = {HomeComponent}/>}/>
      </Routes>
      <ToastContainer/>
    </Router>
    // <div className="App">
    //   <LoginRegistrationComponent />
    //   <ToastContainer/>
    // </div>
  );
}

export default App;
