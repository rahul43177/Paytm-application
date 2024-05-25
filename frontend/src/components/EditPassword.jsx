import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {useNavigate } from 'react-router-dom'
import {useState} from 'react'




export const EditPassword = () => {
    const navigate = useNavigate()
    const userEmail = localStorage.getItem('email')
    const [oldPasswordText , setOldPasswordText] = useState('')
    const [newPasswordText , setNewPasswordText] = useState('')

    const handleEditPassword = async () => {
        try {
            let response = await axios.put("http://localhost:3030/user/editPassword" , {
                email : userEmail , 
                oldPassword : oldPasswordText , 
                newPassword : newPasswordText
            } ,
            {
                withCredentials : true
            }
        )

            console.log(response)
            if(response.data.status == true) {
                toast.success(response.data.message)
                setTimeout(()=> {
                    navigate('/home')
                },3*1000)
            } 
        } catch(error) {
            toast.error(error.response.data.message)
        }
    }
    const handleBackButton = () => {
        navigate('/home')
    }
    return (
      <>
        <div className="flex items-center justify-between p-2">
          <button className="text-center font-bold text-white bg-black  border" onClick={handleBackButton}> Go back</button>
          <div className="flex-1 flex justify-center">
          <h3 className="text-6xl font-bold text-red-500 border">Edit Password</h3>
          </div>
        </div>
        

        <div className="flex flex-col items-center justify-center p-2">
          {/* This is for input box for login page */}
          <input
            type="text"
            value={userEmail}
            disabled
            className="border  rounded text-center shadow-sm m-1 w-1/5 cursor-not-allowed	"
          />
          <input
            type="password"
            placeholder="Old Password"
            className="border rounded text-center shadow-sm m-1 w-1/5"
            onChange={(e)=> setOldPasswordText(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            className="border rounded text-center shadow-sm m-1 w-1/5"
            onChange={(e)=> setNewPasswordText(e.target.value)}
          />
        </div>
  
        <div className="flex flex-col justify-center items-center ">
          <button
            className="bg-red-500 border-sm rounded m-0.5 p-1 font-bold text-white"
            onClick={handleEditPassword}
          >
            Change the Password
          </button>
        </div>
      </>
    );
  };
  