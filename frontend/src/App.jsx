import {} from 'react'
import './App.css'
// route
import { RouterProvider } from 'react-router-dom'
import { routers_definitions } from './routes/index'
// context
import {CartProvider} from './context/CartContext'
import { ToastProvider } from './context/ToastContext'

function App() {

  return (
     <ToastProvider>
      <CartProvider>
        <RouterProvider router={routers_definitions} />
      </CartProvider>
     </ToastProvider> 
  )
}

export default App
