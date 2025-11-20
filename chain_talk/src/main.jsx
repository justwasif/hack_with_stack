import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom'
import Home from './component/Home.jsx'
import Layout from './component/Layout.jsx'
import RegisterSite from './component/RegisterSite.jsx'
import Chatbot from './component/Chatbot.jsx'
import History from './component/History.jsx'
import { WalletProvider } from './context/WalletContext.jsx'


const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}/>
      <Route path='registersite' element={<RegisterSite/>}/>
      <Route path='chatbot' element={<Chatbot/>}/>
      <Route path='history' element={<History/>}/>
      
    
    </Route>

  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WalletProvider>
      <RouterProvider router={router}/>
    </WalletProvider>
  </StrictMode>,
)

