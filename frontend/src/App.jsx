// src/App.jsx
import React , {useEffect , useState} from "react";
import { LoginRegistrationComponent , LoginComponent } from "./components/Registration_login";
import {ToastContainer} from 'react-toastify'
import {HomeComponent} from './components/HomeComponent'
import {BrowserRouter as Router , Routes , Route , Navigate} from 'react-router-dom'
import "./index.css"; // Import your Tailwind CSS
import PrivateRoute from "./components/PrivateRoute";
import axios from 'axios'

function App() {

  const [isLoggedIn , setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/loginCheck` , {withCredentials : true})
        if(response.status == true) {
          setIsLoggedIn(true)
        }
      } catch(error) {
        setIsLoggedIn(false)
      }
    }
    checkLoginStatus()
  },[])

  return (
    <Router>
      <Routes>
        <Route path='/' element = {<LoginRegistrationComponent setIsLoggedIn = {setIsLoggedIn}/>}/>
        <Route path = '/home'  element = {isLoggedIn ? <HomeComponent/> : <Navigate to ='/' />}/>
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
