import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { DogsProvider } from './providers/dog_provider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DogsProvider>
      <App />
    </DogsProvider>
  </React.StrictMode>
)
