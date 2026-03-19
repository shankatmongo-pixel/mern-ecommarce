import { useState, useEffect,useContext,createContext} from "react";
import axios from "axios";

const authContextt = createContext();



const AuthProvider = ({children})=>{
        const [auth,SetAuth] = useState({
    user:null,
    token:""
})

// defaut - axios
axios.defaults.headers.common['Authorization'] = auth?.token;
useEffect(()=>{
    const data = localStorage.getItem('auth')
    if(data){
        const parseData = JSON.parse(data)
        SetAuth(
            {
                ...auth,
                user:parseData.user,
                token:parseData.token
            }
        )
    }
    // eslint-disable-next-line

},[])

    return(<authContextt.Provider value={[auth,SetAuth]}>
        {children}
    </authContextt.Provider>)
} 


// COSTOM HOOKS 
const useAuth = ()=>{
    return useContext(authContextt)
}

export {useAuth,AuthProvider}