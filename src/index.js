import React from 'react'

import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './styles/_styles.scss'
import NoteApp from './scripts/components/NoteApp'
import Favicon from 'react-favicon'

const root = createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
        <Favicon url={`${process.env.REACT_APP_BASE_URL}/images/favicon.ico`} />
        <NoteApp />
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    </BrowserRouter>
)
