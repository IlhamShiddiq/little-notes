import React, { Fragment, useState, useEffect } from "react"

import { Routes, Route, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import { confirmAlert } from "react-confirm-alert"

import LoginPage from "scripts/pages/LoginPage"
import RegisterPage from "scripts/pages/RegisterPage"
import ActiveNotePage from "scripts/pages/ActiveNotePage"
import ArchivedNotePage from "scripts/pages/ArchivedNotePage"
import AddNotePage from "scripts/pages/AddNotePage"
import DetailNotePage from "scripts/pages/DetailNotePage"
import NotFoundPage from "./Utils/NotFound/NotFoundPage/NotFoundPage"
import BaseLayoutFab from "scripts/components/Layout/Base/BaseLayoutFab"
import CustomConfirmationDialog from "scripts/components/CustomAlert/CustomConfirmationDialog/CustomConfirmationDialog"
import LoadingPage from "scripts/components/Utils/Loading/LoadingPage/LoadingPage"

import { putAccessToken, getUserLogged } from "scripts/data-resource/auth/auth-api"

const NoteApp = () => {
    const navigate = useNavigate()
    const [authedUser, setAuthedUser] = useState(null)
    const [initializing, setInitializing] = useState(true)

    const initData = async () => {
        const { data } = await getUserLogged()
        setAuthedUser(data)
        setInitializing(false)

        return data
    }

    const onLoginSuccess = async ({accessToken}) => {
        putAccessToken(accessToken)

        const data = await initData()
        navigate('/')
        toast.success(`Halo, ${data.name}!`)
    }

    const onLogoutClicked = () => {
        confirmAlert({
            overlayClassName: 'confirmation-alert-overlay-light',
            customUI: ({ onClose }) => {
                return <CustomConfirmationDialog
                    message='Are you sure want to logout?'
                    onClose={onClose}
                    onClickAccepted={() => {
                        setAuthedUser(null)
                        putAccessToken('')
                        onClose()
                    }} />
            },
        });
    }

    useEffect(() => {
        initData()
    }, [])

    return initializing ? <LoadingPage /> : (
        <Fragment>
            <Routes>
                {
                    authedUser ? (
                        <Fragment>
                            <Route path="/*" element={<NotFoundPage />}></Route>
                            <Route element={<BaseLayoutFab onLogoutClicked={onLogoutClicked} />}>
                                <Route path="/" element={<ActiveNotePage />}></Route>
                                <Route path="/archived" element={<ArchivedNotePage />}></Route>
                                <Route path="/add" element={<AddNotePage />}></Route>
                                <Route path="/detail/:id" element={<DetailNotePage />}></Route>
                            </Route>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Route path="/*" element={<LoginPage onLoginSuccess={onLoginSuccess} />}></Route>
                            <Route path="/register" element={<RegisterPage />}></Route>
                        </Fragment>
                    )
                }
            </Routes>
        </Fragment>
    )
}

export default NoteApp;
