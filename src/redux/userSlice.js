import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// const demoState = [{
//   firstName: "Kazım",
//   lastName: "Etiksan",
//   phone: "5324871200"
// },{
//   firstName: "Hasan",
//   lastName: "Etiksan",
//   phone: "5324871211"
// },{
//   firstName: "Mehmet",
//   lastName: "Etiksan",
//   phone: "5324871222"
// }]

const urlPrefix = 'https://comportalapp.azurewebsites.net'

const initialState = []

export const slice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        _addUser: (state, action) => {
            state.push(action.payload.user)
        },
        _editUser: (state, action) => {
            return state.map(item => item._id === action.payload._id ? action.payload.user : item)
        },
        _removeUser: (state, action) => {
            return state.filter((item) => action.payload._id !== item._id)
        },
        _setUsers: (state, action) => {
            return action.payload.users
        },
    }
})

export const { _addUser, _setUsers, _editUser, _removeUser } = slice.actions

export const addUser = (info, callback) => async (dispatch) => {

    axios.post(urlPrefix + '/api/user', info)
        .then((response) => {
            dispatch(_addUser({ user: response.data }))
            callback()
        })
        .catch((err) => {
            callback()
        })
}

export const editUser = (info, _id, callback) => async (dispatch) => {

    console.log('editing', info.iban)
    axios.patch(urlPrefix + '/api/user/' + _id, info)
        .then((response) => {
            dispatch(_editUser({ user: response.data, _id }))
            callback()
        })
        .catch((err) => {
            callback()
        })
}

export const removeUser = (_id, callback = () => { }) => async (dispatch) => {

    axios.delete(urlPrefix + '/api/user/' + _id)
        .then(() => {
            dispatch(_removeUser({ _id }))
            callback()
        })
        .catch((err) => {
            callback()
        })
}

export const getUsers = (callback = () => { }) => async (dispatch) => {

    console.log('getting users')
    axios.get(urlPrefix + '/api/users')
    .then((response) => {
        console.log('response', response)
        dispatch(_setUsers({ users: response.data }))
        callback()
    })
    .catch((err) => {
        console.log('err', err)
        callback()
    })
}

export const selectUsers = state => state.users

export default slice.reducer
