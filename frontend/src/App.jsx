// src/App.jsx
import React from "react";
import { LoginRegistrationComponent } from "./components/Registration_login";
import {ToastContainer} from 'react-toastify'
import "./index.css"; // Import your Tailwind CSS

function App() {
  return (
    <div className="App">
      <LoginRegistrationComponent />
      <ToastContainer/>
    </div>
  );
}

export default App;
