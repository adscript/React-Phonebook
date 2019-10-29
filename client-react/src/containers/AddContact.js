import React, { Component } from 'react';
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { addContact } from "../actions";

class AddContact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phoneNumber: '',
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
        if (!isValid) {
            Swal.fire({
                title: "Add Contact Error, Make sure the format is correct",
                timer: 2000,
                type: "error",
                showConfirmButton: false
            });
        }
        else {
            this.props.onSave(name, phoneNumber);
            this.setState({name: '', phoneNumber: ''})
        }
    }

    handleReturnKey(event) {
        if (event.keyCode === 13) {
            event.preventDefault()
            let button = document.getElementById('submitAdd');
            button.click();
        }
    }

    render() {
        return (
            <div className="card mb-3">
                <h5 className="card-header">Add New Contact</h5>
                <div className="card-body">
                    <form className="form-row" onSubmit={this.handleSubmit}>
                        <div className="form-group col-md-4">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><i
                                        className="fas fa-user"></i></span>
                                </div>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-control"
                                    value={this.state.name}
                                    onChange={this.handleNameChange}
                                    required={true} />
                            </div>
                        </div>
                        <div className="form-group col-md-4">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon2"><i
                                        className="fas fa-phone"></i></span>
                                </div>
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
                        </div>
                        <div className="form-group col-md-4">
                            <button type="submit" className="btn btn-success mr-2"><i className="fas fa-check"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    onSave: (name, phoneNumber) => { dispatch(addContact(name, phoneNumber)) }
});

export default connect(
    null,
    mapDispatchToProps
)(AddContact);