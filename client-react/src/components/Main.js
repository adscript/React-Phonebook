import React, { Component } from 'react';
import ContactTable from '../containers/ContactTable';
import AddContact from '../containers/AddContact';
import SearchContact from '../containers/SearchContact';

export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            onAdd: false,
            onSearch: false
        }
        this.handleAddButton = this.handleAddButton.bind(this);
    }

    handleAddButton(event) {
        event.preventDefault();
        this.setState(state => ({
            onAdd: !state.onAdd
        }));
    }


    render() {
        return (
            <div className="container">
                <div className="card my-5">
                    <div className="card-header text-center">
                        <h1>Phonebook Apps</h1>
                    </div>
                    <div className="card-body">
                        <div className="row justify-content-between">
                            <div className="text-left col">
                                <button type="button" className="btn btn-outline-dark mb-4" onClick={this.handleAddButton}>{
                                    this.state.onAdd ? <span><i className="fas fa-times"></i> Cancel</span> : <span><i className="fas fa-plus"></i> Add</span>
                                } </button>
                            </div>
                            <div className="text-right col">
                                {/* search box */}
                                <SearchContact />
                            </div>
                        </div>

                        {(this.state.onAdd) ? <AddContact /> : ''}

                        <ContactTable />

                    </div>
                    <div className="card-footer text-center text-muted">
                        <i className="far fa-copyright"></i> Adnan Radja Maulana 2019
                    </div>
                </div>
            </div>
        )
    }
}