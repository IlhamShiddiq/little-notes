import React, {Fragment, useState, useEffect, useContext} from "react"

import { useParams, useNavigate } from "react-router-dom"
import { FiCalendar } from "react-icons/fi"
import { setLocalDate } from "scripts/helpers/DateTime/DateTimeHelper"
import { getNote } from "scripts/data-resource/note/note-api"
import { NoteDetailPageHeader } from "scripts/contents/page-header-content"

import AppBar from '../components/AppBar/AppBar/AppBar'
import AppBarDetailNote from "scripts/components/ButtonActionGroup/DetailNotePage/AppBarDetailNote"
import DetailNoteCard from "scripts/components/DetailNoteCard/DetailNoteCard"
import NotFoundData from "scripts/components/Utils/NotFound/NotFoundData/NotFoundData"
import LoadingIndicator from "scripts/components/Utils/Loading/LoadingIndicator/LoadingIndicator"
import LocaleContext from "scripts/contexts/LocaleContext"

const setHeadline = (title = 'NotFound', subTitle = 'notfound') => {
    return {
        title: (title.length > 16) ? `${title.substring(0, 16)}...` : title,
        subTitle,
        subTitleIcon: <FiCalendar />
    }
}

const DetailNotePage = () => {
    const navigate = useNavigate()
    const { locale } = useContext(LocaleContext)
    const { id } = useParams()
    const [note, setNote] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const backPreviousPage = () => {
        navigate(-1)
    }

    useEffect(() => {
        const getDetailNote = async () => {
            await getNote(id).then(note => {
                setNote(note.data)
                setIsLoading(false)
            })
        }

        getDetailNote()
    })

    return (
        <Fragment>
            <AppBar 
                    headline={
                        note ? setHeadline(note.title, `${setLocalDate(note.createdAt, locale)}`)
                            : setHeadline(NoteDetailPageHeader[locale].title_notfound, NoteDetailPageHeader[locale].subtitle_notfound)
                    }
                    barAction={
                        <AppBarDetailNote
                        onBackActionHandler={backPreviousPage} />
                    } 
                    />
            {
                isLoading ? <LoadingIndicator /> : (
                    note ? <DetailNoteCard body={note.body} /> : <NotFoundData />
                )
            }
        </Fragment>
    )
}

export default DetailNotePage