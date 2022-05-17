import React from 'react'
import { createRoot } from 'react-dom/client'

import { library } from '@fortawesome/fontawesome-svg-core'
import { 
    faPlus,
    faBoxArchive,
    faList,
    faGrip,
    faMagnifyingGlass,
    faMapPin,
    faTrash,
    faXmark,
    faBoxOpen
 } from '@fortawesome/free-solid-svg-icons'

import './styles/_styles.scss'
import NoteApp from './scripts/components/NoteApp'

library.add(
    faPlus,
    faBoxArchive,
    faList,
    faGrip,
    faMagnifyingGlass,
    faMapPin,
    faTrash,
    faXmark,
    faBoxOpen
)

const root = createRoot(document.getElementById('root'))
root.render(<NoteApp />)
