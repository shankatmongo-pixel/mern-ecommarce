import { useState, useContext,createContext} from "react";


const SearchContext = createContext();



const SearchProvider = ({children})=>{
        const [auth,SetAuth] = useState({
            
    keywords:"",
    result:[]
})




    return(<SearchContext.Provider value={[auth,SetAuth]}>
        {children}
    </SearchContext.Provider>)
} 


// COSTOM HOOKS 
const useSearch = ()=>{
    return useContext(SearchContext)
}

export {useSearch,SearchProvider}


