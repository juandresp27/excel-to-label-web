import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { PositionProvider } from './Positions.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <PositionProvider>
    <App />
  </PositionProvider>
)
