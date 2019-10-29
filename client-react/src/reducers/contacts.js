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

} from '../constants/actionTypes'

const sortContacts = (currObj, nextObj) => {
    if (currObj.name.toLowerCase() < nextObj.name.toLowerCase())
        return -1;
    else if (currObj.name.toLowerCase() > nextObj.name.toLowerCase())
        return 1;
    else
        return 0;
}

const contacts = (state = [], action) => {
    let { type, id, name, phoneNumber, contacts, contact } = action;
    switch (type) {
        case LOAD_CONTACT_SUCCESS:
            return contacts.map(
                item => ({
                    ...item,
                    sent: true,
                    onEdit: false,
                    isVisible: true
                })).sort(sortContacts);

        case EDIT_ON:
            return state.map(
                item => ({
                    ...item,
                    ...(item.id === id && { onEdit: true })
                })
            )

        case EDIT_OFF:
            return state.map(
                item => ({
                    ...item,
                    ...(item.id === id && { onEdit: false })
                })
            )

        case EDIT_CONTACT:
            return state.map(
                item => ({
                    ...item,
                    ...(item.id === id &&
                        {
                            onEdit: false,
                            name: name,
                            phoneNumber: phoneNumber,
                            sent: true
                        })
                })
            )

        case EDIT_CONTACT_SUCCESS:
            return state.map(
                item => ({
                    ...item,
                    ...(item.id === contact.id &&
                        {
                            onEdit: false,
                            name: contact.name,
                            phoneNumber: contact.phoneNumber,
                            sent: true
                        })
                })
            )

        case EDIT_CONTACT_FAILURE:
            return state.map(
                item => ({
                    ...item,
                    ...(item.id === id &&
                        {
                            name, phoneNumber,
                            onEdit: false
                        })
                })
            )

        case DELETE_CONTACT:
            return state.filter(
                item => { return (item.id !== id) }
            )

        case DELETE_CONTACT_SUCCESS:
            return state.filter(
                item => { return (item.id !== contact.id) }
            )

        case DELETE_CONTACT_FAILURE:
        case ADD_CONTACT:
            return [
                ...state,
                {
                    id, name, phoneNumber,
                    sent: true,
                    onEdit: false,
                    isVisible: true
                }
            ].sort(sortContacts)

        case ADD_CONTACT_SUCCESS:
            return state.map(
                item => ({
                    ...item,
                    sent: true,
                    onEdit: false,
                    isVisible: true
                }))

        case ADD_CONTACT_FAILURE:
            return state.map(
                item => ({
                    ...item,
                    ...(item.id === id &&
                        {
                            onEdit: false,
                            sent: false
                        })
                })
            )
        
        case SEARCH_CONTACT:
            return state.map(
                item => ({
                    ...item,
                    isVisible: (item.name.toLowerCase().includes(action.value) || item.phoneNumber.includes(action.value))
                })
            )
        
        case SEARCH_RESET:
            return state.map(
                item => ({
                    ...item,
                    isVisible: true
                })
            )

        case LOAD_CONTACT_FAILURE:
        default:
            return state
    }
}

export default contacts;