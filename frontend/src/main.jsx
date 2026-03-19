
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import 'antd/dist/reset.css'
import { SearchProvider } from './context/SearchContext.jsx'
import { CartProvider } from './context/Cart.jsx'


createRoot(document.getElementById('root')).render(
 

  <AuthProvider>
    <SearchProvider>
      <CartProvider>
   <BrowserRouter>
    <App />
    </BrowserRouter>
    </CartProvider>
    </SearchProvider>
    </AuthProvider>
    

  
 
  
  
)
