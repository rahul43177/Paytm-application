import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

export const AddFunds = () => {
  const [funds, setFunds] = useState("");
  const userEmail = localStorage.getItem("email");

  const handleUpdatePay = async () => {
    try {
      const updatePayResponse = await axios.put(
        "http://localhost:3030/account/addFunds",
        {
          userEmail: userEmail,
          amount: funds,
        }
      );

      console.log(updatePayResponse);
      if (updatePayResponse.data.status === true) {
        toast.success(updatePayResponse.data.message);
      } else {
        toast.error(updatePayResponse.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setFunds(value);
    }
  };

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-blue-100 pt-20">
      <div className="w-full flex justify-start p-4">
        <button 
          className="text-center font-bold text-white bg-black border px-2 py-1"
          onClick={handleGoBack}
        >
          Go back
        </button>
      </div>
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Enter the amount
      </h1>
      <div className="bg-red-500 p-8 rounded-lg shadow-lg w-full max-w-md">
        <input
          type="number"
          placeholder="Enter the funds to be added"
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center font-bold"
          onChange={handleInputChange}
          value={funds}
        />
        <button
          className={`w-full py-3 rounded transition duration-300 ${
            funds ? "bg-blue-500 hover:bg-blue-700 text-black font-bold " : "bg-gray-300 text-gray-500 cursor-not-allowed font-bold"
          }`}
          onClick={handleUpdatePay}
          disabled={!funds}
        >
          Update the funds
        </button>
      </div>
    </div>
  );
};