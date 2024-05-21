// src/App.jsx
import React from "react";
import { LoginRegistrationComponent } from "./components/Registration_login";
import {ToastContainer} from 'react-toastify'
import {HomeComponent} from './components/HomeComponent'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import "./index.css"; // Import your Tailwind CSS

function App() {
  return (
    <Router>
      <Routes>
        <Route path = '/' element = {<LoginRegistrationComponent/>}/>
        <Route path = '/home'  element = {<HomeComponent/>}/>
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
