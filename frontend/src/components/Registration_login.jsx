import React, { useState } from "react";

export const LoginComponent = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <h3 className="text-4xl font-bold text-blue-500">Login</h3>
      </div>

      <div className="flex flex-col items-center justify-center p-3">
        {/* This is for input box for login page */}
        <input type="text" placeholder="Email / Username" className="border-sm rounded text-center shadow-sm m-1 w-1/5"/>
        <input type="password" placeholder="Password" className="border-sm rounded text-center shadow-sm m-1 w-1/5" />
      </div>

      <div className="flex flex-col justify-center items-center ">
        <button className="bg-blue-500 border-sm rounded m-0.5 p-1 font-bold text-white">Sign In</button>
      </div>
    
    </>
  );
};

export const RegistrationComponent = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <h3 className="text-4xl font-bold text-green-500">Registration</h3>
      </div>
      <div className="flex flex-col items-center justify-center p-3">
        {/* This is for input box for login page */}
        <input type="text" placeholder="First Name" className="border-sm rounded text-center shadow-sm m-1 w-1/5"/>
        <input type="text" placeholder="Last Name" className="border-sm rounded text-center shadow-sm m-1 w-1/5" />
        <input type="text" placeholder="Email Address" className="border-sm rounded text-center shadow-sm m-1 w-1/5" />
        <input type="password" placeholder="Password" className="border-sm rounded text-center shadow-sm m-1 w-1/5" />
      </div>

      <div className="flex flex-col justify-center items-center">
        <button className="bg-green-500 border-sm rounded m-0.5 p-1 font-bold text-white">Sign Up</button>
      </div>
    </>
  );
};

export const LoginRegistrationComponent = () => {
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
        {activeTab == "login" ? <LoginComponent /> : <RegistrationComponent />}
      </div>
    </>
  );
};
