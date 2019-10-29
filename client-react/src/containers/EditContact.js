import React, { Component } from 'react';
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { editContact, editOFF } from "../actions";

class EditContact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.contacts.name,
            phoneNumber: props.contacts.phoneNumber,
            isValid: true
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReturnKey = this.handleReturnKey.bind(this);
    }

    handleNameChange(event) {
        let name = event.target.value;
        if (name.length > 0)
            this.setState({ name, isValid: true });
        else
            this.setState({ name, isValid: false });
    }

    handlePhoneNumberChange(event) {
        let phoneNumber = event.target.value;
        if (phoneNumber.match(new RegExp("^(08[0-9]{8,11})$")))
            this.setState({ phoneNumber, isValid: true });
        else
            this.setState({ phoneNumber, isValid: false });
    }

    handleSubmit(event) {
        event.preventDefault();
        let { name, phoneNumber, isValid } = this.state;
        if (name === this.props.name && phoneNumber === this.props.phoneNumber)
            this.props.onCancel();
        else if (!isValid) {
            Swal.fire({
                title: "Update Error, Make sure the format is correct",
                timer: 2000,
                type: "warning",
                showConfirmButton: false
            });
            this.props.onCancel();
        }
        else {
            this.props.onSave(name, phoneNumber);
        }
    }

    handleReturnKey(event) {
        if (event.keyCode === 13) {
            event.preventDefault()
            let button = document.getElementById('submitEdit');
            button.click();
        }
    }

    render() {
        return (
            <tr>
            <td>{this.props.index}</td>
            <td>
                <form className="form-row" onSubmit={this.handleSubmit}>
                    <div className="col-8">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            value={this.state.name}
                            onChange={this.handleNameChange}
                            required={true} />
                    </div>
                </form>
            </td>
            <td>
                <form className="form-row" onSubmit={this.handleSubmit}>
                    <div className="col-8">
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            className="form-control"
                            value={this.state.phoneNumber}
                            onChange={this.handlePhoneNumberChange}
                            pattern="08[0-9]{8,11}"
                            required={true} />
                    </div>
                </form>
            </td>
            <td>
                <form className="form-row" onSubmit={this.handleSubmit}>
                    <button type="submit" className="btn btn-success mr-2" id="submitEdit" onClick={() => this.handleSubmit}><i
                        className="fas fa-check"></i></button>
                    <button type="button" className="btn btn-danger" onClick={() => this.props.onCancel}> <i className="fas fa-times"></i></button>
                </form>
            </td>
            </tr>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSave: (name, phoneNumber) => {
        dispatch(editContact(ownProps.contacts.id, name, phoneNumber));
        dispatch(editOFF(ownProps.contacts.id));
    },
    onCancel: () => dispatch(editOFF(ownProps.contacts.id))
});

export default connect(
    null,
    mapDispatchToProps
)(EditContact);