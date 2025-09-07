import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { ProfileProvider } from './context/ProfileContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <ProfileProvider>
        <MantineProvider>
          <App />
        </MantineProvider>
      </ProfileProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
