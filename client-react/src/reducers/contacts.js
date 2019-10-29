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
                    onEdit: false
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

        case EDIT_CONTACT_SUCCESS:
            return state.map(
                item => ({
                    ...item,
                    ...(item.id === contact.id && 
                    {   onEdit: false, 
                        name: contact.name, 
                        phoneNumber : contact.phoneNumber, 
                        sent: true 
                    })
                })
            ).sort(sortContacts)

        case EDIT_CONTACT_FAILURE:
            return state.map(
                item => ({
                    ...item,
                    ...(item.id === id && { onEdit: false, sent: false })
                })
            )


        // case ADD_CONTACT:
        //     return [
        //         ...state,
        //         {
        //             id, name, phoneNumber,
        //             sent: true,
        //             editForm: false
        //         }
        //     ].sort(sortContacts)

        // case ADD_CONTACT_SUCCESS:
        //     return state.map(
        //         item => ({
        //             ...item,
        //             sent: true,
        //             editForm: false
        //         }))

        // case ADD_CONTACT_FAILURE:
        //     return state.map(item => ({
        //         ...item,
        //         sent: (item.id !== id),
        //         editForm: false
        //     }))

        // case EDIT_CONTACT:

        case LOAD_CONTACT_FAILURE:
        default:
            return state
    }
}

export default contacts;