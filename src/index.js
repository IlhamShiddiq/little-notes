import React from 'react'
import { createRoot } from 'react-dom/client'
import Favicon from 'react-favicon'

import './styles/_styles.scss'
import NoteApp from './scripts/components/NoteApp'

const root = createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <Favicon url='images/favicon.ico' />
        <NoteApp />
    </React.StrictMode>
)
