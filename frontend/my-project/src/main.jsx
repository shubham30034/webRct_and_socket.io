import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './router.jsx'
import './index.css'
import router from './router.jsx'
import { RouterProvider } from 'react-router-dom'
import store from './utils/store/store.jsx'
import {Provider} from "react-redux"
import Routing from './router.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <Routing>
    <App />
    </Routing>
    </Provider>
  </React.StrictMode>,
)
