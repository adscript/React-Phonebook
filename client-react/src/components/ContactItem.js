// ALL PROPS IN CONTACTITEM COMPONENT
// contacts = { name, phoneNumber, id, sent}
// index
// status
// editContact(id, name, phoneNumber)
// deleteContact(id)

import React from 'react';

function ContactItem(props) {
    console.log(props);
    let { name, phoneNumber, id, sent } = props.contacts;
    return (
        <tr>
            <th scope="row">{props.index}</th>
            <td className="text-left">{name}</td>
            <td>{phoneNumber}</td>
            <td>
                {sent ?
                    (<div>
                        <button type="button" className="btn btn-success mr-2" onClick={() => props.editContact(id, name, phoneNumber)}><i
                        className="fas fa-pencil-alt" ></i></button>
                        <button type="button" className="btn btn-danger" onClick={() => props.deleteContact(id)}> <i className="fas fa-trash"></i></button>
                    </div>)
                    :
                    (<button className="btn text-white bg-transparent" onClick={() => props.resendContact(name, phoneNumber, id)}>
                        Resend Request <i className="fas fa-sync-alt "></i>
                    </button>)}
            </td>
        </tr>
    );
}

export default ContactItem;