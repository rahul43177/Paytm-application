import axios from 'axios'
import { Navigate,useNavigate } from 'react-router-dom'
export const HomeComponent = () => {
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
    return (
        <div className="flex items-center justify-between p-4">
            <div className="flex-1 flex justify-center">
                <h1 className="bg-white font-bold text-center text-6xl">HOME PAGE</h1>
            </div>
            <button 
                className='className="text-center font-bold bg-white p-1 rounded m-1'
                onClick={handleEditPassword}
            >Edit Profile</button>
            <button 
                className="text-center font-bold bg-white p-1 rounded"
                onClick={handleLogout}    
            >Logout</button>
        </div>
    )
}
