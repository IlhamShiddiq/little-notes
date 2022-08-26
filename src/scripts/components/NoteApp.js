import React from "react"

import { Routes, Route } from 'react-router-dom'
import ActiveNotePage from "scripts/pages/ActiveNotePage"
import ArchivedNotePage from "scripts/pages/ArchivedNotePage"
import AddNotePage from "scripts/pages/AddNotePage"
import DetailNotePage from "scripts/pages/DetailNotePage"
import EditNotePage from "scripts/pages/EditNotePage"
import NotFoundPage from "./Utils/NotFound/NotFoundPage/NotFoundPage"

const NoteApp = () => {
    return (
        <Routes>
            <Route path="/" element={<ActiveNotePage />}></Route>
            <Route path="/archived" element={<ArchivedNotePage />}></Route>
            <Route path="/add" element={<AddNotePage />}></Route>
            <Route path="/detail/:id" element={<DetailNotePage />}></Route>
            <Route path="/edit/:id" element={<EditNotePage />}></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
    )
}

export default NoteApp;
