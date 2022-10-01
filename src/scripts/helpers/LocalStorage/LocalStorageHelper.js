const setStorageItem = (key, value) => {
    return localStorage.setItem(key, value)
}

const getStorageItem = (key) => {
    return localStorage.getItem(key)
}

export {
    setStorageItem,
    getStorageItem
}