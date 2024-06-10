import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddFunds = () => {
  const [funds, setFunds] = useState(0);
  const userEmail = localStorage.getItem("email")

  const handleUpdatePay = async () => {
    try {
      const updatePayResponse = await axios.put(
        'http://localhost:3030/account/addFunds' , 
        {
            userEmail : userEmail , 
            amount : funds
        }
       )

       console.log(updatePayResponse)
       if(updatePayResponse.data.status == true) {
        toast.success(updatePayResponse.data.message)
       } else {
        toast.error(error.response.data.message)
       }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <h1 className="text-2xl font-bold text-green-500 flex justify-center item-center text-center w-1/4 m-auto mt-20 font-serif">
        Enter the amount to be updated
      </h1>
      <div className="flex justify-center item-center text-center w-1/4 m-auto mt-10">
        <input
          type="text"
          placeholder="Enter the funds to be added"
          className="bg-blue-500 rounded flex-auto justify-center item-center text-center w-1/4 "
          onChange={(e)=> setFunds(e.target.value)}
        />
        <button className="bg-black text-white" onClick={handleUpdatePay}>
          Update the funds
        </button>
      </div>
    </>
  );
};
