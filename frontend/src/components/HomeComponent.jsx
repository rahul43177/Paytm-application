import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const HomeComponent = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
const userName = localStorage.getItem("name");
console.log("🚀 ~ HomeComponent ~ userName:", userName)
const userEmail = localStorage.getItem("email")
  console.log("🚀 ~ HomeComponent ~ userEmail:", userEmail)
  const handleLogout = async () => {
    try {
      const response = await axios.get(`http://localhost:3030/user/logout`, {
        withCredentials: true,
      });
      if (response.data.status == true) {
        window.location.reload();
      }
      console.log(response);
      console.log("The logout is done.");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPassword = () => {
    navigate("/editPassword");
  };

  useEffect(() => {
    const getUsersList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3030/user/usersList" , 
          {
            loggedInUser : userEmail 
          } ,
          {
            withCredentials : true
          }
        );
        console.log(response);
        setUsers(response.data.userData);
        console.log("data for users set in the useState");
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    };
    getUsersList();
  }, []);
  
  console.log("users ----> ", users);
  return (
    <>
      <div className="flex items-center justify-between p-4">
        <div className="flex-1 flex justify-center">
          <h1
            className="bg-white font-bold text-center text-6xl text-blue-500"
            style={{ marginRight: "-11.5rem" }}
          >
            CUTIE PAY
          </h1>
        </div>
        <div>
          <h1 className="bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold text-center text-2xl p-4 rounded-lg shadow-md">
            Welcome, <span className="text-white">{userName}</span>
          </h1>
        </div>
        <button
          className="text-center font-bold bg-white p-1 rounded m-1 border-2 border-blue-500"
          onClick={handleEditPassword}
        >
          Edit Profile
        </button>
        <button
          className="text-center font-bold bg-white p-1 rounded border-2 border-rose-500"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="font-bold text-2xl mb-4 text-white bg-black">
          List of Users
        </h1>
        <ul className="w-full max-w-2xl bg-gray-100 rounded-lg shadow-lg">
          {users.map((user) => (
            <li
              key={user._id}
              className="flex items-center justify-between p-4 m-2 border-b bg-white rounded-md hover:bg-grey-200 transition duration-300"
            >
              <div className="flex-1 text-center text-blue-500 font-bold">
                {`${user.firstName} ${user.lastName}`}
              </div>
              <div className="flex-1 text-center text-red-700 font-semibold">
                {user.email}
              </div>
              <button className="flex-1 text-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-green-600 hover:font-bold transition duration-300">
                Pay
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
