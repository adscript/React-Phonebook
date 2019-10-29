import {
    LOAD_CONTACT_SUCCESS,
    LOAD_CONTACT_FAILURE,

    ADD_CONTACT,
    ADD_CONTACT_SUCCESS,
    ADD_CONTACT_FAILURE,
    ADD_ON,
    ADD_OFF,

    DELETE_CONTACT,
    DELETE_CONTACT_SUCCESS,
    DELETE_CONTACT_FAILURE,

    EDIT_CONTACT,
    EDIT_CONTACT_SUCCESS,
    EDIT_CONTACT_FAILURE,
    EDIT_ON,
    EDIT_OFF,
} from '../constants/actionTypes';

import axios from 'axios';

const API_URL = 'http://localhost:3001/api/';
const request = axios.create({
    baseURL: API_URL,
    timeout: 1000
})

// start load contact
const loadContactSuccess = (contacts) => {
    return { type: LOAD_CONTACT_SUCCESS, contacts }
}

const loadContactFailure = () => { return { type: LOAD_CONTACT_FAILURE } }

export const loadContact = () => {
    return dispatch => {
        return request.get('phonebooks')
            .then(function (response) {
                if (response.data.status === 'SUCCESS')
                    dispatch(loadContactSuccess(response.data.pbData));
                else
                    dispatch(loadContactFailure());
            })
            .catch(function (error) {
                console.log(error);
                dispatch(loadContactFailure())
            })
    }
}
// end load contact

// start edit contact

const editContactSuccess = (contact) => ({
    type: EDIT_CONTACT_SUCCESS,
    contact
})

const editContactFailure = (id) => ({
    type: EDIT_CONTACT_FAILURE, id
})

const editContactRedux = (id, name, phoneNumber) => ({
    type: EDIT_CONTACT, id, name, phoneNumber
})

export const editON = (id) => ({
    type: EDIT_ON, id
})

export const editOFF = (id) => ({
    type: EDIT_OFF, id
})

export const editContact = (id, name, phoneNumber) => {
    return dispatch => {
        dispatch(editContactRedux(id, name, phoneNumber))
        return request.put(`phonebooks/${id}`, { name, phoneNumber })
            .then(function (response) {
                dispatch(editContactSuccess(response.data.pbData))
            })
            .catch(function (error) {
                console.error(error);
                dispatch(editContactFailure(id))
            });
    }
}

export const resendEditContact = (id, name, phoneNumber) => {
    return dispatch => {
        return request.put(`phonebooks/${id}`, { name, phoneNumber })
            .then(function (response) {
                dispatch(editContactSuccess(response.data))
            })
            .catch(function (error) {
                console.error(error);
                dispatch(editContactFailure(id))
            });
    }
}

// end edit contact


// // start add contact
// const addContactSuccess = (contact) => ({
//     type: ADD_CONTACT_SUCCESS,
//     contact
// })

// const addContactFailure = (message) => ({
//     type: ADD_CONTACT_FAILURE, message
// })

// const addContactRedux = (id, name, phoneNumber) => ({
//     type: ADD_CONTACT, id, name, phoneNumber
// })

// export const addON = () => ({
//     type: ADD_ON, form: 'ON'
// })

// export const addOFF = () => ({
//     type: ADD_OFF, form: 'OFF'
// })

// export const addContact = (name, phoneNumber) => {
//     let id = Date.now();
//     return dispatch => {
//         dispatch(addContactRedux(id, name, phoneNumber))
//         return request.post('phonebooks', { id, name, phoneNumber })
//             .then(function (response) {
//                 dispatch(addContactSuccess(response.data))
//             })
//             .catch(function (error) {
//                 console.error(error);
//                 dispatch(addContactFailure(id))
//             });
//     }
// }

// export const resendContact = (id, name, phoneNumber) => {
//     return dispatch => {
//         return request.post('phonebooks', { id, name, phoneNumber })
//             .then(function (response) {
//                 dispatch(addContactSuccess(response.data))
//             })
//             .catch(function (error) {
//                 console.error(error);
//                 dispatch(addContactFailure(id))
//             });
//     }
// }
// //end add contact


// //start delete contact
// const deleteContactRedux = (id) => ({
//     type: DELETE_CONTACT, id
// })

// const deleteContactSuccess = (contacts) => ({
//     type: DELETE_CONTACT_SUCCESS,
//     contacts
// })

// const deleteContactFailure = () => ({
//     type: DELETE_CONTACT_FAILURE
// })

// export const deleteContact = (id) => {
//     return dispatch => {
//         dispatch(deleteContactRedux(id))
//         return request.delete(`contacts/${id}`)
//             .then(function (response) {
//                 dispatch(deleteContactSuccess(response.data))
//             })
//             .catch(function (error) {
//                 console.error(error);
//                 dispatch(deleteContactFailure())
//             });
//     }
// }

// //end delete contact

