import CONFIG from 'scripts/globals/configs'
import { fetchWithToken } from 'scripts/data-resource/auth/auth-api'

const addNote = async ({ title, body }) => {
    const response = await fetchWithToken(`${CONFIG.base_url}/notes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
    });

    const responseJson = await response.json();

    return {
        error: (responseJson.status !== 'success'),
        data: responseJson.data || null
    };
}

const getActiveNotes = async () => {
    const response = await fetchWithToken(`${CONFIG.base_url}/notes`);
    const responseJson = await response.json();

    return {
        error: (responseJson.status !== 'success'),
        data: responseJson.data || null
    };
}

const getArchivedNotes = async () => {
    const response = await fetchWithToken(`${CONFIG.base_url}/notes/archived`);
    const responseJson = await response.json();

    return {
        error: (responseJson.status !== 'success'),
        data: responseJson.data || null
    };
}

const getNote = async (id) => {
    const response = await fetchWithToken(`${CONFIG.base_url}/notes/${id}`);
    const responseJson = await response.json();

    return {
        error: (responseJson.status !== 'success'),
        data: responseJson.data || null
    };
}

const archiveNote = async (id) => {
    const response = await fetchWithToken(`${CONFIG.base_url}/notes/${id}/archive`, {
        method: 'POST',
    });

    const responseJson = await response.json();

    return {
        error: (responseJson.status !== 'success'),
        data: responseJson.data || null
    };
}

const unarchiveNote = async (id) => {
    const response = await fetchWithToken(`${CONFIG.base_url}/notes/${id}/unarchive`, {
        method: 'POST',
    });

    const responseJson = await response.json();

    return {
        error: (responseJson.status !== 'success'),
        data: responseJson.data || null
    };
}

const deleteNote = async (id) => {
    const response = await fetchWithToken(`${CONFIG.base_url}/notes/${id}`, {
        method: 'DELETE',
    });

    const responseJson = await response.json();

    return {
        error: (responseJson.status !== 'success'),
        data: responseJson.data || null
    };
}

export {
    addNote,
    getActiveNotes,
    getArchivedNotes,
    getNote,
    archiveNote,
    unarchiveNote,
    deleteNote
}