import React from 'react'
import ReactDOM from 'react-dom/client'
import { GlobalStyles } from './GlobalStyles'
import { App } from './views/App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>
)
