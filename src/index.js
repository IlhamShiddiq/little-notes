import React from 'react'
import Favicon from 'react-favicon'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './styles/_styles.scss'
import NoteApp from './scripts/components/NoteApp'

const root = createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
        <Favicon url={`${process.env.REACT_APP_BASE_URL}/images/favicon.ico`} />
        <NoteApp />
    </BrowserRouter>
)
