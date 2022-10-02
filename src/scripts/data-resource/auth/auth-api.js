import CONFIG from 'scripts/globals/configs'
import { setStorageItem, getStorageItem } from "scripts/helpers/LocalStorage/LocalStorageHelper"

const getAccessToken = () => {
    return getStorageItem('accessToken')
}

const putAccessToken = (accessToken) => {
    return setStorageItem('accessToken', accessToken)
}

const fetchWithToken = async (url, options = {}) => {
    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${getAccessToken()}`,
        }
    })
}

const login = async ({ email, password }) => {
    const response = await fetch(`${CONFIG.base_url}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })

    const responseJson = await response.json()

    return {
        error: (responseJson.status !== 'success'),
        message: responseJson.message || null,
        data: responseJson.data || null
    }
}

const register = async ({ name, email, password }) => {
    const response = await fetch(`${CONFIG.base_url}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    })

    const responseJson = await response.json()

    return {
        error: (responseJson.status !== 'success'),
        message: responseJson.message || 'No Message'
    }
}

const getUserLogged = async () => {
    const response = await fetchWithToken(`${CONFIG.base_url}/users/me`)
    const responseJson = await response.json()

    return {
        error: (responseJson.status !== 'success'),
        data: responseJson.data || null,
    }
}

export {
    putAccessToken,
    fetchWithToken,
    login,
    register,
    getUserLogged
}