import { useState, useContext,createContext, useEffect} from "react";


const CartContext = createContext();



const CartProvider = ({children})=>{
      
    const [cart, setCart] = useState([])


    useEffect(()=>{
        let extstingCartItem = localStorage.getItem('cart')
        if(extstingCartItem) setCart(JSON.parse(extstingCartItem))
    },[])




    return(<CartContext.Provider value={[cart,setCart]}>
        {children}
    </CartContext.Provider>)
} 


// COSTOM HOOKS 
const useCart = ()=>{
    return useContext(CartContext)
}

export {useCart,CartProvider}