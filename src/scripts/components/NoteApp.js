import React, { Fragment, useState, useEffect, useMemo } from "react"

import { Routes, Route, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import { confirmAlert } from "react-confirm-alert"
import { putAccessToken, getUserLogged } from "scripts/data-resource/auth/auth-api"
import { getStorageItem, setStorageItem } from "scripts/helpers/LocalStorage/LocalStorageHelper"
import { LogoutDialogContent } from "scripts/contents/confirmation-dialog-content"
import { LocaleProvider } from "scripts/contexts/LocaleContext"

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

const NoteApp = () => {
    const navigate = useNavigate()
    const [authedUser, setAuthedUser] = useState(null)
    const [initializing, setInitializing] = useState(true)
    const [locale, setLocale] = useState(getStorageItem('locale') || 'en')

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
                    locale={locale}
                    message={LogoutDialogContent[locale].confirmation_wording}
                    onClose={onClose}
                    onClickAccepted={() => {
                        setAuthedUser(null)
                        putAccessToken('')
                        onClose()
                    }} />
            },
        })
    }

    const toggleLocale = () => {
        setInitializing(true)
        setLocale((prevLocale) => {
            const localeValue = (prevLocale === 'id') ? 'en' : 'id'
            setStorageItem('locale', localeValue)

            return localeValue
        })

        setTimeout(() => {
            setInitializing(false)
        }, 1000)
    }

    const localeContextValue = useMemo(() => {
        return {
            locale,
            toggleLocale
        }
    }, [locale])

    useEffect(() => {
        initData()
    }, [])

    return (
        <LocaleProvider value={localeContextValue}>
            {
                initializing ? <LoadingPage /> : (
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
        </LocaleProvider>
    )
}

export default NoteApp
