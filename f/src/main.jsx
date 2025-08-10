import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


const CLIENT_ID = "663172114673-22dnpovs4a7gae4a4t2vmmsr4tudndrg.apps.googleusercontent.com"
createRoot(document.getElementById('root')).render(
  <StrictMode>
   
    <App />
   </StrictMode>,
)
