import {
    LOAD_CONTACT_SUCCESS,
    LOAD_CONTACT_FAILURE,

    ADD_CONTACT,
    ADD_CONTACT_SUCCESS,
    ADD_CONTACT_FAILURE,

    DELETE_CONTACT,
    DELETE_CONTACT_SUCCESS,
    DELETE_CONTACT_FAILURE,

    EDIT_CONTACT,
    EDIT_CONTACT_SUCCESS,
    EDIT_CONTACT_FAILURE,
    EDIT_ON,
    EDIT_OFF,

    SEARCH_CONTACT,
    SEARCH_RESET
} from '../constants/actionTypes';

import axios from 'axios';
import Swal from "sweetalert2";

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

const editContactFailure = (id, name, phoneNumber) => ({
    type: EDIT_CONTACT_FAILURE, id, name, phoneNumber
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
                dispatch(editContactFailure(id, name, phoneNumber));
                Swal.fire({
                    title: "Update Error, Nothing changes",
                    timer: 1500,
                    type: "error",
                    showConfirmButton: false
                });
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


//start delete contact
const deleteContactRedux = (id) => ({
    type: DELETE_CONTACT, id
})

const deleteContactSuccess = (contact) => ({
    type: DELETE_CONTACT_SUCCESS,
    contact
})

const deleteContactFailure = (id, name, phoneNumber) => ({
    type: DELETE_CONTACT_FAILURE, id, name, phoneNumber
})

export const deleteContact = (id, name, phoneNumber) => {
    return dispatch => {
        dispatch(deleteContactRedux(id))
        return request.delete(`phonebooks/${id}`)
            .then(function (response) {
                dispatch(deleteContactSuccess(response.data.pbData))
            })
            .catch(function (error) {
                console.error(error);
                dispatch(deleteContactFailure(id, name, phoneNumber))
                Swal.fire({
                    title: "Delete Error, Nothing changes",
                    timer: 1500,
                    type: "error",
                    showConfirmButton: false
                });
            });
    }
}

//end delete contact


// start add contact
const addContactSuccess = (contact) => ({
    type: ADD_CONTACT_SUCCESS,
    contact
})

const addContactFailure = (id) => ({
    type: ADD_CONTACT_FAILURE, id
})

const addContactRedux = (id, name, phoneNumber) => ({
    type: ADD_CONTACT, id, name, phoneNumber
})

export const addContact = (name, phoneNumber) => {
    let id = Date.now();
    return dispatch => {
        dispatch(addContactRedux(id, name, phoneNumber))
        return request.post('phonebooks', { id, name, phoneNumber })
            .then(function (response) {
                dispatch(addContactSuccess(response.data))
            })
            .catch(function (error) {
                console.error(error);
                dispatch(addContactFailure(id))
            });
    }
}

export const resendContact = (id, name, phoneNumber) => {
    return dispatch => {
        dispatch(deleteContactRedux(id));
        dispatch(addContact(name, phoneNumber));
    }
}
//end add contact


// start search contact

export const searchContact = (value) => ({
    type: SEARCH_CONTACT,
    value: value.trim()
})

export const searchReset = () => ({
    type: SEARCH_RESET
})

// end search contact


