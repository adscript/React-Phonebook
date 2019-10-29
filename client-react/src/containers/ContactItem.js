import React from 'react';
import { connect } from "react-redux";
import { editON, deleteContact, resendContact } from "../actions";

function ContactItem(props) {
    let { name, phoneNumber, id, sent } = props.contacts;
    return (
        <tr>
            <th scope="row">{props.index}</th>
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
                    (<button className="btn btn-warning" onClick={() => props.resendContact()}>
                        Resend Request <i className="fas fa-sync-alt "></i>
                    </button>)}
            </td>
        </tr>
    );
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    editON: () => dispatch(editON(ownProps.contacts.id)),
    deleteContact: () => dispatch(deleteContact(ownProps.contacts.id)),
    resendContact: () => dispatch(resendContact(ownProps.contacts.id, ownProps.contacts.name, ownProps.contacts.phoneNumber))
});

export default connect(
    null,
    mapDispatchToProps
)(ContactItem);