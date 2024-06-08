import axios from 'axios'
import {useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom'
export const HomeComponent = () => {
    const [users , setUsers] = useState([])
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            const response = await axios.get(`http://localhost:3030/user/logout` , {
                withCredentials : true
            })
            if(response.data.status ==true) {
                window.location.reload()
            }
            console.log(response)
            console.log("The logout is done.")
        } catch(error) {
            console.log(error)
        }
    }


    const handleEditPassword = () => {
        navigate('/editPassword')
    }

    useEffect(() => {
        const getUsersList = async () => {
            try {  
                const response = await axios.get("http://localhost:3030/user/usersList")
                console.log(response)
                setUsers(response.data.userData)
                console.log("data for users set in the useState")
            } catch(error) {
                console.log(error)
                toast.error(error.response.data.message)
            }
        }
    getUsersList()
    }, [])

    console.log("users ----> " , users)


    return (
    <>
        <div className="flex items-center justify-between p-4">
            <div className="flex-1 flex justify-center">
                <h1 className="bg-white font-bold text-center text-6xl"
                    style={
                        {marginRight: '-11.5rem'}
                    }
                >HOME PAGE</h1>
            </div>
            
            <button 
                className='className="text-center font-bold bg-white p-1 rounded m-1 border-2 border-rose-500'
                onClick={handleEditPassword}
                >Edit Profile</button>
            <button 
                className="text-center font-bold bg-white p-1 rounded border-2 border-rose-500"
                onClick={handleLogout}    
                >Logout</button>
        </div>
        <div className = "flex flex-col items-center justify-center">
                    <h1 className='font-bold text-2xl'>List of users</h1>
                    <ul>
                        {
                            users.map((user)=> {
                                return <li>
                                    {user.name} - {user.email}                      Balance : {user.balance}
                                </li>
                            })
                        }
                    </ul>
        </div>
    </>    
    )
}
