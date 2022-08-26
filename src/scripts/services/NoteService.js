import getInitialData from '../data-resource/DATA'

let notes = getInitialData()

const getAllNotes = () => {
    return notes
}

const getNote = (id) => {
    return notes.find((note) => note.id === id)
}

const getActiveNotes = () => {
    return notes.filter((note) => !note.isArchieved)
}

const getArchivedNotes = () => {
    return notes.filter((note) => note.isArchieved)
}

const addNote = ({ title, body }) => {
    notes = [...notes, {
        id: +new Date(),
        title: title || 'Untitled',
        body,
        createdAt: new Date().toISOString(),
        isArchieved: false,
        isPinned: false
    }]
}

const deleteNote= (id) => {
    notes = notes.filter((note) => note.id !== id)
}

const archiveNote = (id) => {
    notes = notes.map((note) => {
        return (note.id === id) ? { ...note, isArchieved: true } : note
    })
}

const unarchiveNote = (id) => {
    notes = notes.map((note) => {
        return (note.id === id) ? { ...note, isArchieved: false } : note
    });
}

const pinNote = (id) => {
    notes = notes.map((note) => {
        return (note.id === id) ? { ...note, isPinned: true } : note
    }).sort((note) => note.isPinned ? -1 : 0)
}

const unpinNote = (id) => {
    notes = notes.map((note) => {
        return (note.id === id) ? { ...note, isPinned: false } : note
    }).sort((note) => note.isPinned ? -1 : 0)
}

const editNote = ({ id, title, body }) => {
    const editedNote = getNote(id);
    editedNote.title = title;
    editedNote.body = body;

    notes = notes.map((note) => {
        return (note.id === id) ? editedNote : note
    });
}

const setLocalDate = date => {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    }

    return new Date(date).toLocaleDateString("id-ID", options)
}

export {
    getAllNotes,
    getActiveNotes,
    getArchivedNotes,
    deleteNote,
    editNote,
    getNote,
    archiveNote,
    unarchiveNote,
    pinNote,
    unpinNote,
    addNote,
    setLocalDate
};