import React from "react"

import { useParams, useNavigate } from "react-router-dom"
import { FiCalendar } from "react-icons/fi"
import { getNote, setLocalDate } from "scripts/services/NoteService"

import AppBar from '../components/AppBar/AppBar/AppBar'
import AppBarDetailNote from "scripts/components/ButtonActionGroup/DetailNotePage/AppBarDetailNote"
import DetailNoteCard from "scripts/components/DetailNoteCard/DetailNoteCard"
import NotFoundData from "scripts/components/Utils/NotFound/NotFoundData/NotFoundData"

const setHeadline = (title = 'NotFound', subTitle = 'notfound') => {
    return {
        title,
        subTitle,
        subTitleIcon: <FiCalendar />
    }
}

const DetailNotePage = () => {
    const navigate = useNavigate()
    const backPreviousPage = () => {
        navigate(-1)
    }
    
    const { id } = useParams()
    const note = getNote(Number(id))
    return (
        <React.Fragment>
            <AppBar 
                    headline={
                        note ? setHeadline(note.title, `${setLocalDate(note.createdAt)}`) : setHeadline()
                    }
                    barAction={
                        <AppBarDetailNote
                        onBackActionHandler={backPreviousPage} />
                    } 
                    />
            {
                note ? <DetailNoteCard body={note.body} /> : <NotFoundData />
            }
        </React.Fragment>
    )
}

export default DetailNotePage