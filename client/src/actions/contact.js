import axios from "axios"

const req = axios.create({
    baseURL: 'http://192.168.100.167:3001/api/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

export const loadPhonebooks = ({ keyword, sort }) => dispatch => req.get(`phonebooks`, { params: { keyword, sort } }).then(({ data }) => {
    dispatch({ type: 'LOAD_PHONEBOOKS_SUCCESS', data })
}).catch((err) => {
    dispatch({ type: 'LOAD_PHONEBOOKS_FAILED' })
})

export const loadPage = ({ page, keyword, sort }) => dispatch => req.get('phonebooks', { params: { page, keyword, sort } }).then(({ data }) => {
    dispatch({ type: 'LOAD_PAGE_SUCCESS', data })
}).catch((err) => {
    dispatch({ type: 'LOAD_PAGE_FAILED' })
})

export const addPhonebooks = (contact) => dispatch => req.post('phonebooks', contact).then(({ data }) => {
    dispatch({ type: 'ADD_PHONEBOOKS_SUCCESS', data })
}).catch((err) => {
    dispatch({ type: 'ADD_PHONEBOOKS_FAILED' })
})

export const deletePhonebooks = ({ id }) => dispatch => req.delete(`phonebooks/${id}`).then(({ data }) => {
    dispatch({ type: 'DELETE_PHONEBOOKS_SUCCESS', data })
}).catch((err) => {
    dispatch({ type: 'DELETE_PHONEBOOKS_FAILED' })
})

export const updateData = (id, contact) => dispatch => req.put(`phonebooks/${id}`, contact).then(({ data }) => {
    dispatch({ type: 'UPDATE_PHONEBOOKS_SUCCESS', data })
}).catch((err) => {
    dispatch({ type: 'UPDATE_PHONEBOOKS_FAILED' })
})

export const UpdateAvatar = (id, formData) => dispatch => req.put(`phonebooks/${id}/avatar`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
}).then(({ data }) => {
    dispatch({ type: 'UPDATE_AVATAR_SUCCESS', data })
}).catch((err) => {
    dispatch({ type: 'UPDATE_AVATAR_FAILED' })
})