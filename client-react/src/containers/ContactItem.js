// ALL PROPS IN CONTACTITEM COMPONENT
// contacts = { name, phoneNumber, id, sent}
// index
// status
// editContact(id, name, phoneNumber)
// deleteContact(id)

import React from 'react';
import { connect } from "react-redux";
import { editON } from "../actions";
import EditContact from './EditContact';

function ContactItem(props) {
    let { name, phoneNumber, id, sent } = props.contacts;
    return (
        <tr>
            <td scope="row">{props.index}</td>
            <td className="text-left">{name}</td>
            <td>{phoneNumber}</td>
            <td>
                {sent ?
                    (<div>
                        <button type="button" className="btn btn-success mr-2" onClick={() => props.editON()}><i
                        className="fas fa-pencil-alt" ></i></button>
                        <button type="button" className="btn btn-danger" onClick={() => props.deleteContact()}> <i className="fas fa-trash"></i></button>
                    </div>)
                    :
                    (<button className="btn btn-warning" onClick={() => props.resendContact(name, phoneNumber, id)}>
                        Resend Request <i className="fas fa-sync-alt "></i>
                    </button>)}
            </td>
        </tr>
    );
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    editON: () => dispatch(editON(ownProps.contacts.id)),
    deleteContact: () => dispatch(editON(ownProps.contacts.id)),
    resendEditRequest: () => dispatch(EditContact())
});

export default connect(
    null,
    mapDispatchToProps
)(ContactItem);