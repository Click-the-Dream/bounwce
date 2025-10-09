import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import store from '../src/store/store.js'
import './index.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>      
    </Provider>    
  </StrictMode>
)
