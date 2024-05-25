import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import {applicationPort} from '../../config/config'
export const LoginComponent = ({setIsLoggedIn}) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${applicationPort.port}/user/login`, {
        email: username,
        password,
      },{
        withCredentials : true
      });

      if (response.status === 200) {
        toast.success("Login successful");
        setIsLoggedIn(true)
        navigate('/home')
      } else {
        toast.error(`Login Failed : ${response.data.message}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        `Login Failed: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <h3 className="text-4xl font-bold text-blue-500">Login</h3>
      </div>

      <div className="flex flex-col items-center justify-center p-3">
        {/* This is for input box for login page */}
        <input
          type="text"
          placeholder="Email / Username"
          className="border rounded text-center shadow-sm m-1 w-1/5"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border rounded text-center shadow-sm m-1 w-1/5"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex flex-col justify-center items-center ">
        <button
          className="bg-blue-500 border-sm rounded m-0.5 p-1 font-bold text-white"
          onClick={handleLogin}
        >
          Sign In
        </button>
      </div>
    </>
  );
};

export const RegistrationComponent = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = async () => {
    try {
        let response = await axios.post(`${applicationPort}/user/createUser` ,{
            firstName : firstname,
            lastName : lastname , 
            email : username , 
            password
        })
        if(response.status == 200) {
            console.log("The user is registerd successfully")
            toast.success(`The registration : ${response.message}`)
        }

    } catch(error) {
        console.error(error.message)
        toast.error(`The error is : ${error}`)
    }
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <h3 className="text-4xl font-bold text-green-500">Registration</h3>
      </div>
      <div className="flex flex-col items-center justify-center p-3">
        {/* This is for input box for registration page */}
        <input
          type="text"
          placeholder="First Name"
          className="border rounded text-center shadow-sm m-1 w-1/5"
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="border rounded text-center shadow-sm m-1 w-1/5"
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email Address"
          className="border rounded text-center shadow-sm m-1 w-1/5"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border rounded text-center shadow-sm m-1 w-1/5"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex flex-col justify-center items-center">
        <button
          className="bg-green-500 border-sm rounded m-0.5 p-1 font-bold text-white"
          onClick={handleRegistration}
        >
          Sign Up
        </button>
      </div>
    </>
  );
};

export const LoginRegistrationComponent = ({
  setIsLoggedIn
}) => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <>
      <div className="flex items-center justify-center p-5">
        <button
          className={`px-4 py-2 ${
            activeTab === "registration"
              ? "bg-green-500 text-white font-bold"
              : "bg-gray-300 text-black"
          } rounded-r`}
          onClick={() => setActiveTab("registration")}
        >
          Registration
        </button>

        <button
          className={`px-4 py-2 ${
            activeTab == "login"
              ? "bg-blue-500 text-white font-bold"
              : "bg-gray-300 text-black"
          } rounded-r`}
          onClick={() => setActiveTab("login")}
        >
          Login
        </button>
      </div>
      <div>
        {activeTab == "login" ? <LoginComponent setIsLoggedIn={setIsLoggedIn}/> : <RegistrationComponent />}
      </div>
    </>
  );
};
