// src/App.jsx
import React , {useEffect , useState} from "react";
import { LoginRegistrationComponent  } from "./components/Registration_login";
import {ToastContainer} from 'react-toastify'
import {HomeComponent} from './components/HomeComponent'
import {BrowserRouter as Router , Routes , Route , Navigate} from 'react-router-dom'
import "./index.css"; // Import your Tailwind CSS
import axios from 'axios'
import { EditPassword } from "./components/EditPassword";

function App() {

  const [isLoggedIn , setIsLoggedIn] = useState(false)  
  const [isLoading , setIsLoading ] = useState(true)

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/loginCheck` , {withCredentials : true})
        localStorage.setItem('email' , response.data.userData.email)
        localStorage.setItem('role' , response.data.userData.role) 
        setIsLoggedIn(response.data.loggedIn)
      } catch(error) {
        setIsLoggedIn(false)
      } finally {
        setIsLoading(false)
      }
    }
    checkLoginStatus()
  },[])


  if(isLoading) {
    return <div>Loading....</div>
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element = {isLoggedIn ? <Navigate to='/home' /> : <LoginRegistrationComponent setIsLoggedIn = {setIsLoggedIn}/>}/>
        <Route path='/home' element={isLoggedIn ? <HomeComponent /> : <Navigate to='/' />} />
        <Route path ='/editPassword' element = {<EditPassword/>}/>
        {console.log(isLoggedIn)}
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
