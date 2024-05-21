import {useState , useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import axios from 'axios'


export default function PrivateRoute({
    element : Element , ...rest
}) {
    const [isAuthenticated , setIsAuthenticated] = useState(null)

    useEffect(()=> {
        const checkAuth = async () => {
            try {
                await axios.get(`http://localhost:3000/authCheck` , {withCredentials : true})  
                setIsAuthenticated = true;
            } catch(err) {
                setIsAuthenticated = false;
            }
        }
        checkAuth()
    },[])

    if(isAuthenticated == false ) {
        return <div className ="font-bold text-2xl text-red-500">
            Loading....
        </div>
    }
    
    return isAuthenticated ? <Element {...rest}/> : <Navigate to="/"/>;
}