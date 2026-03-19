import { useState, useEffect,useContext,createContext} from "react";
import axios from "axios";

const authContext = createContext();



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

    return(<authContext.Provider value={[auth,SetAuth]}>
        {children}
    </authContext.Provider>)
} 


// COSTOM HOOKS 
const useAuth = ()=>{
    return useContext(authContext)
}

export {useAuth,AuthProvider}